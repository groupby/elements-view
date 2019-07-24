import { TemplateResult, html } from 'lit-element';
import { Base } from '@sfx/base';

import { expect, stub, spy } from '../utils';

import Product from '../../src/product';
import Variant from '../../src/variant';

describe('Product Component', () => {
  let component;

  beforeEach(() => {
    component = new Product();
  });

  describe('constructor', () => {
    it('should extend the Base class', () => {
      expect(component).to.be.an.instanceof(Base);
    });

    describe('product property', () => {
      it('should have a default value of "full"', () => {
        expect(component.product).to.exist;
      });
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const connectedCallback = stub(Base.prototype, 'connectedCallback');

      component.connectedCallback();
      expect(connectedCallback).to.have.been.called;
    });

    it('should add an eventListener to the window', () => {
      const addEventListener = spy(window, 'addEventListener');

      component.connectedCallback();
      expect(addEventListener).to.have.been.calledWith(
        'sfx::change_product_variant',
        component.updateVariant
      );
    });
  });

  describe('disconnectedCallback', () => {
    it('should call its super disconnectedCallback', () => {
      const disconnectedCallback = stub(Base.prototype, 'disconnectedCallback');

      component.disconnectedCallback();
      expect(disconnectedCallback).to.have.been.called;
    });

    it('should remove eventListener from the window', () => {
      const removeEventListener = spy(window, 'removeEventListener');

      component.disconnectedCallback();
      expect(removeEventListener).to.have.been.calledWith(
        'sfx::change_product_variant',
        component.updateVariant
      );
    });
  });

  describe('updateVariant', () => {
    it('should update the product property with new info', () => {
      const event = {
        detail: { name: 'Foo', price: 12.34 }
      };
      component.updateVariant(event);
      expect(component.product.name).to.equal('Foo');
      expect(component.product.price).to.equal(12.34);
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

describe('Variant Component', () => {
  let component;

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

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const connectedCallback = stub(Base.prototype, 'connectedCallback');

      component.connectedCallback();
      expect(connectedCallback).to.have.been.called;
    });

    it('should add an eventListener to the window', () => {
      const addEventListener = spy(component, 'addEventListener');

      component.connectedCallback();
      expect(addEventListener).to.have.been.called;
    });

    it('should set role to "listitem"', () => {
      component.connectedCallback();
      expect(component.getAttribute('role')).to.equal('listitem');
    });

    it('should have "product-variant" as a className', () => {
      component.connectedCallback();
      expect(component.className).to.include('product-variant');
    });

    describe('variant types', () => {
      let setAttribute;

      beforeEach(() => {
        setAttribute = stub(component, 'setAttribute');

        component.variant = {
          text: 'Foo',
          color: '#bed',
          image: 'src.png',
          product: {}
        };
      });

      it('should set title and style if the type is "color"', () => {
        component.type = 'color';
        component.connectedCallback();
        expect(setAttribute).to.be.calledWith('style', `background-color:${component.variant.color}`);
        expect(setAttribute).to.be.calledWith('title', component.variant.text);
      });

      it('should set title and style if the type is "image"', () => {
        component.type = 'image';
        component.connectedCallback();
        expect(setAttribute).to.be.calledWith(
          'style',
          `background-image:${component.variant.image};background-color:${component.variant.color}`
        );
        expect(setAttribute).to.be.calledWith('title', component.variant.text);
      });

      it('should set innerText if the type is "text"', () => {
        component.type = 'text';
        component.connectedCallback();
        expect(component.innerText).to.equal(component.variant.text);
      });
    });

    it('should dispatch an event when component is clicked', () => {
      const dispatchEvent = spy(component, 'dispatchEvent');

      component.dispatchEvent(new Event('click'));
      expect(dispatchEvent).to.have.been.called;
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = component.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
