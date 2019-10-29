import { TemplateResult } from 'lit-element';
import { AUTOCOMPLETE_RESPONSE, AUTOCOMPLETE_ACTIVE_TERM, CACHE_REQUEST } from '@groupby/elements-events';
import {
  expect,
  stub,
  itShouldExtendBase,
  itShouldCallParentMethod,
} from '../utils';
import Autocomplete, { INITIAL_DATA_RESPONSE_EVENT } from '../../src/autocomplete';

describe('Autcomplete Component', () => {
  let autocomplete;

  beforeEach(() => {
    autocomplete = new Autocomplete();
  });

  itShouldExtendBase(() => autocomplete);

  describe('constructor', () => {
    describe('Results property', () => {
      it('should have default value of empty array', () => {
        expect(autocomplete.results).to.deep.equal([]);
      });
    });

    describe('Optional title property', () => {
      it('should have default value of empty string', () => {
        expect(autocomplete.title).to.equal('');
      });
    });

    describe('group property', () => {
      it('should have default value of an empty string', () => {
        expect(autocomplete.group).to.equal('');
      });
    });

    describe('selectedIndex property', () => {
      it('should have default value of -1', () => {
        expect(autocomplete.selectedIndex).to.equal(-1);
      });
    });
  });

  describe('connectedCallback', () => {
    let windowAddEventListener;

    beforeEach(() => {
      windowAddEventListener = stub(window, 'addEventListener');
    });

    itShouldCallParentMethod(() => autocomplete, 'connectedCallback');

    it('should add event listeners to the component and window', () => {
      autocomplete.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RESPONSE,
        autocomplete.receivedResults
      );
    });

    describe('role attribute', () => {
      it('should add the listbox role', () => {
        autocomplete.connectedCallback();

        expect(autocomplete.getAttribute('role')).to.equal('listbox');
      });

      it('should not remove existing roles', () => {
        autocomplete.setAttribute('role', 'widget');

        autocomplete.connectedCallback();

        expect(autocomplete.getAttribute('role')).to.equal('listbox widget');
      });
    });
  });

  describe('requestInitialData()', () => {
    let dispatchEvent;

    beforeEach(() => {
      dispatchEvent = stub(autocomplete, 'dispatchSfxEvent');
    });

    it('should emit an event requesting initial data', () => {
      const payload = { name: AUTOCOMPLETE_RESPONSE, returnEvent: INITIAL_DATA_RESPONSE_EVENT };

      autocomplete.requestInitialData();

      expect(dispatchEvent).to.be.calledOnceWith(CACHE_REQUEST, payload);
    });
  });

  describe('disconnectedCallback', () => {
    let windowRemoveEventListener;

    beforeEach(() => {
      windowRemoveEventListener = stub(window, 'removeEventListener');
    });

    itShouldCallParentMethod(() => autocomplete, 'disconnectedCallback');

    it('should remove event listeners from the component and window', () => {
      autocomplete.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RESPONSE,
        autocomplete.receivedResults
      );
    });
  });

  describe('updated()', () => {
    describe('selectedIndex', () => {
      it('should dispatch an AUTOCOMPLETE_ACTIVE_TERM event', () => {
        const dispatchSelectedTerm = stub(autocomplete, 'dispatchSelectedTerm');
        autocomplete.selectedIndex = 3;

        autocomplete.updated(new Map([['selectedIndex', 0]]));

        expect(dispatchSelectedTerm).to.be.called;
      });
    });
  });

  describe('itemCount', () => {
    it('should equal the total number of autocomplete items', () => {
      autocomplete.results = [
        {
          items: [
            { a: 'a' },
            { b: 'b' },
            { c: 'c' },
            { d: 'd' },
            { e: 'e' },
          ],
        },
      ];

      expect(autocomplete.itemCount).to.equal(5);
    });

    it('should equal 0 if there are no results', () => {
      autocomplete.results = [];

      expect(autocomplete.itemCount).to.equal(0);
    });
  });

  describe('selectedId', () => {
    it('should return the ID of the selected item', () => {
      const id = 'optionid';
      const selectedIndex = autocomplete.selectedIndex = 1;
      stub(autocomplete, 'generateItemId').withArgs(selectedIndex).returns(id);
      stub(autocomplete, 'itemCount').get(() => 3);

      expect(autocomplete.selectedId).to.equal(id);
    });

    it('should return an empty string if no items are selected', () => {
      autocomplete.selectedIndex = -1;

      expect(autocomplete.selectedId).to.equal('');
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = autocomplete.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('receivedResults', () => {
    const results = [
      { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
      { title: 'default', items: [{ label: 'Cars' }, { label: 'Bikes' }] },
    ];
    const group = 'group';
    const event = {
      detail: {},
    };

    it('should set the results property to an empty array if the response data is undefined', () => {
      autocomplete.receivedResults(event);

      expect(autocomplete.results).to.deep.equal([]);
    });

    it('should set the results when the event group matches the component group', () => {
      event.detail = { results, group };
      autocomplete.group = group;

      autocomplete.receivedResults(event);

      expect(autocomplete.results).to.equal(results);
    });

    it('should not set the results when the group in the component and the event do not match', () => {
      event.detail = { results, group };
      autocomplete.group = 'different group';

      autocomplete.receivedResults(event);

      expect(autocomplete.results).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      event.detail = { results, group: undefined };

      autocomplete.receivedResults(event);

      expect(autocomplete.results).to.equal(results);
    });

    it('should default the group in the component to an empty string if it is falsey', () => {
      autocomplete.group = undefined;
      event.detail = { results, group: '' };

      autocomplete.receivedResults(event);

      expect(autocomplete.results).to.equal(results);
    });
  });

  describe('dispatchSelectedTerm()', () => {
    let dispatchElementsEvent;

    beforeEach(() => {
      dispatchElementsEvent = stub(autocomplete, 'dispatchElementsEvent');
    });

    it('should call dispatchElementsEvent() with the AUTOCOMPLETE_ACTIVE_TERM event name and the label of the selected item', () => {
      const group = autocomplete.group = 'some-group';
      autocomplete.selectedIndex = 3;
      autocomplete.results = [
        {
          title: 'a',
          items: [
            { label: 'a1' },
            { label: 'a2' },
            { label: 'a3' },
          ],
        },
        {
          title: 'b',
          items: [
            { label: 'b1' },
            { label: 'b2' },
            { label: 'b3' },
          ],
        },
      ];
      const payload = { group, query: 'b1' };

      autocomplete.dispatchSelectedTerm();

      expect(dispatchElementsEvent).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, payload);
    });

    it('should not call dispatchElementsEvent() if no item is selected', () => {
      autocomplete.selectedIndex = -1;
      stub(autocomplete, 'itemCount').get(() => 5);

      autocomplete.dispatchSelectedTerm();

      expect(dispatchElementsEvent).to.not.be.called;
    });

    it('should not call dispatchElementsEvent() if selectedIndex is out of bounds', () => {
      autocomplete.selectedIndex = 10;
      stub(autocomplete, 'itemCount').get(() => 5);

      autocomplete.dispatchSelectedTerm();

      expect(dispatchElementsEvent).to.not.be.called;
    });
  });

  describe('selectNext()', () => {
    let itemCountStub;

    beforeEach(() => {
      itemCountStub = stub(autocomplete, 'itemCount').get(() => 10);
    });

    it('should increment the selected index', () => {
      autocomplete.selectedIndex = 1;

      autocomplete.selectNext();

      expect(autocomplete.selectedIndex).to.equal(2);
    });

    it('should increment a negative selected index to 0', () => {
      autocomplete.selectedIndex = -5;

      autocomplete.selectNext();

      expect(autocomplete.selectedIndex).to.equal(0);
    });

    it('should select the first index when the last is currently selected', () => {
      autocomplete.selectedIndex = 9;

      autocomplete.selectNext();

      expect(autocomplete.selectedIndex).to.equal(0);
    });

    it('should select the first index when the currently selected index is outside of bounds', () => {
      autocomplete.selectedIndex = 12;

      autocomplete.selectNext();

      expect(autocomplete.selectedIndex).to.equal(0);
    });

    it('should select index -1 when there are no items', () => {
      autocomplete.selectedIndex = 2;
      itemCountStub.get(() => 0);

      autocomplete.selectNext();

      expect(autocomplete.selectedIndex).to.equal(-1);
    });
  });

  describe('selectPrevious()', () => {
    const itemCount = 10;
    let itemCountStub;

    beforeEach(() => {
      itemCountStub = stub(autocomplete, 'itemCount').get(() => itemCount);
    });

    it('should decrememnt the selected index', () => {
      autocomplete.selectedIndex = 1;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(0);
    });

    it('should select the last index when the first is currently selected', () => {
      autocomplete.selectedIndex = 0;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(itemCount - 1);
    });

    it('should select the last index when the currently selected index is outside of bounds', () => {
      autocomplete.selectedIndex = 12;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(itemCount - 1);
    });

    it('should select index -1 when there are no items', () => {
      autocomplete.selectedIndex = 2;
      itemCountStub.get(() => 0);

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(-1);
    });
  });

  describe('getSelectedIndexSetter()', () => {
    it('should return a handler that sets the selected index', () => {
      const newSelectedIndex = 3;
      autocomplete.selectedIndex = -1;

      autocomplete.getSelectedIndexSetter(newSelectedIndex)();

      expect(autocomplete.selectedIndex).to.equal(newSelectedIndex);
    });
  });
});
