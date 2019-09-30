import { expect, sinon, stub } from '../utils';
import { SAYT_PRODUCTS_RESPONSE, SEARCH_RESPONSE } from '@sfx/events';
import ProductsBase from '../../src/products-base';
import ProductsSayt from '../../src/products-sayt';
import ProductsSearch from '../../src/products-search';

describe('Products Base Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsBase();
  });

  describe('constructor', () => {
    describe('products property', () => {
      it('should default to be an empty array of products', () => {
        expect(component.products).to.deep.equal([]);
      });
    });

    describe('group property', () => {
      it('should have default value of an empty string', () => {
        expect(component.group).to.equal('');
      });
    });
  });

  describe('connectedCallback', () => {
    it('should call super', () => {
      const superConnected = stub(Object.getPrototypeOf(component), 'connectedCallback');

      component.connectedCallback();

      expect(superConnected).to.be.calledOnce;
    });

    it('should set role attribute if not set', () => {
      const setAttribute = stub(component, 'setAttribute');
      stub(component, 'getAttribute').withArgs('role').returns(null);

      component.connectedCallback();

      expect(setAttribute).to.be.calledWith('role', 'list');
    });

    it('should not set role attribute if already present', () => {
      const setAttribute = stub(component, 'setAttribute');
      stub(component, 'getAttribute').withArgs('role').returns('button');

      component.connectedCallback();

      expect(setAttribute).to.not.be.called;
    });
  });
});

describe('Products Sayt Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsSayt();
  });

  describe('connectedCallback', () => {
    it('should call super', () => {
      const superConnected = stub(Object.getPrototypeOf(component), 'connectedCallback');

      component.connectedCallback();

      expect(superConnected).to.be.calledOnce;
    });

    it('should set up event listener for a provide-products event to set products', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call super', () => {
      const superDisconnected = stub(Object.getPrototypeOf(component), 'disconnectedCallback');

      component.disconnectedCallback();

      expect(superDisconnected).to.be.calledOnce;
    });

    it('should remove provide-products event listener', () => {
      const removeEventListener = sinon.stub(window, 'removeEventListener');

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('setProductsFromEvent', () => {
    let products;
    let group;

    beforeEach(() => {
      products = [1, 2, 3];
      group = 'group';
    });

    it('should set products to an empty array if the event payload does not contain products', () => {
      const event = { detail: {} };
      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products when the event matches the group in the component', () => {
      const event = { detail: { products, group } };
      component.group = group;

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should not set products when the group in the component and event do not match', () => {
      const event = { detail: { products, group } };

      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const event = { detail: { products } };

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });
  });
});

describe('Products Search Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsSearch();
  });

  describe('connectedCallback', () => {
    it('should call super', () => {
      const superConnected = stub(Object.getPrototypeOf(component), 'connectedCallback');

      component.connectedCallback();

      expect(superConnected).to.be.calledOnce;
    });

    it('should set up event listener for a provide-products event to set products', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(SEARCH_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call super', () => {
      const superDisconnected = stub(Object.getPrototypeOf(component), 'disconnectedCallback');

      component.disconnectedCallback();

      expect(superDisconnected).to.be.calledOnce;
    });

    it('should remove provide-products event listener', () => {
      const removeEventListener = sinon.stub(window, 'removeEventListener');

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SEARCH_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('setProductsFromEvent', () => {
    let records;
    let group;

    beforeEach(() => {
      records = [1, 2, 3];
      group = 'group';
    });

    it('should set products to an empty array if the event payload does not contain records', () => {
      const event = { detail: { results: {} } };
      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products when the event matches the group in the component', () => {
      const event = { detail: { results: { records }, group } };
      component.group = group;

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(records);
    });

    it('should not set products when the group in the component and event do not match', () => {
      const event = { detail: { results: { records }, group } };

      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const event = { detail: { results: { records } } };

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(records);
    });
  });
});
