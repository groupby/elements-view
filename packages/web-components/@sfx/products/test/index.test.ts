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
