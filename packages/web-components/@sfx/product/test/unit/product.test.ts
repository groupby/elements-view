import { html, TemplateResult } from 'lit-element';
import { expect, spy, stub } from '../utils';

import { Product } from '../../src/index';
// import Base from '../../../base/index';

describe('Product Component', () => {
  let component: any = {};

  beforeEach(() => {
    component = new Product();
  });

  describe('constructor', () => {
    // it('Should extend the Base class', () => {
    //   expect(product).to.be.an.instanceOf(Base);
    // });

    describe('product property', () => {
      it('Should have a default value of "full"', () => {
        expect(component.product).to.exist;
      });
    });
  });

  describe('additionalInfo', () => {
    it('Should return a list of additional elements', () => {
      const result = component.additionalInfo();
      expect(result).to.eql([]);
    });
  });

  describe('urlWrap', () => {
    it('Should return the children wrapped in an "a" tag', () => {
      const result = component.urlWrap('string', html`<span>foo</span>`);
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
})

