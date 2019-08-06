import { expect, waitForUpdateComplete } from '../utils';
import { SEARCHBOX_EVENT } from '../../src/events';
import SearchBox from '../../src/search-box';

describe('SearchBox Component Interaction Tests', () => {
  let searchbox: SearchBox;
  let container;

  before(() => {
    container = document.createElement('div');
    container.id = 'interaction-container';
    document.body.appendChild(container);
  });

  after(() => {
    container.parentNode.removeChild(container);
  });

  beforeEach(() => {
    searchbox = new SearchBox();
    container.innerHTML = '';
  });

  it('should set the searchbox input value when the searchbox.value property is updated', () => {
    container.appendChild(searchbox);

    return waitForUpdateComplete(searchbox).then(() => {
      searchbox.value = 'Search Term';

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      expect(searchboxInput.value).to.equal('Search Term');
    });
  });

  it('should update the searchbox value property when an input event is dispatched', () => {
    container.appendChild(searchbox);

    return waitForUpdateComplete(searchbox).then(() => {
      const searchboxInput = searchbox.querySelector('input');
      const inputEvent = new Event('input', { 'bubbles': true });
      searchboxInput.value = 'Search Term';

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

    return waitForUpdateComplete(searchbox).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      searchbox.value = searchboxInput.value = 'Search Term';

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxButtons = searchbox.querySelectorAll('button');
      const searchboxClearButton = searchboxButtons[0];

      searchboxClearButton.click();

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      expect(searchbox.value).to.equal('');
      expect(searchboxInput.value).to.equal('');
    });
  });

  it('should dispatch a search event when the search button is clicked', () => {
    let eventListenerResolve;
    const eventListenerPromise: Promise<any> = new Promise((resolve) => eventListenerResolve = resolve);
    searchbox.clearButton = true;
    searchbox.searchButton = true;

    container.appendChild(searchbox);

    searchbox.addEventListener(SEARCHBOX_EVENT.SEARCH_REQUEST, (e) => {
      eventListenerResolve(e);
    });

    return waitForUpdateComplete(searchbox).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      searchbox.value = searchboxInput.value = 'Search Term';

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxButtons = searchbox.querySelectorAll('button');
      const searchboxSearchButton = searchboxButtons[1];

      searchboxSearchButton.click();

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      return eventListenerPromise;
    }).then((e) => {
      expect(e.detail).to.equal('Search Term');
    });
  });
});
