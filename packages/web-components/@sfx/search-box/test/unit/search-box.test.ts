import { SEARCHBOX_EVENT } from '../../src/utils';
import { expect, spy, stub, sinon } from '../utils';
import SearchBox from '../../src/search-box';

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
      const windowAddEventListener = spy(window, 'addEventListener');
      searchbox.connectedCallback();
      expect(windowAddEventListener).to.have.been.calledWith(
        SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
        searchbox.updateText
      );
    });
  });
  describe('disconnectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    });

    it('should add an autocomplete_hover eventListener to the window', () => {
      const windowRemoveEventListener = spy(window, 'removeEventListener');
      searchbox.disconnectedCallback();
      expect(windowRemoveEventListener).to.have.been.calledWith(
        SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
        searchbox.updateText
      );
    });
  });

  describe('emitSearchEvent', () => {
    // let searchRequestEvent;
    // beforeEach(() => {
    //   searchRequestEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
    //     detail: ,
    //     bubbles: true
    //   });
    // });
    it('should dispatch a search request event', () => {
      searchbox.searchTerm = 'a';
      let searchRequestEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
        detail: 'a',
        bubbles: true
      });
      searchbox.emitSearchEvent();
      expect(windowDispatchEvent).to.have.been.calledWith(searchRequestEvent);
    });

    // it('should use the passed in query value if provided', () => {
    //   // PASSING BUT IT SHOULD FAIL!
    //   searchbox.searchTerm = 'a';
    //   searchbox.emitSearchEvent('a');
    //   let payload = 'b';
    //   let eventToDispatch = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
    //     detail: payload
    //   });
    //   expect(windowDispatchEvent).to.have.been.calledWith(searchRequestEvent);
    // });
  });

  describe('emitAutocompleteRequestEvent', () => {
    it('should dispatch an autocomplete event', () => {
      let autocompleteRequestEvent = new CustomEvent(
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
      let searchboxxClearedEvent = new CustomEvent('sfx::search_box_cleared');
      searchbox.emitSearchBoxClearedEvent();
      expect(windowDispatchEvent).to.have.been.calledWith(
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

  describe('handleKeypress', () => {
    it('should remove the last letter of the searchTerm string if backpace is pressed', () => {
      searchbox.searchTerm = 'hello';
      const keyCode = 8;
      searchbox.handleKeypress({ keyCode });
      expect(searchbox.searchTerm).to.equal('hell');
    });

    it('should emit a searchBoxClearedEvent if backspace is pressed when there is one character remaining', () => {
      const emitSearchBoxClearedEventSpy = spy(searchbox, 'emitSearchBoxClearedEvent')
      searchbox.searchTerm = 'h';
      const keyCode = 8;
      searchbox.handleKeypress({ keyCode });
      expect(emitSearchBoxClearedEventSpy).to.have.been.called;
    });

    it('should invoke the emitSearchEvent function if enter is pressed', () => {
      const emitSearchSpy = spy(searchbox, 'emitSearchEvent');
      searchbox.searchTerm = 'hello';
      const keyCode = 13;
      searchbox.handleKeypress({ keyCode });
      expect(emitSearchSpy).to.have.been.calledWith('hello');
    });

    it('should invoke the emitAutocompleteRequestEvent function if 3 characters or more', () => {
      // query selector in unit test?
      const emitAutocompleteSpy = spy(
        searchbox,
        'emitAutocompleteRequestEvent'
      );
      
      // searchbox.searchTerm = 'hello'
      // let searchTermStub = stub(searchbox, 'searchTerm').value('hello')
      // console.log(searchTermStub, 'searchTermStub')
      // console.log(searchbox.searchTerm, 'search Term')
      const keyCode = 68;
      searchbox.handleKeypress({ keyCode });
      const e = {
        target: { value: 'hello' }
      };
      // searchTermStub = stub(searchbox, 'searchTerm').value('helloD')
      expect(emitAutocompleteSpy).to.have.been.calledWith(e.target.value);
    });
  });

  describe('clickExposed', () => {
    it('should dispatch an search box clicked event', () => {
      let searchboxClickedEvent = new CustomEvent('sfx::search_box_cleared');
      searchbox.clickExposed();
      expect(windowDispatchEvent).to.have.been.calledWith(
        searchboxClickedEvent
      );
    });
  });

  describe('hoverExposed', () => {
    it('should dispatch an search box clicked event', () => {
      let hoverExposedEvent = new CustomEvent('sfx::search_hover_event');
      searchbox.hoverExposed();
      expect(windowDispatchEvent).to.have.been.calledWith(hoverExposedEvent);
    });
  });
});
