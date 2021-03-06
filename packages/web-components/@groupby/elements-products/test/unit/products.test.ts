import {
  CACHE_REQUEST,
  CACHE_RESPONSE_PREFIX,
  SAYT_PRODUCTS_RESPONSE,
  SEARCH_RESPONSE,
} from '@groupby/elements-events';
import {
  expect,
  stub,
  itShouldExtendBase,
  itShouldCallParentMethod,
  itShouldExtendClass,
} from '../utils';
import ProductsBase from '../../src/products-base';
import ProductsSayt from '../../src/products-sayt';
import ProductsSearch from '../../src/products-search';

describe('Products Base Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsBase();
  });

  itShouldExtendBase(() => component);

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
    itShouldCallParentMethod(() => component, 'connectedCallback');

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

  describe('requestInitialData', () => {
    it('should dispatch a cache request event', () => {
      const dispatchElementsEvent = stub(component, 'dispatchElementsEvent');
      const name = 'event';
      const group = 'group';
      const returnEvent = 'event-return';

      component.requestInitialData(name, group, returnEvent);

      expect(dispatchElementsEvent).to.be.calledWith(CACHE_REQUEST, { name, group, returnEvent });
    });
  });

  describe('setProductsFromCacheEvent', () => {
    let event;
    let products;

    beforeEach(() => {
      products = [1, 2, 3];
      event = { detail: { data: { products } } };
    });
    it('should set products to an empty array if the event payload does not contain products', () => {
      event.detail.data.products = [];

      component.setProductsFromCacheEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products if given an event payload that contains products', () => {
      component.setProductsFromCacheEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should not set products if they have already been inititalized', () => {
      component._initialized = true;

      component.setProductsFromCacheEvent(event);

      expect(component.products).to.deep.equal([]);
    });
  });

  describe('cacheResponseEventName', () => {
    it('should return an event name for receiving cached data', () => {
      const componentId = component.componentId = 'some-id';
      const tagName = 'some-products-component';
      const expectedCacheResponseEventName = `${CACHE_RESPONSE_PREFIX}${tagName}-${componentId}`;
      stub(component, 'tagName').get(() => tagName);

      const eventName = component.cacheResponseEventName;

      expect(eventName).to.equal(expectedCacheResponseEventName);
    });
  });
});

describe('Products Sayt Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsSayt();
  });

  itShouldExtendClass(() => component, ProductsBase);

  describe('connectedCallback', () => {
    const cacheResponseEventName = 'cache-response-event-name';
    let addEventListener;
    let requestInitialData;

    beforeEach(() => {
      addEventListener = stub(window, 'addEventListener');
      requestInitialData = stub(component, 'requestInitialData');
      stub(component, 'cacheResponseEventName').get(() => cacheResponseEventName);
    });

    itShouldCallParentMethod(() => component, 'connectedCallback');

    it('should add event listeners for sayt products events', () => {
      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(
        SAYT_PRODUCTS_RESPONSE,
        component.setProductsFromProductsEvent
      );
      expect(addEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
    });

    it('should request initial data', () => {
      component.connectedCallback();

      expect(requestInitialData).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, component.group, component.cacheResponseEventName);
    });

    it('should not request initial data if it has already been initialized', () => {
      component._initialized = true;

      component.connectedCallback();

      expect(addEventListener).to.not.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
      expect(requestInitialData).to.not.be.called;
    });
  });

  describe('disconnectedCallback', () => {
    let removeEventListener;

    beforeEach(() => {
      removeEventListener = stub(window, 'removeEventListener');
    });

    itShouldCallParentMethod(() => component, 'disconnectedCallback');

    it('should remove event listeners for sayt products', () => {
      const cacheResponseEventName = 'cache-response-event-name';
      stub(component, 'cacheResponseEventName').get(() => cacheResponseEventName);

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(
        SAYT_PRODUCTS_RESPONSE,
        component.setProductsFromProductsEvent
      );

      expect(removeEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
    });
  });

  describe('setProductsFromProductsEvent', () => {
    let products;
    let group;

    beforeEach(() => {
      products = [1, 2, 3];
      group = 'group';
    });

    it('should set products to an empty array if the event payload does not contain products', () => {
      const event = { detail: {} };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products when the event matches the group in the component', () => {
      const event = { detail: { products, group } };
      component.group = group;

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should not set products when the group in the component and event do not match', () => {
      const event = { detail: { products, group } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const event = { detail: { products } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should default the group in the component to an empty string if it is falsey', () => {
      component.group = undefined;
      const event = { detail: { products } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });
  });
});

describe('Products Search Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsSearch();
  });

  itShouldExtendClass(() => component, ProductsBase);

  describe('connectedCallback', () => {
    const cacheResponseEventName = 'cache-response-event-name';
    let addEventListener;
    let requestInitialData;

    beforeEach(() => {
      addEventListener = stub(window, 'addEventListener');
      requestInitialData = stub(component, 'requestInitialData');
      stub(component, 'cacheResponseEventName').get(() => cacheResponseEventName);
    });

    itShouldCallParentMethod(() => component, 'connectedCallback');

    it('should add event listeners for sayt products events', () => {
      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(
        SEARCH_RESPONSE,
        component.setProductsFromProductsEvent
      );
      expect(addEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
    });

    it('should request initial data', () => {
      component.connectedCallback();

      expect(requestInitialData).to.be.calledWith(SEARCH_RESPONSE, component.group, component.cacheResponseEventName);
    });

    it('should not request initial data if it has already been initialized', () => {
      component._initialized = true;

      component.connectedCallback();

      expect(addEventListener).to.not.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
      expect(requestInitialData).to.not.be.called;
    });
  });

  describe('disconnectedCallback', () => {
    let removeEventListener;

    beforeEach(() => {
      removeEventListener = stub(window, 'removeEventListener');
    });

    itShouldCallParentMethod(() => component, 'disconnectedCallback');

    it('should remove event listeners for sayt products', () => {
      const cacheResponseEventName = 'cache-response-event-name';
      stub(component, 'cacheResponseEventName').get(() => cacheResponseEventName);

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(
        SEARCH_RESPONSE,
        component.setProductsFromProductsEvent
      );

      expect(removeEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheEvent
      );
    });
  });

  describe('setProductsFromProductsEvent', () => {
    let products;
    let group;

    beforeEach(() => {
      products = [1, 2, 3];
      group = 'group';
    });

    it('should set products to an empty array if the event payload does not contain records', () => {
      const event = { detail: { results: {} } };
      component.setProductsFromProductsEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products when the event matches the group in the component', () => {
      const event = { detail: { products, group } };
      component.group = group;

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should not set products when the group in the component and event do not match', () => {
      const event = { detail: { products, group } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const event = { detail: { products } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should default the group in the component to an empty string if it is falsey', () => {
      component.group = undefined;
      const event = { detail: { products } };

      component.setProductsFromProductsEvent(event);

      expect(component.products).to.equal(products);
    });
  });
});
