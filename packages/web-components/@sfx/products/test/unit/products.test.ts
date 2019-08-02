import { expect, sinon, stub } from '../utils';
import Products, { PRODUCTS_EVENT } from '../../src/products';

describe('Products Component', () => {
  let component;
  beforeEach(() => {
    component = new Products();
  });

  describe('general', () => {
    it('should default to have an empty array of products', () => {
      expect(component.products).to.deep.equal([]);
    });
  });

  describe('connectedCallback', () => {
    it('should call super', () => {
      const superConnected = stub(component.__proto__, 'connectedCallback');

      component.connectedCallback();

      expect(superConnected).to.be.calledOnce;
    });

    it('should set up event listener for a provide-products event to set products', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(PRODUCTS_EVENT, component.setProductsFromEvent);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call super', () => {
      const superDisconnected = stub(component.__proto__, 'disconnectedCallback');

      component.disconnectedCallback();

      expect(superDisconnected).to.be.calledOnce;
    });

    it('should remove provide-products event listener', () => {
      const removeEventListener = sinon.stub(window, 'removeEventListener');

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(PRODUCTS_EVENT, component.setProductsFromEvent);
    });
  });

  describe('setProductsFromEvent', () => {
    it('should set the event products payload into the component', () => {
      const products = [1, 2, 3];
      const event = { detail: { products }};
      component.products = [];

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });
  });
});
