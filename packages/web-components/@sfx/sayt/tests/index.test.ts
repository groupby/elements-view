import { expect } from 'chai';
import { Sayt } from '../src/index';

describe('Dummy test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});

describe('Sayt Component ', () => {
  let component = {};
  beforeEach(() => {
    component = new Sayt()
  })
  it('should have property placeholder', () => {
    expect(component).to.have.property('placeholder');
  });
});
