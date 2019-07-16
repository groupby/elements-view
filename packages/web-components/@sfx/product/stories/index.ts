import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';
import { Product, ProductModel } from '../src';

const product = <ProductModel> {
  name: 'Cool Product',
  price: 39.99,
  promo: 'DEALS TODAY',
  salePrice: 12.39
};

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-product 
      product="${text('Product Info', JSON.stringify(product))}"
    ></sfx-product>
  `, { 
    notes: { 
      markdown: `
        # Product Tile
        Hardcoded
        
        Here is the documentation for the SAYT component.
      `
    } 
}).add('Slotted Price', () => `
  <sfx-product 
    product="${text('Product Info', JSON.stringify(product))}"
  >
    <h1 slot="title">No THANKS</h1>
    <h4 slot="price"><span>29.99</span> <span>19.99</span></h4>
  </sfx-product>
`);
