import { TemplateResult, html } from 'lit-element';
import { Base } from '@sfx/base';

import { expect, stub } from '../utils';
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
      it('should have a default empty product object', () => {
        expect(component.product).to.eql({});
      });
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const connectedCallback = stub(Base.prototype, 'connectedCallback');

      component.connectedCallback();

      expect(connectedCallback).to.have.been.called;
    });

    it('should add an eventListener to the component', () => {
      const addEventListener = stub(component, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.have.been.calledWith(
        'sfx::product_variant_change',
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

    it('should remove eventListener from the component', () => {
      const removeEventListener = stub(component, 'removeEventListener');

      component.disconnectedCallback();

      expect(removeEventListener).to.have.been.calledWith(
        'sfx::product_variant_change',
        component.updateVariant
      );
    });
  });

  describe('updateVariant', () => {
    it('should update the product property with new info', () => {
      const name = 'Foo';
      const price = 12.34;
      const event = { detail: { name, price } };

      component.updateVariant(event);

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
        promo: '30% off'
      };

      const result = component.additionalInfo();

      expect(result).to.have.length(2);
      expect(result[0]).to.be.an.instanceOf(TemplateResult);
      expect(result[1]).to.be.an.instanceOf(TemplateResult);
    });
  });

  describe('urlWrap', () => {
    it('should return the second argument wrapped in an "a" tag', () => {
      const result = component.urlWrap('string', html`<span>foo</span>`);

      expect(result).to.be.an.instanceof(TemplateResult);
    });

    it('should return the second argument', () => {
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
      it('should have a default value of "text"', () => {
        expect(component.type).to.equal('text');
      });
    });

    describe('variant property', () => {
      it('should default to an object with a text string and an empty product object', () => {
        expect(component.variant.text).to.equal('');
        expect(component.variant.product).to.deep.equal({});
      });
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const connectedCallback = stub(Base.prototype, 'connectedCallback');

      component.connectedCallback();

      expect(connectedCallback).to.have.been.called;
    });

    it('should add an eventListener to the component', () => {
      const addEventListener = stub(component, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.have.been.calledWith('click', component.changeVariant);
    });

    it('should set role to "listitem"', () => {
      const setAttribute = stub(component, 'setAttribute');

      component.connectedCallback();

      expect(setAttribute).to.have.been.calledWith('role', 'listitem');
    });

    describe('variant types', () => {
      beforeEach(() => {
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

        // expect(component.style.backgroundColor).to.equal(component.variant.color);
        expect(component.title).to.equal(component.variant.text);
      });

      it('should set title and style if the type is "image"', () => {
        component.type = 'image';

        component.connectedCallback();

        // expect(component.style.backgroundColor).to.equal(component.variant.color);
        expect(component.style.backgroundImage).to.equal(`url("${component.variant.image}")`);
        expect(component.title).to.equal(component.variant.text);
      });

      it('should set innerText if the type is "text"', () => {
        component.type = 'text';

        component.connectedCallback();

        expect(component.innerText).to.equal(component.variant.text);
      });
    });
  });

  describe('changeVariant', () => {
    it('should dispatch an event', () => {
      const dispatchEvent = stub(component, 'dispatchEvent');

      component.changeVariant();

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
