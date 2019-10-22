/* eslint-disable */
import * as sinonImport from 'sinon';
import * as chaiImport from 'chai';
import { LitElement } from 'lit-element';
import { Base } from '@sfx/base';

declare var global: any;

export const sinon = global.sinon || sinonImport;
export const chai = global.chai || chaiImport;
export const expect = chai.expect;
export const stub = sinon.stub;
export const spy = sinon.spy;

export function waitForUpdateComplete(node: LitElement): Promise<boolean> {
  return node.updateComplete.then((hasUpdateCompleted: boolean) => hasUpdateCompleted || waitForUpdateComplete(node));
}

export function shouldExtendBase(component): void {
  let componentInstance;
  before(() => {
    componentInstance = new component();
  });
  it('should extend the Base class', () => {
    expect(componentInstance).to.be.an.instanceof(Base);
  });
}

export function shouldCallSuperConnectedCallback(component): void {
  let componentInstance;
  before(() => {
    componentInstance = new component();
  });
  it('should call its super connectedCallback', () => {
    const superConnectedCallbackStub = stub(Object.getPrototypeOf(componentInstance), 'connectedCallback');

    componentInstance.connectedCallback();

    expect(superConnectedCallbackStub).to.have.been.called;
  });
}

export function shouldCallSuperDisconnectedCallback(component): void {
  let componentInstance;
  before(() => {
    componentInstance = new component();
  });
  it('should call its super disconnectedCallback', () => {
    const superDisconnectedCallbackStub = stub(Object.getPrototypeOf(componentInstance), 'disconnectedCallback');

    componentInstance.disconnectedCallback();

    expect(superDisconnectedCallbackStub).to.have.been.called;
  });
}

