import { expect } from 'chai';
import { spy } from 'sinon'; 

import { Sayt } from '../src/index';

require('../../../../../tests-setup')();

describe('Dummy test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});

describe('Sayt Component ', () => {
  let component: any = {};
  beforeEach(() => {
    component = new Sayt();
  })
  it('should have property placeholder', () => {
    expect(component).to.have.property('placeholder');
  });
  it('should call render function', () => {
    const rendered = spy(component, "render");

    component.render();

    expect(rendered).to.be.calledOnce;
  })
});
