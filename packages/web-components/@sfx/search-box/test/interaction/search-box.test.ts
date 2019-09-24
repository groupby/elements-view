import { expect, waitForUpdateComplete } from '../utils';
import { SEARCH_REQUEST } from '@sfx/events';
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
    const searchTerm = 'Search Term';

    container.appendChild(searchbox);

    return waitForUpdateComplete(searchbox).then(() => {
      searchbox.value = searchTerm;

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      expect(searchboxInput.value).to.equal(searchTerm);
    });
  });

  it('should update the searchbox value property when an input event is dispatched', () => {
    const searchTerm = 'Search Term';

    container.appendChild(searchbox);

    return waitForUpdateComplete(searchbox).then(() => {
      const searchboxInput = searchbox.querySelector('input');
      const inputEvent = new Event('input', { 'bubbles': true });
      searchboxInput.value = searchTerm;

      searchboxInput.dispatchEvent(inputEvent);

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      expect(searchbox.value).to.equal(searchTerm);
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
    const searchTerm = 'Search Term';
    searchbox.clearButton = true;
    searchbox.searchButton = true;

    container.appendChild(searchbox);

    searchbox.addEventListener(SEARCH_REQUEST, (e) => {
      eventListenerResolve(e);
    });

    return waitForUpdateComplete(searchbox).then(() => {
      const searchboxInput = searchbox.querySelector('input');

      searchbox.value = searchboxInput.value = searchTerm;

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      const searchboxButtons = searchbox.querySelectorAll('button');
      const searchboxSearchButton = searchboxButtons[1];

      searchboxSearchButton.click();

      return waitForUpdateComplete(searchbox);
    }).then(() => {
      return eventListenerPromise;
    }).then((e) => {
      expect(e.detail.query).to.equal(searchTerm);
    });
  });
});
