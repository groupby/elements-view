import { html, TemplateResult } from 'lit-element';
import { expect, spy, stub } from '../utils';

// import Base from '@sfx/base';
import Variants from '../../src/variants';

describe('Variants Component', () => {
  let component: any = {};

  beforeEach(() => {
    component = new Variants();
  });

  describe('constructor', () => {
    // it('should extend the Base class', () => {
    //   expect(component).to.be.an.instanceOf(Base);
    // });

    describe('type property', () => {
      it('should have a default value of text', () => {
        expect(component.type).to.equal('text');
      });
    });

    describe('items property', () => {
      it('should default to an empty array', () => {
        expect(component.items).to.eql([]);
      });
    });
  });

  describe('listVariant', () => {
    it('should return a list element with text', () => {
      const result = component.listVariant({ text: 'foo', product: {} });
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should return a list element with a background color', () => {
      component.type = 'color';
      const result = component.listVariant({ text: 'foo', color: '#bed', product: {} });
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should return a list element with a background image', () => {
      component.type = 'image';
      const result = component.listVariant({ text: 'foo', image: '#', product: {} });
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should call the listVariant function twice', () => {
      const listVariant = stub(component, 'listVariant');

      component.items = [
        { text: 'foo', product: {} },
        { text: 'bar', product: {} }
      ];
      component.render();
      
      expect(listVariant).to.be.calledTwice;
    });
  });
});
