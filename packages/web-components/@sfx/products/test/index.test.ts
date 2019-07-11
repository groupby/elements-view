import { expect, spy, stub } from './utils';
import { Products } from '../src/index';

describe('Dummy test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});

describe('Products Component ', () => {
  let component: any = {};
  beforeEach(() => {
    component = new Products();
  })
});
