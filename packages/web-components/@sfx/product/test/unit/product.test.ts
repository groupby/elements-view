import { TemplateResult, html, LitElement } from 'lit-element';
import { Base } from '@sfx/base';
import { expect, stub } from '../utils';

import Product from '../../src/product';
import Variant from '../../src/variant';

describe('Product Component', () => {
  let component;

  beforeEach(() => {
    component = new Product();
  });

  it('should extend the Base class', () => {
    expect(component).to.be.an.instanceof(Base);
  });

  describe('constructor', () => {
    describe('product property', () => {
      it('should have a default empty product object', () => {
        expect(component.product).to.deep.equal({});
      });
    });
  });

  describe('updateVariant', () => {
    it('should update the product property with new info', () => {
      const name = 'Foo';
      const price = 12.34;
      const variant = { product: { name, price } };

      component.updateVariant(variant)();

      expect(component.product.name).to.equal(name);
      expect(component.product.price).to.equal(price);
    });
  });

  describe('additionalInfo', () => {
    it('should return an empty array if there are no additional properties', () => {
      const result = component.additionalInfo();

      expect(result).to.deep.equal([]);
    });

    it('should return an array of TemplateResults if there are additional properties', () => {
      component.product = {
        title: '',
        salePrice: 0,
        promo: '30% off',
      };

      const result = component.additionalInfo();

      expect(result).to.have.length(2);
      expect(result[0]).to.be.an.instanceOf(TemplateResult);
      expect(result[1]).to.be.an.instanceOf(TemplateResult);
    });
  });

  describe('urlWrap', () => {
    const child = html`<span>foo</span>`;

    it('should return the second argument wrapped in an "a" tag', () => {
      const result = component.urlWrap('string', child);

      expect(result).to.be.an.instanceof(TemplateResult);
    });

    it('should return the second argument', () => {
      const result = component.urlWrap(undefined, child);

      expect(result).to.equal(child);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });

    it('should call the additionalInfo function', () => {
      const additionalInfo = stub(component, 'additionalInfo');

      component.render();

      expect(additionalInfo).to.be.called;
    });

    it('should call the urlWrap function', () => {
      const urlWrap = stub(component, 'urlWrap');

      component.render();

      expect(urlWrap).to.be.called;
    });
  });
});

describe('Variant Component', () => {
  let component;

  beforeEach(() => {
    component = new Variant();
  });

  it('should extend the Base class', () => {
    expect(component).to.be.an.instanceOf(Base);
  });

  describe('constructor', () => {
    describe('type property', () => {
      it('should have a default value of "text"', () => {
        expect(component.type).to.equal('text');
      });
    });

    describe('variant property', () => {
      it('should default to an object with a text string and an empty product object', () => {
        expect(component.variant).to.deep.equal({ text: '', product: {} });
      });
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const connectedCallback = stub(Object.getPrototypeOf(component), 'connectedCallback');

      component.connectedCallback();

      expect(connectedCallback).to.have.been.called;
    });

    it('should not set role if role attribute is set', () => {
      component.setAttribute('role', 'button');
      const setAttribute = stub(component, 'setAttribute');

      component.connectedCallback();

      expect(setAttribute).to.have.not.been.calledWith('role', 'listitem');
    });

    it('should set role to "listitem" if no role is set', () => {
      const setAttribute = stub(component, 'setAttribute');

      component.connectedCallback();

      expect(setAttribute).to.have.been.calledWith('role', 'listitem');
    });

    describe('variant types', () => {
      const text = 'Foo';
      const color = 'rgb(187, 238, 221)';

      beforeEach(() => {
        component.variant = {
          image: 'src.png',
          color,
          text,
          product: {},
        };
      });

      it('should set title and style if the type is "color"', () => {
        component.type = 'color';

        component.connectedCallback();

        expect(component.style.backgroundColor).to.equal(color);
        expect(component.title).to.equal(text);
      });

      it('should set title and style if the type is "image"', () => {
        component.type = 'image';

        component.connectedCallback();

        expect(component.style.backgroundColor).to.equal(color);
        expect(component.title).to.equal(text);
      });

      it('should not set aria-label if aria-label attribute is set', () => {
        component.setAttribute('aria-label', 'Product Variant');
        const setAttribute = stub(component, 'setAttribute');

        component.connectedCallback();

        expect(setAttribute).to.have.not.been.calledWith('aria-label', text);
      });

      it('should not set aria-label variant type is not color', () => {
        component.type = 'text';
        const setAttribute = stub(component, 'setAttribute');

        component.connectedCallback();

        expect(setAttribute).to.have.not.been.calledWith('aria-label', text);
      });

      it('should set aria-label if aria-label attribute is not set and variant type is color', () => {
        component.type = 'color';
        const setAttribute = stub(component, 'setAttribute');

        component.connectedCallback();

        expect(setAttribute).to.have.been.calledWith('aria-label', text);
      });
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
