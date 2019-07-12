import { expect, spy, stub } from './utils';
import { Products } from '../src/index';

describe('Products Component ', () => {
  let component: any = {};
  beforeEach(() => {
    component = new Products();
  });

  it('should default to have an empty array of products', () => {
    expect(component.products).to.deep.equal([]);
  })
});

describe('setProductsFromEvent', () => {
  let component: Products;
  beforeEach(() => {
    component = new Products();
  });

  it('should set the event products payload into the component', () => {
    const products = [1, 2, 3];
    const event = { detail: { products }};
    expect(component.products).to.deep.equal([]);

    component.setProductsFromEvent(event);

    expect(component.products).to.equal(products);
  });
});
