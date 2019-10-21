import { LitElement } from 'lit-element';
import { expect, stub } from '../utils';
import { DummyComponent } from './dummy-component';
import { Base } from '@sfx/base';

describe('Base Class', () => {
  let dummyComponent;

  beforeEach(() => {
    dummyComponent = new DummyComponent();
  });

  it('should be extendable', () => {
    expect(dummyComponent).to.be.an.instanceof(Base);
  });

  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = dummyComponent.createRenderRoot();

      expect(renderRoot).to.equal(dummyComponent);
    });
  });
});
