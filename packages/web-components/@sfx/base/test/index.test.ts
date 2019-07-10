import { expect, spy, stub } from './utils';
import Base from '../src/index';
import { LitElement } from 'lit-element';
import { TemplateResult } from 'lit-element';

describe('Base Class', () => {
  let base: any = {};
  beforeEach(() => {
    base = new Base();
  })

  it('should extend from LitElement', () => {
    const base = new Base();
    expect(base).to.be.an.instanceof(LitElement);
  });

  describe('constructor', () => {
    it('should call addSlots', () => {
      const addSlotsStub = stub(Base.prototype, 'addSlots')
      base = new Base();
      expect(addSlotsStub).to.have.been.called;
    })
  })


  describe('first update', () => {
    it('should disconnect the observer', () => {
      const disconnect = spy()
      base.observer = { disconnect }
      base.firstUpdate()
      expect(disconnect).to.have.been.called;
    })
  })

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const litElementConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback')
      base.connectedCallback();
      expect(litElementConnectedCallbackStub).to.have.been.called;
    })
  });

  describe('disconnectedCallback', () => {
    it('should call its super disconnectedCallback', () => {
      const litElementDisconnectedCallbackStub = stub(LitElement.prototype, 'disconnectedCallback')
      base.disconnectedCallback();
      expect(litElementDisconnectedCallbackStub).to.have.been.called;
    })
  });

  describe('render function', () => {
    it('should return an instance of TemplateResult', () => {
      const result = base.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    })
  })

 
});
