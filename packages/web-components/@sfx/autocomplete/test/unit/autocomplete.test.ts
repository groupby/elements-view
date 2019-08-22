import { expect, spy, stub } from '../utils';
import { Base } from '@sfx/base';
import { TemplateResult } from 'lit-element';
import Autocomplete from '../../src/autocomplete';

describe('Autcomplete Component', () => {
  let autocomplete;

  beforeEach(() => {
    autocomplete = new Autocomplete();
  });

  describe('Constructor', () => {
    it('should extend the Base class', () => {
      expect(autocomplete).to.be.an.instanceof(Base);
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
      const baseConnectedCallbackStub = stub(Base.prototype, 'connectedCallback');

      autocomplete.connectedCallback();

      expect(baseConnectedCallbackStub).to.have.been.called;
    });

    it('should add an eventListener to the window', () => {
      const windowAddEventListener = spy(window, 'addEventListener');

      autocomplete.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(
        'sfx::autocomplete_received_results',
        autocomplete.receivedResults
      );
    });
  });

  describe('disconnectedCallback', () => {
    it('should call its super disconnectedCallback', () => {
      const baseDisconnectedCallbackStub = stub(Base.prototype, 'disconnectedCallback');

      autocomplete.disconnectedCallback();

      expect(baseDisconnectedCallbackStub).to.have.been.called;
    });

    it('should remove eventListener from the window', () => {
      const windowRemoveEventListener = spy(window, 'removeEventListener');

      autocomplete.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        'sfx::autocomplete_received_results',
        autocomplete.receivedResults
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
  });
});
