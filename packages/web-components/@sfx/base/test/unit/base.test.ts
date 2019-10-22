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
      const eventName = 'eventName';
      const payload = { query: 'joffre' }
      const customEventObject = {a: 'b'};
      const dispatchEventStub = stub(dummyComponent, 'dispatchEvent')
      const customEventStub = stub(window, 'CustomEvent').returns(customEventObject)
      dummyComponent.dispatchSfxEvent(eventName, payload);
      expect(dispatchEventStub).to.have.been.calledWith(customEventObject);
      expect(customEventStub).to.have.been.calledWith(eventName, { detail: payload, bubbles: true});
      expect(customEventStub.calledWithNew()).to.be.true;
    })
  })
});


