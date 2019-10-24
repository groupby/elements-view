import { expect, stub } from '../utils';
import { DummyComponent } from './dummy-component';

describe('Base Class', () => {
  let dummyComponent;

  beforeEach(() => {
    dummyComponent = new DummyComponent();
  });

  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = dummyComponent.createRenderRoot();

      expect(renderRoot).to.equal(dummyComponent);
    });
  });

  describe('dispatchSfxEvent', () => {
    let eventName;
    let payload;
    let dispatchEventReturnValue;
    let dispatchEvent;

    beforeEach(() => {
      dispatchEventReturnValue = true
      eventName = 'event';
      payload = { query: 'apple' };
      dispatchEvent = stub(dummyComponent, 'dispatchEvent').returns(dispatchEventReturnValue);
    });

    it('should dispatch a custom event with the provided event name and payload', () => {
      const eventObject = { a: 'b' };
      const customEvent = stub(window, 'CustomEvent').returns(eventObject);

      dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(dispatchEvent).to.be.calledWith(eventObject);
      expect(customEvent).to.be.calledWith(eventName, { detail: payload, bubbles: true });
      expect(customEvent.calledWithNew()).to.be.true;
    });

    it('should forward the return value of dispatchEvent', () => {
      const result = dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(result).to.equal(dispatchEventReturnValue);
    });
  });
});
