import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ProductModel } from '@sfx/product';
import { PRODUCTS_EVENT } from '@sfx/products';
import { getDisplayCode, getProducts, productsResultsEvent } from '../../../../../.storybook/common';

function getProductsComponent(productsArray: ProductModel[] = []) {
  if (productsArray.length > 0) {
    const products = text('Products', JSON.stringify(productsArray));
    return `<sfx-products products="${products}"></sfx-products>`
  } else {
    return '<sfx-products></sfx-products>';
  }
}

const productsNotesMarkdownIntro = ` # SF-X Products Component

[Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/products "SF-X Products README").

\`\`\`html
<sfx-products></sfx-products>
\`\`\`

## Demonstrated in this story`;

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const productsComponent = getProductsComponent(getProducts(10));
      return `
    ${productsComponent}
    `;
    },
    {
      customEvents: [productsResultsEvent],
      notes: {
        markdown: `
        ${productsNotesMarkdownIntro}

          ### The SF-X Products component populated with hardcoded products data.

          * The SF-X Products component renders a collection of products, with the data passed directly via the  \`products\` attribute.
          * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
          * To modify the data within the \`products\` attribute in this story:
            1. Visit the **Knobs** tab and update the data inside the "Products" field.
            2. Observe that the component is updated with new data.


          \`\`\`html
          <sfx-products
            products="[
              {
                title: 'Best Shoe',
                price: 39.99,
                label: 'New Product',
                promo: '25% off',
                imageSrc:
                  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&amp;auto=format&fit=crop&amp;h=350&amp;q=80',
                imageAlt: 'A spicy red shoe',
              },
              {
                title: 'Greatest Shoe',
                price: 49.99,
                label: 'Classic Product',
                promo: '25% off',
                imageSrc:
                  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&h=350&amp;q=80',
                imageAlt: 'A classic blue shoe',
              }
          ]"></sfx-products>
          \`\`\`
          `
      }
    }
  ).add(
    'Rendering with event payload',
    () => {
      window.addEventListener(PRODUCTS_EVENT, e => {
        let prompt: HTMLElement = document.querySelector('.prompt');
        prompt.style.display = 'none';
      })
      const productsComponent = getProductsComponent();
      return `
      ${productsComponent}
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      ${getDisplayCode(productsComponent)}
    `;
    },
    {
      customEvents: [productsResultsEvent],
      notes: {
        markdown: `
        ${productsNotesMarkdownIntro}

          ### The SF-X Products component renders a product grid in response to the \`${PRODUCTS_EVENT}\` event.
            * The payload of the event contains an array of products.
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${PRODUCTS_EVENT}\` event.
              2. Click "emit".
              3. See the component update with the product data contained in the array.
        `
      }
    }
  );
