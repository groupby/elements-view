import { TemplateResult } from 'lit-element';
import { Product } from '../../src/index';
import { expect, spy, stub } from '../utils';
import Base from '../../../base/index';

describe('Product Component', () => {
  let product;

  beforeEach(() => {
    product = new Product();
  });

  describe('constructor', () => {
    it('Should extend the Base class', () => {
      expect(product).to.be.an.instanceOf(Base);
    });

    describe('Type property', () => {
      it('Should have a default value of "full"', () => {
        expect(product.type).to.equal('full');
      });
      it('Should throw an error if the value is not "full" or "tile"', () => {
        
      });
    })
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = product.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
})

