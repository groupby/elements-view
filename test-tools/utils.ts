import * as sinonImport from 'sinon';
import * as chaiImport from 'chai';
import { LitElement } from 'lit-element';

declare var global: any;

export const sinon = global.sinon || sinonImport;
export const chai = global.chai || chaiImport;
export const expect = chai.expect;
export const stub = sinon.stub;
export const spy = sinon.spy;

export function waitForUpdateComplete(node: LitElement): Promise<boolean> {
  return node.updateComplete.then((hasUpdateCompleted: boolean) => hasUpdateCompleted || waitForUpdateComplete(node));
}
