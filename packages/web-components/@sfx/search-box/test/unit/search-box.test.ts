import { SEARCHBOX_EVENT } from '../../src/events';
import { expect, stub, waitForUpdateComplete } from '../utils';
import SearchBox from '../../src/search-box';
import { TemplateResult, html } from 'lit-element';
import { Base } from '@sfx/base';

describe('SearchBox Component', () => {
  let searchbox;
  let searchboxDispatchEvent;

  beforeEach(() => {
    searchbox = new SearchBox();
    searchboxDispatchEvent = stub(searchbox, 'dispatchEvent');
  });

  describe('Constructor', () => {
    it('should extend Base', () => {
      expect(searchbox).to.be.an.instanceof(Base);
    });

    describe('placeholder property', () => {
      it('should have default value `Type your search`', () => {
        expect(searchbox.placeholder).to.equal('Type your search');
      });
    });

    describe('value property', () => {
      it('should have default value of an empty string', () => {
        expect(searchbox.value).to.equal('');
      });
    });

    describe('searchButton property', () => {
      it('should have default value of false', () => {
        expect(searchbox.searchButton).to.be.false;
      });
    });

    describe('clearButton property', () => {
      it('should have default value of false', () => {
        expect(searchbox.clearButton).to.be.false;
      });
    });
  });

  describe('connectCallback', () => {
    it('should add an autocomplete_hover eventListener to the window', () => {
      const windowAddEventListener = stub(window, 'addEventListener');

      searchbox.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(SEARCHBOX_EVENT.UPDATE_SEARCH_TERM, searchbox.updateText);
    });
  });

  describe('disconnectCallback', () => {
    it('should remove the autocomplete_hover eventListener from the window', () => {
      const windowRemoveEventListener = stub(window, 'removeEventListener');

      searchbox.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        SEARCHBOX_EVENT.UPDATE_SEARCH_TERM,
        searchbox.updateText
      );
    });
  });

  describe('emitSearchEvent', () => {
    it('should dispatch a search request event', () => {
      const searchRequestEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
        detail: 'a',
        bubbles: true
      });
      searchbox.value = 'a';

      searchbox.emitSearchEvent();

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchRequestEvent);
    });
  });

  describe('emitSearchBoxClearClick', () => {
    it('should dispatch an emitSearchBoxClearClick', () => {
      const searchboxClearedEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLEAR_CLICK);

      searchbox.emitSearchBoxClearClick();

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxClearedEvent);
    });
  });

  describe('updateText', () => {
    it('should update the value property in response to the data received', () => {
      const detail = 'inputText';
      const inputEvent = new CustomEvent(SEARCHBOX_EVENT.UPDATE_SEARCH_TERM, { detail });
  
      searchbox.updateText(inputEvent);

      expect(searchbox.value).to.equal(detail);
    });
  });

  describe('handleKeydown', () => {
    it('should invoke the emitSearchEvent function if enter is pressed and value property length is greater than 0', () => {
      const emitSearchStub = stub(searchbox, 'emitSearchEvent');
      searchbox.value = 'hello';

      searchbox.handleKeydown({ key: 'Enter' });

      expect(emitSearchStub).to.have.been.called;
    });
  });

  describe('handleInput', () => {
    it('should invoke the updateSearchTermValue function', () => {
      const updateSearchTermValueStub = stub(searchbox, 'updateSearchTermValue');
      const searchTerm = 'dee';

      searchbox.handleInput({ target: { value: searchTerm } });

      expect(updateSearchTermValueStub).to.have.been.calledWith(searchTerm);
    });

    it('should dispatch a search box change event', () => {
      const target = { value: 'dee' };
      const searchboxChangeEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CHANGE, {
        detail: target,
        bubbles: true
      });
      stub(searchbox, 'updateSearchTermValue');

      searchbox.handleInput({ target });

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxChangeEvent);
    });
  });

  describe('updateSearchTermValue', () => {
    it('should set the search term property to the input value', () => {
      const searchTerm = 'catfood';

      searchbox.updateSearchTermValue(searchTerm);

      expect(searchbox.value).to.equal(searchTerm);
    });
  });

  describe('clearSearch', () => {
    it('should set the search term property to an empty string', () => {
      stub(searchbox, 'emitSearchBoxClearClick');

      searchbox.clearSearch();

      expect(searchbox.value).to.equal('');
    });

    it('should invoke the emitSearchBoxClearClick', () => {
      const emitSearchBoxStub = stub(searchbox, 'emitSearchBoxClearClick');

      searchbox.clearSearch();

      expect(emitSearchBoxStub).to.have.been.called;
    });
  });

  describe('clickExposed', () => {
    it('should dispatch a search box clicked event', () => {
      const searchboxClickedEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLICK);

      searchbox.clickExposed();

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxClickedEvent);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = searchbox.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe.only('interaction tests', () => {
    let container;

    before(() => {
      container = document.createElement('div');
      container.id = "interaction-container";
      document.body.appendChild(container);
    });

    after(() => {
      container.parentNode.removeChild(container);
    });

    beforeEach(() => {
      container.innerHTML = '';
    });

    it('should set the searchbox input value when the searchbox.value property is updated', () => {
      container.appendChild(searchbox);

      return window.customElements.whenDefined('sfx-search-box').then(() => {
        searchbox.value = "Search Term";

        return waitForUpdateComplete(searchbox);
      }).then(() => {
        const searchboxInput = searchbox.querySelector('input');

        expect(searchboxInput.value).to.equal('Search Term');
      });
    });

    it('should update the searchbox value property when an input event is dispatched', () => {
      container.appendChild(searchbox);

      return window.customElements.whenDefined('sfx-search-box').then(() => {
        const searchboxInput = searchbox.querySelector('input');
        searchboxInput.value = "Search Term";
        const inputEvent = new Event('input', { 'bubbles': true });

        searchboxInput.dispatchEvent(inputEvent);

        return waitForUpdateComplete(searchbox);
      }).then(() => {
        expect(searchbox.value).to.equal('Search Term');
      });
    });

    it('should clear the searchbox when the clear button is clicked', () => {
      searchbox.clearButton = true;
      searchbox.searchButton = true;

      container.appendChild(searchbox);

      return window.customElements.whenDefined('sfx-search-box').then(() => {
        const searchboxNode = document.querySelector('sfx-search-box');
        const searchboxInput = searchboxNode.querySelector('input');

        searchbox.value = searchboxInput.value = "Search Term";

        return waitForUpdateComplete(searchbox);
      }).then(() => {
        const searchboxNode = document.querySelector('sfx-search-box');
        const searchboxButtons = searchboxNode.querySelectorAll('button');
        const searchboxClearButton = searchboxButtons[0];
        searchboxClearButton.click();

        return waitForUpdateComplete(searchbox);
      }).then(() => {
        const searchboxNode = document.querySelector('sfx-search-box');
        const searchboxInput = searchboxNode.querySelector('input');

        expect(searchbox.value).to.equal('');
        expect(searchboxInput.value).to.equal('');
      });
    });

    // search button is clicked/enter key and event is emitted
    // Create a new promise, and the event listener resolves that promise, add the promise at the end of then chain.
    it('should dispatch a search event when the search button is clicked', () => {
      searchbox.clearButton = true;
      searchbox.searchButton = true;
      let eventListenerResolve;
      const eventListenerPromise = new Promise((resolve) => eventListenerResolve = resolve);

      container.appendChild(searchbox);

      const searchboxNode = container.querySelector('sfx-search-box');

      searchboxNode.addEventListener(SEARCHBOX_EVENT.SEARCH_REQUEST, (e: any) => {
        eventListenerResolve(e);
      });

      return window.customElements.whenDefined('sfx-search-box').then(() => {
        const searchboxNode = document.querySelector('sfx-search-box');
        const searchboxInput = searchboxNode.querySelector('input');

        searchbox.value = searchboxInput.value = "Search Term";

        return waitForUpdateComplete(searchbox);
      }).then(() => {
        const searchboxButtons = searchbox.querySelectorAll('button');
        const searchboxSearchButton = searchboxButtons[1];

        searchboxSearchButton.click();

        return waitForUpdateComplete(searchbox);
      }).then(() => {

        return eventListenerPromise;
      }).then((e: any) => {

        expect(e.detail).to.equal('Search Term');
      });
    });
  });
});
