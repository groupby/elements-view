import { SEARCHBOX_EVENT, KEY_CODES } from '../../src/events';
import { expect, spy, stub } from '../utils';
import SearchBox from '../../src/search-box';
import { TemplateResult, html, LitElement } from 'lit-element';

describe('SearchBox Component', () => {
  let searchbox;
  let searchboxDispatchEvent;

  beforeEach(() => {
    searchbox = new SearchBox();
    searchboxDispatchEvent = stub(searchbox, 'dispatchEvent');
  });

  afterEach(() => {
    searchboxDispatchEvent.restore();
  });

  /*
   * TODO To be removed with introduction of Base.
   */
  describe('Constructor', () => {
    it('should extend LitElement', () => {
      expect(searchbox).to.be.an.instanceof(LitElement);
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
        expect(searchbox.searchButton).to.equal(false);
      });
    });

    describe('clearButton property', () => {
      it('should have default value of false', () => {
        expect(searchbox.clearButton).to.equal(false);
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

  describe('emitSearchBoxClearedEvent', () => {
    it('should dispatch an emitSearchBoxClearedEvent', () => {
      const searchboxClearedEvent = new CustomEvent('sfx::search_box_cleared');

      searchbox.emitSearchBoxClearedEvent();

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxClearedEvent);
    });
  });

  describe('updateText', () => {
    it('should update the value property in response to data received', () => {
      const detail = 'inputText';
      stub(searchbox, 'getInputElement').returns(
        html`
          <input type="text" data-sfx-ref="searchInput" placeholder="Type your search" />
        `
      );
      searchbox.updateText({ detail });
      expect(searchbox.value).to.equal(detail);
    });
  });

  describe('handleKeydown', () => {
    it('should invoke the emitSearchEvent function if enter is pressed and value property length is greater than 0', () => {
      const emitSearchStub = stub(searchbox, 'emitSearchEvent');
      searchbox.value = 'hello';

      searchbox.handleKeydown({ keyCode: KEY_CODES.ENTER });

      expect(emitSearchStub).to.have.been.called;
    });
  });

  describe('handleChange', () => {
    it('should invoke the updateSearchTermValue function', () => {
      const updateSearchTermValueStub = stub(searchbox, 'updateSearchTermValue');
      const target = { value: 'dee' };

      searchbox.handleChange({ target });

      expect(updateSearchTermValueStub).to.have.been.calledWith('dee');
    });

    it('should dispatch a search box change event', () => {
      const target = { value: 'dee' };
      const searchboxChangeEvent = new CustomEvent('sfx::on_search_box_change', {
        detail: target,
        bubbles: true
      });
      stub(searchbox, 'updateSearchTermValue');

      searchbox.handleChange({ target });

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxChangeEvent);
    });
  });

  describe('updateSearchTermValue', () => {
    it('should set the search term property to the input value', () => {
      searchbox.updateSearchTermValue('catfood');

      expect(searchbox.value).to.equal('catfood');
    });
  });

  describe('clearSearch', () => {
    it('should set the search term property to an empty string', () => {
      stub(searchbox, 'getInputElement').returns(
        html`
          <input type="text" id="searchInput" placeholder="Type your search" />
        `
      );
      stub(searchbox, 'emitSearchBoxClearedEvent');

      searchbox.clearSearch();

      expect(searchbox.value).to.equal('');
    });

    it('should invoke the emitSearchBoxClearedEvent', () => {
      const emitSearchBoxSpy = spy(searchbox, 'emitSearchBoxClearedEvent');
      stub(searchbox, 'getInputElement').returns(
        html`
          <input type="text" id="searchInput" placeholder="Type your search" />
        `
      );
      
      searchbox.clearSearch();

      expect(emitSearchBoxSpy).to.have.been.called;
    });
  });

  describe('clickExposed', () => {
    it('should dispatch a search box clicked event', () => {
      const searchboxClickedEvent = new CustomEvent('sfx::search_box_cleared');

      searchbox.clickExposed();

      expect(searchboxDispatchEvent).to.have.been.calledWith(searchboxClickedEvent);
    });
  });

  describe('hoverExposed', () => {
    it('should dispatch a search box hovered event', () => {
      const hoverExposedEvent = new CustomEvent('sfx::search_hover_event');

      searchbox.hoverExposed();

      expect(searchboxDispatchEvent).to.have.been.calledWith(hoverExposedEvent);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = searchbox.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
