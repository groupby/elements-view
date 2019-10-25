/* eslint-disable import/no-extraneous-dependencies, no-undef, no-unused-expressions, no-var */
import * as sinonImport from 'sinon';
import * as chaiImport from 'chai';
import { LitElement } from 'lit-element';
// eslint-disable-next-line  import/no-unresolved
import { Base } from '@sfx/base';

declare var global: any;

export const sinon = global.sinon || sinonImport;
export const chai = global.chai || chaiImport;
export const { expect } = chai;
export const { stub, spy } = sinon;

export function waitForUpdateComplete(node: LitElement): Promise<boolean> {
  return node.updateComplete.then((hasUpdateCompleted: boolean) => hasUpdateCompleted || waitForUpdateComplete(node));
}

export function itShouldExtendClass(componentThunk: () => any, constructor: { new(): any }): void {
  it(`should extend the ${constructor.name} class`, () => {
    expect(componentThunk()).to.be.an.instanceof(constructor);
  });
}

export function itShouldExtendBase(componentThunk: () => any): void {
  itShouldExtendClass(componentThunk, Base as any);
}

export function itShouldCallParentMethod(componentThunk: () => any, methodName: string, ...args: any[]): void {
  it(`should call its parent method, ${methodName}`, () => {
    const componentInstance = componentThunk();
    const parentMethod = stub(Object.getPrototypeOf(componentInstance), methodName);

    componentInstance[methodName](...args);

    expect(parentMethod).to.have.been.called;
  });
}
