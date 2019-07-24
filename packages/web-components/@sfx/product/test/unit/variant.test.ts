import { html, TemplateResult } from 'lit-element';
import { expect, spy, stub } from '../utils';

import { Base } from '@sfx/base';
import Variant from '../../src/variant';

describe('Variant Component', () => {
  let component: any = {};

  beforeEach(() => {
    component = new Variant();
  });

  describe('constructor', () => {
    it('should extend the Base class', () => {
      expect(component).to.be.an.instanceOf(Base);
    });

    describe('type property', () => {
      it('should have a default value of "full"', () => {
        expect(component.type).to.equal('text');
      });
    });
    
    describe('variant property', () => {
      it('should have a default value of "full"', () => {
        expect(component.variant).to.eql({ text: '', product: {} });
      });
    });
  });

  describe('render', () => {
    it('should return a list element with text', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should return a list element with a background color', () => {
      component.type = 'color';
      component.variant = { text: 'foo', color: '#bed', product: {} };
      
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
    
    it('should return a list element with a background image', () => {
      component.type = 'image';
      component.variant = { text: 'foo', image: '#', product: {} };

      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
})

