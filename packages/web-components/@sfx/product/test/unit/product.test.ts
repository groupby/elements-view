import { TemplateResult } from 'lit-element';
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

    describe('display property', () => {
      it('Should have a default value of "full"', () => {
        console.log(Object.keys(component));
        expect(component.display).to.equal('full');
      });
    });
  });

  describe('productNodes', () => {
    it('Should return a list of elements', () => {
      expect()
    })
  })

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
})

