import { storiesOf } from '@storybook/html';
import { withKnobs, number } from '@storybook/addon-knobs';
import { sampleProducts, productsEvent } from '../../../../../.storybook/common';

import '../src/index.ts';

for (let i = 0; i < 12; i++) {
  sampleProducts.push(sampleProducts[i % 2]);
}

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      function sendSampleProducts() {
        window.dispatchEvent(productsEvent);
      }

      window.customElements.whenDefined('sfx-products').then(() => {
        sendSampleProducts();
      });

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
    `;
    },
    {
      notes: {
        markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
      }
    }
  );
