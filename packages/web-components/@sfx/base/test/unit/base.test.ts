import { LitElement } from 'lit-element';
import { expect, stub } from '../utils';
import Base from '../../src/base';

describe('Base Class', () => {
  let base;

  beforeEach(() => {
    base = new Base();
  });

  it('should extend from LitElement', () => {
    expect(base).to.be.an.instanceof(LitElement);
  });

  describe('constructor', () => {
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const litElementConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback');

      base.connectedCallback();

      expect(litElementConnectedCallbackStub).to.have.been.called;
    });
  });
  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = base.createRenderRoot();

      expect(renderRoot).to.equal(base);
    });
  });
});
