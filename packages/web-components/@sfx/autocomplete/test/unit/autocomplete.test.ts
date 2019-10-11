import { TemplateResult, LitElement } from 'lit-element';
import { AUTOCOMPLETE_RESPONSE, AUTOCOMPLETE_ACTIVE_TERM } from '@sfx/events';
import { expect, stub } from '../utils';
import Autocomplete from '../../src/autocomplete';

describe('Autcomplete Component', () => {
  let autocomplete;

  beforeEach(() => {
    autocomplete = new Autocomplete();
  });

  describe('Constructor', () => {
    it('should extend the LitElement class', () => {
      expect(autocomplete).to.be.an.instanceof(LitElement);
    });

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

    it('should call its super connectedCallback', () => {
      const superConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback');

      autocomplete.connectedCallback();

      expect(superConnectedCallbackStub).to.have.been.called;
    });

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

        expect(autocomplete.getAttribute('role')).to.equal('widget listbox');
      });
    });
  });

  describe('disconnectedCallback', () => {
    let windowRemoveEventListener;

    beforeEach(() => {
      windowRemoveEventListener = stub(window, 'removeEventListener');
    });

    it('should call its super disconnectedCallback', () => {
      const superDisconnectedCallbackStub = stub(LitElement.prototype, 'disconnectedCallback');

      autocomplete.disconnectedCallback();

      expect(superDisconnectedCallbackStub).to.have.been.called;
    });

    it('should remove event listeners from the component and window', () => {
      autocomplete.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RESPONSE,
        autocomplete.receivedResults
      );
    });
  });

  describe('length', () => {
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

      expect(autocomplete.length).to.equal(5);
    });

    it('should equal 0 if there are no results', () => {
      autocomplete.results = [];

      expect(autocomplete.length).to.equal(0);
    });
  });

  describe('selectedId', () => {
    it('should return the ID of the selected item', () => {
      const id = 'optionid';
      const selectedIndex = autocomplete.selectedIndex = 1;
      stub(autocomplete, 'generateItemId').withArgs(selectedIndex).returns(id);
      stub(autocomplete, 'length').get(() => 3);

      expect(autocomplete.selectedId).to.equal(id);
    });

    it('should return an empty string if no items are selected', () => {
      stub(autocomplete, 'querySelector').withArgs('[aria-selected="true"]').returns(null);

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

  describe('handleHoverTerm', () => {
    let dispatchEvent;

    beforeEach(() => {
      dispatchEvent = stub(autocomplete, 'dispatchEvent');
    });

    it('should not emit an event if not hovering an autocomplete term', () => {
      const mouseEvent = {
        target: {
          tagName: 'H4',
          innerText: 'some-term',
        },
      };

      autocomplete.handleHoverTerm(mouseEvent);

      expect(dispatchEvent).to.not.be.called;
    });

    it('should emit an event when hovering an autocomplete term', () => {
      const group = autocomplete.group = 'some-group';
      const CustomEvent = stub(window, 'CustomEvent').returns({});
      const mouseEvent = {
        target: {
          tagName: 'LI',
          innerText: 'some-term',
        },
      };

      autocomplete.handleHoverTerm(mouseEvent);

      expect(CustomEvent).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, {
        detail: {
          group,
          query: mouseEvent.target.innerText,
        },
        bubbles: true,
      });
      expect(dispatchEvent).to.be.calledWith({});
    });
  });

  describe('selectNext()', () => {
    beforeEach(() => {
      stub(autocomplete, 'length').get(() => 10);
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
  });

  describe('selectPrevious()', () => {
    const length = 10;

    beforeEach(() => {
      stub(autocomplete, 'length').get(() => length);
    });

    it('should decrememnt the selected index', () => {
      autocomplete.selectedIndex = 1;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(0);
    });

    it('should select the last index when the first is currently selected', () => {
      autocomplete.selectedIndex = 0;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(length - 1);
    });

    it('should select the last index when the currently selected index is outside of bounds', () => {
      autocomplete.selectedIndex = 12;

      autocomplete.selectPrevious();

      expect(autocomplete.selectedIndex).to.equal(length - 1);
    });
  });

  describe('getTermHoverHandler()', () => {
    it('shoudld return a handler that sets the selected index', () => {
      const newSelectedIndex = 3;
      autocomplete.selectedIndex = -1;

      autocomplete.getTermHoverHandler(newSelectedIndex)();

      expect(autocomplete.selectedIndex).to.equal(newSelectedIndex);
    });
  });
});
