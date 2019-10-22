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

export function baseExtendTest(component): void {
  let componentInstance;
  before(() => {
    componentInstance = new component();
  });
  it('should extend the Base class', () => {
    console.log('component in test', componentInstance)
    expect(componentInstance).to.be.an.instanceof(Base);
  });
}

export function superConnectedCallbackTest(component): void {
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

export function superDisconnectedCallbackTest(component): void {
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

