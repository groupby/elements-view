import { expect, spy, stub } from './utils';
import { Sayt } from '../src/index';

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
  it('should call a render function', () => {
    const renderStub = stub(component, 'render').returns('component has rendered')
    expect(component.render()).to.equal('component has rendered')
    expect(renderStub).to.be.calledOnce;
  });
  it('should capitalize the placeholder term when rendering', () => {
    const capitalizeStub = spy(component, 'capitalizePlaceholder');
    const output = component.render();
    expect(capitalizeStub).to.be.calledOnce;
  });
});
