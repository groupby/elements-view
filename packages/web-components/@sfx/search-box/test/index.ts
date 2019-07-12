import { expect, spy, stub } from './utils';
import { SearchBox } from '../src/searchbox';

describe('SearchBox Component', () => {
  let searchbox;
  beforeEach(() => {
    searchbox = new SearchBox();
  });

  describe('Constructor', () => {
    it('should extend the Base class', () => {
      // need base
    })
  })

  describe('connectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    })

    it('should add an autocomplete_hover eventListener to the window', () => {
      spy(window, 'addEventListener')
      searchbox.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith('sfx::autocomplete_hover', searchbox.updateText);
    })
  })
  describe('connectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    })

    it('should add an autocomplete_hover eventListener to the window', () => {
      spy(window, 'addEventListener')
      searchbox.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith('sfx::autocomplete_hover', searchbox.updateText);
    })
  })

  describe('disconnectCallback', () => {
    it('should call its super connectedCallback', () => {
      // need base
    })

    it('should remove autocomplete_hover eventListener to the window', () => {
      spy(window, 'removeEventListener')
      searchbox.disconnectedCallback();
      expect(window.removeEventListener).to.have.been.calledWith('sfx::autocomplete_hover', searchbox.updateText);
    })
  })

  describe('emitSearchEvent', () => {
    it('should call clear search', () => {
      const clearSearchStub = stub(searchbox, 'clearSearch')
      searchbox.emitSearchEvent();
      expect(clearSearchStub).to.have.been.called;
    })

    it('should dispatch a search request event', () => {
      spy(window, 'dispatchEvent');
      stub(searchbox, 'clearSearch')
      let searchRequestEvent = new CustomEvent('sfx::search_request', { detail: 'a', bubbles: true })
      searchbox.emitSearchEvent();
      expect(window.dispatchEvent).to.have.been.calledWith(searchRequestEvent);
      // expect(window.dispatchEvent).to.have.been.calledWith('sfx::search_request', { detail: 'string', bubbles: true })
    })
  })

  describe('emitAutocompleteRequestEvent', () => {
    it('should dispatch an autocomplete event', () => {
      spy(window, 'dispatchEvent');
      let searchRequestEvent = new CustomEvent('sfx::autocomplete_request', { detail: 'b', bubbles: true })
      searchbox.emitAutocompleteRequestEvent();
      expect(window.dispatchEvent).to.have.been.called;
      // expect(window.dispatchEvent).to.have.been.calledWith('sfx::autocomplete_request', { detail: 'a', bubbles: true })
    })
  })

})
