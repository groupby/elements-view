import { expect, sinon, spy, stub } from './utils';
import { Products } from '../src/index';

describe('Products Component ', () => {
  let component: any = {};
  beforeEach(() => {
    component = new Products();
  });

  describe('general', () => {
    it('should default to have an empty array of products', () => {
      expect(component.products).to.deep.equal([]);
    });

    it('should default to 12 maxItems', () => {
      expect(component.maxItems).to.deep.equal(12);
    });
  });

  describe('Products static methods', () => {
    it('should reflect maxItems as a property', () => {
      expect(Products.properties.maxItems.reflect).to.equal(true);
    });
  });

  describe('setProductsFromEvent', () => {
    it('should set the event products payload into the component', () => {
      const products = [1, 2, 3];
      const event = { detail: { products }};
      expect(component.products).to.deep.equal([]);

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });
  });

  describe('setUpEventListeners', () => {
    it('should listen for a provide products event to set products', () => {
      const listenStub = sinon.stub(window, 'addEventListener');
      const callbackStub = sinon.stub(component, 'setProductsFromEvent');

      component.setUpEventListeners();

      expect(listenStub).to.be.calledWith('sfx:provide-products', callbackStub);
    });
  });

  describe('getRenderableProducts', () => {
    it('should return zero products if there are none', () => {
      const renderableProducts = component.getRenderableProducts();

      expect(component.products.length).to.equal(0);
      expect(renderableProducts.length).to.equal(0);
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
