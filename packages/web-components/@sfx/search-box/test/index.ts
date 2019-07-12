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
})
