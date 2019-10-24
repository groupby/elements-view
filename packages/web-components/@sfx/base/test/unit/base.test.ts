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
    it('should dispatch a custom event with the provided event name and payload', () => {
      const eventName = 'event';
      const payload = { query: 'apple' };
      const eventObject = { a: 'b' };
      const dispatchEvent = stub(dummyComponent, 'dispatchEvent');
      const customEvent = stub(window, 'CustomEvent').returns(eventObject);

      dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(dispatchEvent).to.be.calledWith(eventObject);
      expect(customEvent).to.be.calledWith(eventName, { detail: payload, bubbles: true });
      expect(customEvent.calledWithNew()).to.be.true;
    });

    it('should return true', () => {
      const eventName = 'event';
      const payload = { query: 'apple' };

      const result = dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(result).to.equal(true);
    });
  });
});
