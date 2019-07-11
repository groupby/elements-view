import { expect, spy, stub } from './utils';
import { Autocomplete } from '../src/index';
import Base from '@sfx/base';
import { TemplateResult } from 'lit-element';

describe('Autcomplete Component', () => {
  let autocomplete;
  beforeEach(() => {
    autocomplete = new Autocomplete();
  });

  describe('Constructor', () => {
    it('should extend the Base class', () => {
      expect(autocomplete).to.be.an.instanceof(Base);
    });
  });

  describe('connectedCallback', () => {
    it('should add an eventListener to the window', () => {
      spy(window, 'addEventListener');
      autocomplete.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith('autocomplete_received_results', autocomplete.receivedResults);
    });

    it('should call its super connectedCallback', () => {
      const baseConnectedCallbackStub = stub(Base.prototype, 'connectedCallback');
      autocomplete.connectedCallback();
      expect(baseConnectedCallbackStub).to.have.been.called;
    });
  });

  describe('disconnectedCallback', () => {
    it('should remove eventListener from the window', () => {
      spy(window, 'removeEventListener');
      autocomplete.disconnectedCallback();
      expect(window.removeEventListener).to.have.been.calledWith('autocomplete_received_results', autocomplete.receivedResults);
    });

    it('should call its super disconnectedCallback', () => {
      const baseDisconnectedCallbackStub = stub(Base.prototype, 'disconnectedCallback');
      autocomplete.disconnectedCallback();
      expect(baseDisconnectedCallbackStub).to.have.been.called;
    });
  });

  describe('Results property', () => {
    it('should have default value', () => {
      expect(autocomplete.results).to.be.an('array').that.is.empty;
    });
  });

  describe('render function', () => {
    it('should return an instance of TemplateResult', () => {
      const result = autocomplete.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('receivedResults', () => {
    it('should update the results property in response to data received', () => {
      const detail = [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }]
      autocomplete.receivedResults({ detail });
      expect(autocomplete.results).to.deep.equal(detail);
    });
  });
});
