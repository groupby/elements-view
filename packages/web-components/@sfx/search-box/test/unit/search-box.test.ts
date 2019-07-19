import { SEARCHBOX_EVENT } from '../../src/utils';
import { expect, spy, stub } from '../utils';
import SearchBox from '../../src/search-box';
import { TemplateResult, html, LitElement } from 'lit-element';

describe('SearchBox Component', () => {
  let searchbox;
  let windowDispatchEvent;

  beforeEach(() => {
    searchbox = new SearchBox();
    windowDispatchEvent = spy(window, 'dispatchEvent');
  });

  afterEach(() => {
    windowDispatchEvent.restore();
  });

  /*
   * To be replaced with Base
   */
  describe('Constructor', () => {
    it('should extend LitElement', () => {
      expect(searchbox).to.be.an.instanceof(LitElement);
    });
  });

  describe('connectCallback', () => {
    it('should add an autocomplete_hover eventListener to the window', () => {
      const windowAddEventListener = spy(window, 'addEventListener');

      searchbox.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(
        SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
        searchbox.updateText
      );
    });
  });

  describe('disconnectCallback', () => {
    it('should remove the autocomplete_hover eventListener from the window', () => {
      const windowRemoveEventListener = spy(window, 'removeEventListener');

      searchbox.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
        searchbox.updateText
      );
    });
  });

  describe('emitSearchEvent', () => {
    it('should dispatch a search request event', () => {
      searchbox.searchTerm = 'a';
      const searchRequestEvent = new CustomEvent(
        SEARCHBOX_EVENT.SEARCH_REQUEST,
        {
          detail: 'a',
          bubbles: true
        }
      );

      searchbox.emitSearchEvent();

      expect(windowDispatchEvent).to.have.been.calledWith(searchRequestEvent);
    });
  });

  describe('emitAutocompleteRequestEvent', () => {
    it('should dispatch an autocomplete event', () => {
      const autocompleteRequestEvent = new CustomEvent(
        'sfx::autocomplete_request',
        { detail: 'b', bubbles: true }
      );

      searchbox.emitAutocompleteRequestEvent();

      expect(windowDispatchEvent).to.have.been.calledWith(
        autocompleteRequestEvent
      );
    });
  });

  describe('emitSearchBoxClearedEvent', () => {
    it('should dispatch an emitSearchBoxClearedEvent', () => {
      const searchboxxClearedEvent = new CustomEvent('sfx::search_box_cleared');

      searchbox.emitSearchBoxClearedEvent();

      expect(windowDispatchEvent).to.have.been.calledWith(
        searchboxxClearedEvent
      );
    });
  });

  describe('updateText', () => {
    it('should update the searchTerm property in response to data received', () => {
      const detail = 'inputText';
      stub(searchbox, 'getInputElement').returns(
        html`
          <input type="text" id="searchInput" placeholder="Type your search" />
        `
      );
      searchbox.updateText({ detail });
      expect(searchbox.searchTerm).to.equal(detail);
    });
  });

  describe('handleKeyup', () => {
    it('should remove the last letter of the searchTerm string if backpace is pressed', () => {
      searchbox.searchTerm = 'hello';
      const keyCode = 8;

      searchbox.handleKeyup({ keyCode });

      expect(searchbox.searchTerm).to.equal('hell');
    });

    it('should emit a searchBoxClearedEvent if backspace is pressed when there is one character remaining', () => {
      const emitSearchBoxClearedEventSpy = spy(
        searchbox,
        'emitSearchBoxClearedEvent'
      );
      searchbox.searchTerm = 'h';
      const keyCode = 8;

      searchbox.handleKeyup({ keyCode });

      expect(emitSearchBoxClearedEventSpy).to.have.been.called;
    });

    it('should invoke the emitSearchEvent function if enter is pressed and searchTerm property length is greater than 0', () => {
      const emitSearchSpy = spy(searchbox, 'emitSearchEvent');
      searchbox.searchTerm = 'hello';
      const keyCode = 13;

      searchbox.handleKeyup({ keyCode });

      expect(emitSearchSpy).to.have.been.calledWith('hello');
    });

    it('should invoke the updateSearchTerm function if word character is pressed', () => {
      const updateSearchTermSpy = spy(searchbox, 'updateSearchTerm');
      const keyCode = 68;
      const target = {
        value: 'dee'
      };

      searchbox.handleKeyup({ keyCode, target });

      expect(updateSearchTermSpy).to.have.been.calledWith('dee');
    });

    it('should invoke the emitAutocompleteRequestEvent function if character key is pressed and searchTerm is 3 characters or more', () => {
      stub(searchbox, 'updateSearchTerm');
      const emitAutocompleteSpy = spy(
        searchbox,
        'emitAutocompleteRequestEvent'
      );
      searchbox.searchTerm = 'darkkk';
      const keyCode = 68;
      const target = {
        value: 'darkkkd'
      };

      searchbox.handleKeyup({ keyCode, target });

      expect(emitAutocompleteSpy).to.have.been.called;
    });
  });

  describe('updateSearchTerm', () => {
    it('should set the search term property to the input value', () => {
      searchbox.updateSearchTerm('catfood');

      expect(searchbox.searchTerm).to.equal('catfood');
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

      expect(searchbox.searchTerm).to.equal('');
    });

    it('should invoke the emitSearchBoxClearedEvent', () => {
      stub(searchbox, 'getInputElement').returns(
        html`
          <input type="text" id="searchInput" placeholder="Type your search" />
        `
      );
      const emitSearchBoxSpy = spy(searchbox, 'emitSearchBoxClearedEvent');

      searchbox.clearSearch();

      expect(emitSearchBoxSpy).to.have.been.called;
    });
  });

  describe('clickExposed', () => {
    it('should dispatch a search box clicked event', () => {
      const searchboxClickedEvent = new CustomEvent('sfx::search_box_cleared');

      searchbox.clickExposed();

      expect(windowDispatchEvent).to.have.been.calledWith(
        searchboxClickedEvent
      );
    });
  });

  describe('hoverExposed', () => {
    it('should dispatch a search box hovered event', () => {
      const hoverExposedEvent = new CustomEvent('sfx::search_hover_event');

      searchbox.hoverExposed();

      expect(windowDispatchEvent).to.have.been.calledWith(hoverExposedEvent);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = searchbox.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
