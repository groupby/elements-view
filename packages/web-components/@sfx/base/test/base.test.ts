import { expect, spy, stub } from './utils';
import Base from '../src/base';
import { LitElement } from 'lit-element';
import { TemplateResult } from 'lit-element';
import * as BaseUtils from '../src/utils';


describe('Base Class', () => {
  let base: any = {}
  beforeEach(() => {
    base = new Base();
  });

  it('should extend from LitElement', () => {
    const base = new Base();
    expect(base).to.be.an.instanceof(LitElement);
  });

  describe('constructor', () => {
    it('should call addSlots', () => {
      const addSlotsStub = stub(Base.prototype, 'addSlots')
      base = new Base();
      expect(addSlotsStub).to.have.been.called;
    });
  });

  describe('first update', () => {
    it('should disconnect the observer', () => {
      const disconnect = spy()
      base.observer = { disconnect }
      base.firstUpdate()
      expect(disconnect).to.have.been.called;
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const litElementConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback')
      base.connectedCallback();
      expect(litElementConnectedCallbackStub).to.have.been.called;
    });

    it('should call createChildrenObserver on the observer property', () => {
      const observer = {
        observe: () => { }
      }
      const createChildrenObserverStub = stub(BaseUtils, 'createChildrenObserver').returns(observer)
      base.connectedCallback();
      expect(base.observer).to.equal(observer);
    });

    it('should call the observe function on the observer', () => {
      const observe = spy();
      const createChildrenObserverStub = stub(BaseUtils, 'createChildrenObserver').returns({ observe })
      base.connectedCallback();
      expect(observe).to.have.been.calledWith(base, { childList: true });
    });
  });

  describe('disconnectedCallback', () => {
    it('should call its super disconnectedCallback', () => {
      const litElementDisconnectedCallbackStub = stub(LitElement.prototype, 'disconnectedCallback')
      base.disconnectedCallback();
      expect(litElementDisconnectedCallbackStub).to.have.been.called;
    });
  });

  describe('render function', () => {
    it('should return an instance of TemplateResult', () => {
      const result = base.render();
      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('createRenderRoot', () => {
    it('should return its this', () => {
      base.attachShadow = spy()
      const result = base.createRenderRoot();
      expect(result).to.equal(base)
    });

    it('should call attach shadow', () => {
      const attachShadow = base.attachShadow = spy();
      base.createRenderRoot();
      expect(attachShadow).to.have.been.called;
    });
  });
});

/**
 * Some functions utilized in the Base class were pulled 
 * directly from https://github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
 * This functionality is not currently being tested within this test suite.
 */
