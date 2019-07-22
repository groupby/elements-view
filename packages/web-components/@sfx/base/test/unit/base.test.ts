import { expect, spy, stub } from '../utils';
import Base from '../../src/base';
import { LitElement } from 'lit-element';
import { TemplateResult } from 'lit-element';
import * as BaseUtils from '../../src/utils';

describe('Base Class', () => {
  let base;
  
  beforeEach(() => {
    base = new Base();
  });

  it('should extend from LitElement', () => {
    expect(base).to.be.an.instanceof(LitElement);
  });

  describe('constructor', () => {
    it('should add slots', () => {
      const addSlotsStub = stub(Base.prototype, 'addSlots');

      base = new Base();

      expect(addSlotsStub).to.have.been.called;
    });
  });

  describe('connectedCallback', () => {
    it('should call its super connectedCallback', () => {
      const litElementConnectedCallbackStub = stub(LitElement.prototype, 'connectedCallback');

      base.connectedCallback();

      expect(litElementConnectedCallbackStub).to.have.been.called;
    });

    it('should call createChildrenObserver on the observer property', () => {
      const observer = {
        observe: () => {}
      };
      stub(BaseUtils, 'createChildrenObserver').returns(observer);

      base.connectedCallback();

      expect(base.observer).to.equal(observer);
    });

    it('should observe changes to the child list', () => {
      const observe = spy();
      stub(BaseUtils, 'createChildrenObserver').returns({ observe });

      base.connectedCallback();

      expect(observe).to.have.been.calledWith(base, { childList: true });
    });
  });

  describe('firstUpdate', () => {
    it('should disconnect the observer', () => {
      const disconnect = spy();
      base.observer = { disconnect };

      base.firstUpdate();

      expect(disconnect).to.have.been.called;
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = base.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('createRenderRoot', () => {
    it('should return the root of the instance itself', () => {
      base.attachShadow = () => {};

      const result = base.createRenderRoot();

      expect(result).to.equal(base);
    });

    it('should attach shadow root', () => {
      const attachShadow = (base.attachShadow = spy());

      base.createRenderRoot();

      expect(attachShadow).to.have.been.called;
    });
  });
});
