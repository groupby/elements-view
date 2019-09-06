import { expect, spy, stub } from '../utils';
import { TemplateResult, LitElement } from 'lit-element';
import { Autocomplete, AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, HOVER_AUTOCOMPLETE_TERM_EVENT } from '@sfx/autocomplete';

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
  });

  describe('connectedCallback', () => {
    let windowAddEventListener,
        autocompleteAddEventListener;

    beforeEach(() => {
      windowAddEventListener = stub(window, 'addEventListener');
      autocompleteAddEventListener = stub(autocomplete, 'addEventListener');
    });

    it('should call its super connectedCallback', () => {
      const superConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback');

      autocomplete.connectedCallback();

      expect(superConnectedCallbackStub).to.have.been.called;
    });

    it('should add event listeners to the component and window', () => {
      autocomplete.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
        autocomplete.receivedResults,
      );
      expect(autocompleteAddEventListener).to.have.been.calledWith(
        'mouseover',
        autocomplete.handleHoverTerm,
      );
    });
  });

  describe('disconnectedCallback', () => {
    it('should call its super disconnectedCallback', () => {
      const superDisconnectedCallbackStub = stub(LitElement.prototype, 'disconnectedCallback');

      autocomplete.disconnectedCallback();

      expect(superDisconnectedCallbackStub).to.have.been.called;
    });

    it('should remove eventListeners from the component and window', () => {
      const windowRemoveEventListener = spy(window, 'removeEventListener');
      const autocompleteRemoveEventListener = spy(autocomplete, 'removeEventListener');

      autocomplete.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
        autocomplete.receivedResults,
      );
      expect(autocompleteRemoveEventListener).to.have.been.calledWith(
        'mouseover',
        autocomplete.handleHoverTerm,
      );
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = autocomplete.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('receivedResults', () => {
    it('should update the results property in response to data received', () => {
      const results = [
        { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
        { title: 'default', items: [{ label: 'Cars' }, { label: 'Bikes' }] }
      ];

      autocomplete.receivedResults({ detail: { results } });

      expect(autocomplete.results).to.deep.equal(results);
    });

    it('should set the results property to an empty array if the response data is undefined', () => {
      autocomplete.receivedResults({ detail: {} });

      expect(autocomplete.results).to.deep.equal([]);
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
        }
      };

      autocomplete.handleHoverTerm(mouseEvent);

      expect(dispatchEvent).to.not.be.called;
    });

    it('should emit an event when hovering an autocomplete term', () => {
      CustomEvent = stub(window, 'CustomEvent').returns({});
      const mouseEvent = {
        target: {
          tagName: 'LI',
          innerText: 'some-term',
        }
      };

      autocomplete.handleHoverTerm(mouseEvent);

      expect(CustomEvent).to.be.calledWith(HOVER_AUTOCOMPLETE_TERM_EVENT, {
        detail: {
          query: mouseEvent.target.innerText,
        },
        bubbles: true,
      });
      expect(dispatchEvent).to.be.calledWith({});
    });
  });
});
