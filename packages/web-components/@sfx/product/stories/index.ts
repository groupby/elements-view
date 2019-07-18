import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';
import Product, { ProductModel } from '../src/product';

const product = <ProductModel> {
  name: 'Cool Product',
  price: 39.99,
  label: 'New Product',
  promo: '25% off',
  imageSrc: 'https://spudsmart.com/wp-content/uploads/2017/10/NZ-Bag-of-potatoes-cropped.png',
  imageAlt: 'Good bag of potatoes'
};

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-product 
      product="${text('Product Info', JSON.stringify({
        ...product,
         variants: { type: 'color', items: [{ color: '#bed', text: 'Mint', product }, { color: '#edc', text: 'Taupe', product }] }
      }))}"
    ></sfx-product>
  `, { 
    notes: { 
      markdown: `
        # Product Tile
        WIP: Still working on documentation
      `
    } 
}).add('Slotted Price', () => `
  <sfx-product 
    class="full"
    product="${text('Product Info', JSON.stringify(product))}"
  >
    <h1 slot="title">Slotted Title</h1>
    <p slot="price"><span style="text-decoration: line-through">29.99</span> <span style="color: #C00">19.99</span></p>
  </sfx-product>
`);
