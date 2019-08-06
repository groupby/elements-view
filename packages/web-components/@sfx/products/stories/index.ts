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

function getProducts(quantity) {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const randomIndex = Math.floor(Math.random() * sampleProducts.length);
    products.push(sampleProducts[randomIndex]);
  }
  return products;
}

function getRandomProducts() {
  return getProducts(Math.ceil(Math.random() * 6));
}

function getProductsReceivedEvent(products) {
  return new CustomEvent(PRODUCTS_EVENT, {
    detail: {
      products,
    },
    bubbles: true,
  });
}

function sendSampleProducts(products) {
  const productsEvent = getProductsReceivedEvent(products);
  window.dispatchEvent(productsEvent);
}

function getStyles() {
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
  `;
}

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {

    setTimeout(() => {
      const products = getProducts(10);
      sendSampleProducts(products);
    }, 100);

    return `
      ${getStyles()}
      <sfx-products></sfx-products>
    `}, {
    notes: {
      markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
    },
  })
  .add('Default - event listening', () => {
    const products = getRandomProducts();

    setTimeout(() => {
      const products = getRandomProducts();
      sendSampleProducts(products);
    }, 2000);

    setTimeout(() => {
      const products = getRandomProducts();
      sendSampleProducts(products);
    }, 4000);

    setTimeout(() => {
      const products = getRandomProducts();
      sendSampleProducts(products);
    }, 6000);

    setTimeout(() => {
      const products = getRandomProducts();
      sendSampleProducts(products);
    }, 8000);

    return `
      ${getStyles()}
      <sfx-products></sfx-products>
    `;
  }, {
    notes: {
      markdown: `
        # Products - event listening

        This demonstrates the Products component listening to the
        products-received event a number of times.
      `,
    }
  });
