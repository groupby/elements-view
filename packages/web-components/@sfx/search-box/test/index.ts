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
      searchbox.emitSearchEvent()
      expect(clearSearchStub).to.have.been.called;
    })
  })

})
