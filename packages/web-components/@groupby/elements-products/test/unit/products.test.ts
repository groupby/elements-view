import {
  CACHE_RESPONSE_PREFIX,
  SAYT_PRODUCTS_RESPONSE,
  SEARCH_RESPONSE,
  CACHE_REQUEST,
} from '@groupby/elements-events';
import {
  expect,
  sinon,
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
      const name = 'event'
      const group = 'group'
      const returnEvent = 'event-return'

      component.requestInitialData(name, group, returnEvent);

      expect(dispatchElementsEvent).to.have.been.calledWith(CACHE_REQUEST, { name, group, returnEvent });

    })
  })
});

describe('Products Sayt Component', () => {
  let component;

  beforeEach(() => {
    component = new ProductsSayt();
    stub();
  });

  itShouldExtendClass(() => component, ProductsBase);

  describe('connectedCallback', () => {
    itShouldCallParentMethod(() => component, 'connectedCallback');

    it('should set cacheResponseEventName with the name for cache response event', () => {

    });

    it('should add event listeners for sayt products events', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');
      const componentId = component.componentId = 'some-id';
      const componentName = component.componentName = 'products-sayt';
      const cacheResponseEventName = component.getResponseEventName(componentName, componentId);

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(
        SAYT_PRODUCTS_RESPONSE,
        component.setProductsFromEvent
      );
      expect(addEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheData
      );
    });

    it('should call requestInitialData', () => {
      const requestInitialData = stub(component, 'requestInitialData');
      const cacheResponseEventName = 'dog'
      stub(component, 'getResponseEventName').returns(cacheResponseEventName);

      component.connectedCallback();

      expect(requestInitialData).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, component.group, cacheResponseEventName);
    });
  });

  describe('disconnectedCallback', () => {
    itShouldCallParentMethod(() => component, 'disconnectedCallback');

    it('should remove event listeners for sayt products', () => {
      const removeEventListener = sinon.stub(window, 'removeEventListener');
      const componentId = component.componentId = 'some-id';
      const componentName = component.componentName = 'products-sayt';
      const cacheResponseEventName = component.getResponseEventName(componentName, componentId);

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(
        SAYT_PRODUCTS_RESPONSE,
        component.setProductsFromEvent
      );

      expect(removeEventListener).to.be.calledWith(
        cacheResponseEventName,
        component.setProductsFromCacheData
      );
    });
  });

  describe('getResponseEventName', () => {
    it('should return an event name for receiving cached data', () => {
     const componentId = component.componentId = 'some-id';
     const componentName = component.componentName = 'products-sayt';
     const expectedCacheResponseEventName = `${CACHE_RESPONSE_PREFIX}${componentName}-${componentId}`;

     const eventName = component.getResponseEventName(componentName, componentId);

     expect(eventName).to.equal(expectedCacheResponseEventName);
  });
});

  describe('setProductsFromCacheData', () => {
    it('should set products to an empty array if the event payload does not contain products', () => {
      const event = { detail: { results: {} } };

      component.setProductsFromCacheData(event);

      expect(component.products).to.deep.equal([]);
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

    it('should default the group in the component to an empty string if it is falsey', () => {
      component.group = undefined;
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

  itShouldExtendClass(() => component, ProductsBase);

  describe('connectedCallback', () => {
    itShouldCallParentMethod(() => component, 'connectedCallback');

    it('should set up an event listener for a search response to set products', () => {
      const addEventListener = sinon.stub(window, 'addEventListener');

      component.connectedCallback();

      expect(addEventListener).to.be.calledWith(SEARCH_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('disconnectedCallback', () => {
    itShouldCallParentMethod(() => component, 'disconnectedCallback');

    it('should remove an event listener for search responses', () => {
      const removeEventListener = sinon.stub(window, 'removeEventListener');

      component.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SEARCH_RESPONSE, component.setProductsFromEvent);
    });
  });

  describe('setProductsFromEvent', () => {
    let products;
    let group;

    beforeEach(() => {
      products = [1, 2, 3];
      group = 'group';
    });

    it('should set products to an empty array if the event payload does not contain records', () => {
      const event = { detail: { results: {} } };
      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should set products when the event matches the group in the component', () => {
      const event = { detail: { results: { products }, group } };
      component.group = group;

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should not set products when the group in the component and event do not match', () => {
      const event = { detail: { results: { products }, group } };

      component.setProductsFromEvent(event);

      expect(component.products).to.deep.equal([]);
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const event = { detail: { results: { products } } };

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });

    it('should default the group in the component to an empty string if it is falsey', () => {
      component.group = undefined;
      const event = { detail: { results: { products } } };

      component.setProductsFromEvent(event);

      expect(component.products).to.equal(products);
    });
  });
});
