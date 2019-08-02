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

    it('should default to 12 maxItems', () => {
      expect(component.maxItems).to.equal(12);
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

  describe('getRenderableProducts', () => {
    it('should return zero products if there are none', () => {
      const renderableProducts = component.getRenderableProducts();

      expect(component.products).to.be.empty;
      expect(renderableProducts).to.be.empty;
    });

    it('should return all products if maxItems is greater than the number of products', () => {
      const products = [1, 2, 3];
      component.products = products;
      component.maxItems = 5;

      const renderableProducts = component.getRenderableProducts();

      expect(renderableProducts).to.deep.equal(products);
    });

    it('should return fewer products if maxItems is smaller than the number of products', () => {
      const products = [1, 2, 3, 4, 5];
      component.products = products;
      component.maxItems = 2;

      const renderableProducts = component.getRenderableProducts();

      expect(renderableProducts).to.deep.equal([1, 2]);
    });
  });
});
