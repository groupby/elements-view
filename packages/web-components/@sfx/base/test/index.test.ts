import { expect, spy, stub } from './utils';
import Base from '../src/index';

describe('Base Class', () => {
  it('should exist', () => {
    expect(typeof Base).to.equal('function');
  });

  it('should be constructable', () => {
    const base = new Base();
    expect(base).to.be.an.instanceof(Base);
  });

  let base: any = {};
  beforeEach(() => {
    base = new Base();
  })

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
