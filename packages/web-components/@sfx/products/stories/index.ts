import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import { sampleProducts, productsEvent } from '../../../../../.storybook/common';
import { PRODUCTS_EVENT } from '../src/index';

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

        The Products component (\`sfx-product\`) is used for rendering
        a collection of products. It can be passed products directly
        via the \`products\` attribute on the DOM element, or by
        emitting an event which contains the products to be rendered.
      `
    },
  })
  .add('Default - event listening', () => {

    for (let i = 1; i < 6; i++) {
      setTimeout(() => {
        const products = getRandomProducts();
        sendSampleProducts(products);
      }, i * 2000);
    }

    return `
      ${getStyles()}
      <sfx-products></sfx-products>
    `;
  }, {
    notes: {
      markdown: `
        # Products - event listening

        This demonstrates the Products component listening to the
        products-received event.

        The event is fired once every two seconds, stopping after
        five total event emissions.
      `,
    }
  });
