import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode, getProducts, productsResultsEvent } from '../../../../../.storybook/common';

function getProductsComponent(productsArray = []) {
  if (productsArray.length > 0) {
    const products = text('Products', JSON.stringify(productsArray));
    return '<sfx-products\n' + ` products="${products}"\n` + '></sfx-products>';
  } else {
    return '<sfx-products>\n' + '</sfx-products>';
  }
}

const productsNotesMarkdownIntro = ` # SF-X Products Component

[SF-X Products README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/products "SF-X Products README").

\`\`\`html
<sfx-products></sfx-products>
\`\`\`

## Demonstrated in this story:`;

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add(
    'Default - Rendering event payload',
    () => {
      const productsComponent = getProductsComponent();
      return `
      ${productsComponent}
      ${getDisplayCode(getProductsComponent())}
    `;
    },
    {
      customEvents: [productsResultsEvent],
      notes: {
        markdown: `
      ${productsNotesMarkdownIntro}

        * The SF-X Products component rendering a product grid in response to the \`sfx::provide_products\` event.
          * To emit the event:
            1. Visit the **Custom Events** tab and locate the \`sfx::provide_products\` event.
            2. Click 'emit'.
              * The payload of the event contains an array of products.
              * View the product grid populate with the product data contained in the array.
      `
      }
    }
  )
  .add(
    'Products data populated via products attribute',
    () => {
      const productsComponent = getProductsComponent(getProducts(10));
      return `
      <h1>Note: Not recommended method</h1>
      <h2>See notes for further details</h2>
    ${productsComponent}
    `;
    },
    {
      customEvents: [productsResultsEvent],
      notes: {
        markdown: `
      ${productsNotesMarkdownIntro}

        * The SF-X Products component rendering a collection of products with the data passed directly via the  \`products\` attribute.
          * Disclaimer - although possible, it is not recommended to pass large arrrays of data via an attribute.
            * The products attribute is populated with hardcoded data initially.
              * To modify the data within the 'products' attribute:
                1. Visit the **Knobs** tab and update the data contained within the 'Products' field.
                  * View the DOM and component update with the updated data.

        ### Example of the SF-X Products component's \`products\` attribute populated with a small array of product data:

        \`\`\`html
        <sfx-products
        products=[
          {
            title: 'Best Shoe',
            price: 39.99,
            label: 'New Product',
            promo: '25% off',
            imageSrc:
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
            imageAlt: 'A spicy red shoe',
          },
          {
            title: 'Greatest Shoe',
            price: 49.99,
            label: 'Classic Product',
            promo: '25% off',
            imageSrc:
              'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
            imageAlt: 'A classic blue shoe',
          }
        ]></sfx-products>
        \`\`\`
        `
      }
    }
  );
