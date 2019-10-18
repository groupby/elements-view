import { LitElement } from 'lit-element';
import { expect, stub } from '../utils';
import { Base } from '@sfx/base';

describe('Base Class', () => {
  let base;

  beforeEach(() => {
    base = new Base();
  });

  it('should extend from LitElement', () => {
    expect(base).to.be.an.instanceof(LitElement);
  });

  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = base.createRenderRoot();

      expect(renderRoot).to.equal(base);
    });
  });
});
