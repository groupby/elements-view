import { expect, sinon, stub } from '../utils';
import { Products, PRODUCTS_RESPONSE_EVENT } from '@sfx/products';

describe('Products Component', () => {
  let component;
  beforeEach(() => {
    component = new Products();
  });

  describe('constructor', () => {
    it('should default to have an empty array of products', () => {
      expect(component.products).to.deep.equal([]);
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

    it('should set up event listener for a provide-products event to set products', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(PRODUCTS_RESPONSE_EVENT, component.setProductsFromEvent);
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

      expect(removeEventListener).to.be.calledWith(PRODUCTS_RESPONSE_EVENT, component.setProductsFromEvent);
    });
  });

  describe('setProductsFromEvent', () => {
    it('should set the event products payload into the component', () => {
      const products = [1, 2, 3];
      const event = { detail: { results: { products } } };
      component.products = [];

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should set the products property to an empty array if payload of the event is undefined', () => {
      const event = { detail: { results: {} } };
      component.products = [];

      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });
  });
});
