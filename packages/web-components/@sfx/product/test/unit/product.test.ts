import { html, TemplateResult } from 'lit-element';
import { expect, spy, stub } from '../utils';

// import Base from '@sfx/base';
import Product from '../../src/product';

describe('Product Component', () => {
  let component: any = {};

  beforeEach(() => {
    component = new Product();
  });

  describe('constructor', () => {
    // it('should extend the Base class', () => {
    //   expect(component).to.be.an.instanceOf(Base);
    // });

    describe('product property', () => {
      it('should have a default value of "full"', () => {
        expect(component.product).to.exist;
      });
    });
  });

  describe('additionalInfo', () => {
    it('should return an empty array if there are no additional properties', () => {
      const result = component.additionalInfo();
      expect(result).to.eql([]);
    });

    it('should return an array of TemplateResults there are additional properties', () => {
      component.product = {
        name: '',
        salePrice: 0,
        promo: '30% off'
      };
      
      const result = component.additionalInfo();
      
      expect(result[1]).to.be.an.instanceOf(TemplateResult);
    });
  });

  describe('urlWrap', () => {
    it('should return the children wrapped in an "a" tag', () => {
      const result = component.urlWrap('string', html`<span>foo</span>`);
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should return the children', () => {
      const result = component.urlWrap(undefined, html`<span>foo</span>`);
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });

    it('should call the additionalInfo function', () => {
      const additionalInfo = stub(component, 'additionalInfo')
      component.render();
      expect(additionalInfo).to.be.called;
    });
    
    it('should call the urlWrap function', () => {
      const urlWrap = stub(component, 'urlWrap')
      component.render();
      expect(urlWrap).to.be.called;
    });

  });
})

