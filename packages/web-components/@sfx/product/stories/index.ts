import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';
import { Product, ProductModel } from '../src';

const product = <ProductModel> {
  name: 'Cool Product',
  price: 39.99,
  label: 'New Product',
  promo: '25% off'
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
    <h1 slot="title">Slotted Title</h1>
    <p slot="price"><span style="text-decoration: line-through">29.99</span> <span style="color: #C00">19.99</span></p>
  </sfx-product>
`);
