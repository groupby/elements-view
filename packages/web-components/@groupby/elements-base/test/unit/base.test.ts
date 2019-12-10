import { expect, spy, stub } from '../utils';
import { DummyComponent } from './dummy-component';
import { dataInitializer } from '../../src';

describe('dataInitializer decorator', () => {
  const initProp = 'init';
  const testPropertyName = 'results';
  let testObj;
  let originalGet;
  let originalSet;

  beforeEach(() => {
    testObj = {
      init: false,
      results: [],
    };
    originalGet = spy();
    originalSet = spy();
    Object.defineProperty(testObj, 'results', {
      get: originalGet,
      set: originalSet,
      enumerable: true,
      configurable: true,
    });
  });

  it('should extend a property setter', () => {
    dataInitializer(initProp)(testObj, testPropertyName);

    testObj.results = ['c', 'd'];

    expect(originalSet).to.be.called;
  });

  it('should not set the initialize property to true on the first set call', () => {
    dataInitializer(initProp)(testObj, testPropertyName);

    testObj.results = ['c', 'd'];

    expect(testObj.init).to.be.false;
  });

  it('should not set the initialize property to true on the first set call', () => {
    dataInitializer(initProp)(testObj, testPropertyName);

    testObj.results = ['c', 'd'];
    testObj.results = ['e', 'f'];

    expect(testObj.init).to.be.true;
  });

  it('should store the initialization states between multiple instances of the component', () => {
    // Creating a second instance of the object with the same accessors.
    const otherTestObj = { ...testObj };
    Object.defineProperty(
      otherTestObj,
      testPropertyName,
      Object.getOwnPropertyDescriptor(testObj, 'results')
    );
    dataInitializer(initProp)(testObj, testPropertyName);
    dataInitializer(initProp)(otherTestObj, testPropertyName);

    testObj.results = ['c', 'd'];
    testObj.results = ['e', 'f']; // sic

    expect(testObj.init).to.be.true;
    expect(otherTestObj.init).to.be.false;
  });

  it('should only modify the set function of the property descriptor', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(testObj, testPropertyName);

    dataInitializer(initProp)(testObj, testPropertyName);
    const newDescriptor = Object.getOwnPropertyDescriptor(testObj, testPropertyName);
    const {
      get,
      set,
      enumerable,
      configurable,
    } = newDescriptor;

    expect(set).to.not.equal(originalDescriptor.set);
    expect(get).to.equal(originalDescriptor.get);
    expect(enumerable).to.equal(originalDescriptor.enumerable);
    expect(configurable).to.equal(originalDescriptor.configurable);
  });
});

describe('Base Class', () => {
  let dummyComponent;

  beforeEach(() => {
    dummyComponent = new DummyComponent();
  });

  describe('constructor()', () => {
    describe('_initialized property', () => {
      it('should have a default value of false', () => {
        expect(dummyComponent._initialized).to.be.false;
      });
    });
  });

  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = dummyComponent.createRenderRoot();

      expect(renderRoot).to.equal(dummyComponent);
    });
  });

  describe('dispatchElementsEvent', () => {
    const eventName = 'event';
    const dispatchEventReturnValue = true;
    let payload;
    let dispatchEvent;

    beforeEach(() => {
      payload = { query: 'apple' };
      dispatchEvent = stub(dummyComponent, 'dispatchEvent').returns(dispatchEventReturnValue);
    });

    it('should dispatch a custom event with the provided event name and payload', () => {
      const eventObject = { a: 'b' };
      const customEvent = stub(window, 'CustomEvent').returns(eventObject);

      dummyComponent.dispatchElementsEvent(eventName, payload);

      expect(dispatchEvent).to.be.calledWith(eventObject);
      expect(customEvent).to.be.calledWith(eventName, { detail: payload, bubbles: true });
      expect(customEvent.calledWithNew()).to.be.true;
    });

    it('should forward the return value of dispatchEvent', () => {
      const result = dummyComponent.dispatchElementsEvent(eventName, payload);

      expect(result).to.equal(dispatchEventReturnValue);
    });
  });
});
