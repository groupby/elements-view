import { storiesOf } from '@storybook/html';
import { withKnobs, number } from '@storybook/addon-knobs';

import '../src/index.ts';
import { ProductModel } from '../../product/src/product';

const sampleProducts = [
  {
    title: 'Best Shoe',
    price: 39.99,
    label: 'New Product',
    promo: '25% off',
    imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A spicy red shoe',
  } as ProductModel,
  {
    title: 'Greatest Shoe',
    price: 49.99,
    label: 'Classic Product',
    promo: '25% off',
    imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A classic red shoe',
  } as ProductModel,
];

for (let i = 0; i < 12; i++) {
  sampleProducts.push(sampleProducts[i % 2]);
}

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    function sendSampleProducts() {
      const productsEvent = new CustomEvent('sfx:provide-products', {
        detail: {
          products: sampleProducts,
        }
      });
      window.dispatchEvent(productsEvent);
    }
    // @TODO Find other way of setting default products. Hacky.
    window.setTimeout(sendSampleProducts, 300);

    return `
      <style>
        * {
          box-sizing: border-box;
        }
        .product-wrapper {
          width: 33%;
          padding: 6px;
        }
        sfx-product {
          box-shadow: 0 0 15px -5px rgba(0,0,0,0.5);
          padding: 12px;
        }
        sfx-product img {
          width: 100%;
        }
        sfx-product {
        }
      </style>
      <sfx-products
        maxItems="${number('Max items', 12)}"
      ></sfx-products>
    `}, {
    notes: {
      markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
    },
});
