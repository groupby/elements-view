import { LitElement } from 'lit-element';
import { expect, stub } from '../utils';
import { DummyComponent } from './dummy-component';
import { Base } from '@sfx/base';

describe('Base Class', () => {
  let dummyComponent;

  beforeEach(() => {
    dummyComponent = new DummyComponent();
  });

  it('should be extendable', () => {
    expect(dummyComponent).to.be.an.instanceof(Base);
  });

  describe('createRenderRoot', () => {
    it('should return the element itself', () => {
      const renderRoot = dummyComponent.createRenderRoot();

      expect(renderRoot).to.equal(dummyComponent);
    });
  });

  describe('dispatchSfxEvent', () => {
    xit('should dispatch the provided event from the component', () => {
      // let dispatchSfxEventStub;
      const eventName = 'eventName';
      const payload = { query: 'joffre' }
      // const dispatchEventStub = stub(window, 'dispatchEvent')
      const dispatchEventStub = stub(dummyComponent, 'dispatchEvent')
      const eventToDispatch = new CustomEvent(eventName, { detail: payload, bubbles: true});
      console.log('typeof eventToDispatch', typeof eventToDispatch)
      console.log('eventToDispatch', eventToDispatch)
      // const dispatchSfxEventStub = stub(dummyComponent, 'dispatchSfxEvent');
      dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(dispatchEventStub).to.have.been.called;
      // expect(dispatchEventStub).to.have.been.calledWith(eventToDispatch);
    })
    it('attempt two should dispatch the provided event from the component', () => {
      // let dispatchSfxEventStub;
      stub(window, 'CustomEvent').returns({});
      const eventName = 'eventName';
      const payload = { query: 'joffre' }
      // const dispatchEventStub = stub(window, 'dispatchEvent')
      const dispatchEventStub = stub(dummyComponent, 'dispatchEvent')
      // const eventToDispatch = new CustomEvent(eventName, { detail: payload, bubbles: true});
      // console.log('typeof eventToDispatch', typeof eventToDispatch)
      // console.log('eventToDispatch', eventToDispatch)
      // const dispatchSfxEventStub = stub(dummyComponent, 'dispatchSfxEvent');
      dummyComponent.dispatchSfxEvent(eventName, payload);

      expect(dispatchEventStub).to.have.been.called;
      // expect(dispatchEventStub).to.have.been.calledWith(eventToDispatch);
    })
  })
});
