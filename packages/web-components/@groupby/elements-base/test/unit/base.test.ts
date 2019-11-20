import { expect, stub, spy } from '../utils';
import { DummyComponent } from './dummy-component';
import { dataInitializer } from '../../src';

describe('dataInitializer decorator', () => {
  const testPropertyName = 'results';
  let testObj;

  beforeEach(() => {
    testObj = {
      init: false,
      get results() {
        return this._results;
      },
      set results(val) {
        this._results = val;
      },
      _results: ['a', 'b'],
    };
  });

  it('should extend a property setter', () => {
    const originalSet = spy(testObj, 'results', ['set']);
    dataInitializer('init')(testObj, testPropertyName);

    testObj.results = ['c', 'd'];

    expect(originalSet.set).to.be.called;
    expect(testObj.results).to.deep.equal(['c', 'd']);
  });

  it('should not set the initialize property to true on the first set call', () => {
    dataInitializer('init')(testObj, testPropertyName);

    testObj.results = ['c', 'd'];

    expect(testObj.init).to.be.false;
  });

  it('should not set the initialize property to true on the first set call', () => {
    dataInitializer('init')(testObj, testPropertyName);

    testObj.results = ['c', 'd'];
    testObj.results = ['e', 'f'];

    expect(testObj.init).to.be.true;
  });

  it('should store the initialization states between multiple instances of the component', () => {
    const testObj2 = { ...testObj };
    Object.defineProperty(
      testObj2,
      testPropertyName,
      Object.getOwnPropertyDescriptor(testObj, 'results'),
    );
    dataInitializer('init')(testObj, testPropertyName);
    dataInitializer('init')(testObj2, testPropertyName);

    testObj.results = ['c', 'd'];
    testObj.results = ['e', 'f'];

    expect(testObj.init).to.be.true;
    expect(testObj2.init).to.be.false;
  });

  it('should only modify the set function of the property descriptor', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(testObj, testPropertyName);

    dataInitializer('init')(testObj, testPropertyName);
    const newDescriptor = Object.getOwnPropertyDescriptor(testObj, testPropertyName);
    const { get, set, enumerable, configurable } = newDescriptor

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
