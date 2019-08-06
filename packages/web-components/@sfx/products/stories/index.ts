import { storiesOf } from '@storybook/html';
import { withKnobs, number } from '@storybook/addon-knobs';

import { PRODUCTS_EVENT } from '../src/index';
import { ProductModel } from '@sfx/product';

const sampleProducts: ProductModel[] = [
  {
    title: 'Best Shoe',
    price: 39.99,
    label: 'New Product',
    promo: '25% off',
    imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A spicy red shoe',
  },
  {
    title: 'Greatest Shoe',
    price: 49.99,
    label: 'Classic Product',
    promo: '25% off',
    imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A classic blue shoe',
  },
];

for (let i = 0; i < 10; i++) {
  sampleProducts.push(sampleProducts[i % 2]);
}

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    function sendSampleProducts() {
      const productsEvent = new CustomEvent(PRODUCTS_EVENT, {
        detail: {
          products: sampleProducts,
        },
      });
      window.dispatchEvent(productsEvent);
    }

    setTimeout(() => {
      sendSampleProducts();
    }, 1000);

    return `
      <style>
        * {
          box-sizing: border-box;
        }
        .product-tile-wrapper {
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
      <sfx-products></sfx-products>
    `}, {
    notes: {
      markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
    },
});
