import { expect, spy, stub, sinon } from './utils';
import SearchBox from '../src/search-box';

describe('SearchBox Component', () => {
  let searchbox;
  beforeEach(() => {
    searchbox = new SearchBox();
  });

  describe('Constructor', () => {
    it('should extend the Base class', () => {
      // need base
    });
  });

  describe('connectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    });

    it('should add an autocomplete_hover eventListener to the window', () => {
      spy(window, 'addEventListener');
      searchbox.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith(
        'sfx::autocomplete_hover',
        searchbox.updateText
      );
    });
  });
  describe('connectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    });

    it('should add an autocomplete_hover eventListener to the window', () => {
      spy(window, 'addEventListener');
      searchbox.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith(
        'sfx::autocomplete_hover',
        searchbox.updateText
      );
    });
  });

  describe('disconnectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    });

    it('should remove autocomplete_hover eventListener to the window', () => {
      spy(window, 'removeEventListener');
      searchbox.disconnectedCallback();
      expect(window.removeEventListener).to.have.been.calledWith(
        'sfx::autocomplete_hover',
        searchbox.updateText
      );
    });
  });

  describe('emitSearchEvent', () => {
    it('should call clear search', () => {
      const clearSearchStub = stub(searchbox, 'clearSearch');
      searchbox.emitSearchEvent();
      expect(clearSearchStub).to.have.been.called;
    });

    it('should dispatch a search request event', () => {
      spy(window, 'dispatchEvent');
      stub(searchbox, 'clearSearch');
      let searchRequestEvent = new CustomEvent('sfx::search_request', {
        detail: 'a',
        bubbles: true
      });
      searchbox.emitSearchEvent();
      expect(window.dispatchEvent).to.have.been.calledWith(searchRequestEvent);
      // expect(window.dispatchEvent).to.have.been.calledWith('sfx::search_request', { detail: 'string', bubbles: true })
    });
  });

  describe('emitAutocompleteRequestEvent', () => {
    it('should dispatch an autocomplete event', () => {
      spy(window, 'dispatchEvent');
      let autocompleteRequestEvent = new CustomEvent(
        'sfx::autocomplete_request',
        { detail: 'b', bubbles: true }
      );
      searchbox.emitAutocompleteRequestEvent();
      expect(window.dispatchEvent).to.have.been.calledWith(
        autocompleteRequestEvent
      );
    });
  });

  describe('emitSearchBoxClearedEvent', () => {
    it('should dispatch an emitSearchBoxClearedEvent', () => {
      spy(window, 'dispatchEvent');
      let searchboxxClearedEvent = new CustomEvent('sfx::search_box_cleared');
      searchbox.emitSearchBoxClearedEvent();
      expect(window.dispatchEvent).to.have.been.calledWith(
        searchboxxClearedEvent
      );
    });
  });

  describe('handleKeypress', () => {
    // it('should call emitSearchEvent if enter is clicked', () => {
    //   // this is failing
    //   searchbox.search = 'a'
    //   const emitSearchEventStub = stub(searchbox, 'emitSearchEvent')
    //   const emitAutcompleteRequestEventStub = stub(searchbox, 'emitAutocompleteRequestEvent')
    //   const keyCode = 13
    //   searchbox.handleKeypress({ keyCode })
    //   expect(emitSearchEventStub).to.have.been.called;
    // })

    it('should set the searchTerm property to the value of the input', () => {
      // getting the value of the box?
    });
  });

  describe('updateText', () => {
    // it('should update the searchTerm property in response to data received', () => {
    //   const detail = 'inputText'
    //   let el = 'inputText'
    //   searchbox.updateText({ detail })
    //   expect(searchbox.searchTerm).to.equal(detail);
    // })
  });

  describe('handleKeydown', () => {
    it('should remove the last letter of the searchTerm string', () => {
      searchbox.searchTerm = 'hello';
      const keyCode = 8;
      searchbox.handleKeydown({ keyCode });
      expect(searchbox.searchTerm).to.equal('hell');
    });
  });

  describe('clickExposed', () => {
    it('should dispatch an search box clicked event', () => {
      spy(window, 'dispatchEvent');
      let searchboxClickedEvent = new CustomEvent('sfx::search_box_cleared');
      searchbox.clickExposed();
      expect(window.dispatchEvent).to.have.been.calledWith(
        searchboxClickedEvent
      );
    });
  });

  describe('hoverExposed', () => {
    it('should dispatch an search box clicked event', () => {
      spy(window, 'dispatchEvent');
      let hoverExposedEvent = new CustomEvent('sfx::search_hover_event');
      searchbox.hoverExposed();
      expect(window.dispatchEvent).to.have.been.calledWith(hoverExposedEvent);
    });
  });
});
