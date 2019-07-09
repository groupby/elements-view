import { expect, spy, stub } from './utils';
import Base from '../src/index';
import { LitElement } from 'lit-element';

describe('Base Class', () => {
  let base: any = {};
  beforeEach(() => {
    base = new Base();
  })

  it('should extend from LitElement', () => {
    const base = new Base();
    expect(base).to.be.an.instanceof(LitElement);
  });

  it('should expose methods', () => {
    const methods = [
      'addSlots',
      'firstUpdate',
      'createRenderRoot'
    ];
    methods.forEach((method) => {
      it(`should expose: ${method}()`, () => {
        expect(base[method]).to.be.a('function');
      });
    })
  })
 
});
