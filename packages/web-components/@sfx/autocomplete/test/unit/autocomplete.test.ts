import { expect, spy, stub } from '../utils';
import { TemplateResult, LitElement } from 'lit-element';
import Autocomplete, { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, HOVER_AUTOCOMPLETE_TERM_EVENT } from '../../src/autocomplete';

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
    it('should call its super connectedCallback', () => {
      const superConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback');

      autocomplete.connectedCallback();

      expect(superConnectedCallbackStub).to.have.been.called;
    });

    it('should add eventListeners to the window', () => {
      const windowAddEventListener = spy(window, 'addEventListener');

      autocomplete.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
        autocomplete.receivedResults,
      );
      expect(windowAddEventListener).to.have.been.calledWith(
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

    it('should remove eventListeners from the window', () => {
      const windowRemoveEventListener = spy(window, 'removeEventListener');

      autocomplete.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
        autocomplete.receivedResults,
      );
      expect(windowRemoveEventListener).to.have.been.calledWith(
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

    it('should set this.results to empty array if undefined', () => {
      autocomplete.receivedResults({ detail: {} });

      expect(autocomplete.results).to.deep.equal([]);
    });
  });

  describe('handleHoverTerm', () => {
    let dispatchEvent,
      CustomEvent,
      sentEvent;
    beforeEach(() => {
      sentEvent = {};
      dispatchEvent = stub(window, 'dispatchEvent');
      CustomEvent = stub(window, 'CustomEvent').returns(sentEvent);
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
        }
      });
      expect(dispatchEvent).to.be.calledWith(sentEvent);
    });
  });
});
