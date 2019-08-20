import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode, getProducts } from '../../../../../.storybook/common';

function getProductsComponent(productsArray=[]) {
  const products = text('Products', JSON.stringify(productsArray));

  return '<sfx-products\n'
  + ` products="${products}"\n`
  + '></sfx-products>'
}

const productsNotesMarkdownIntro =
` # SF-X Products Component

[SF-X Products README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/products "SF-X Products README").

## Demonstrated in this story:`;

const productsResultsEvent = [
  {
    name: 'sfx::provide_products',
    payload: {
      products: getProducts(5),
  },
}
];

// removed display code for now since it's massive
storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const products = getProducts(10);
    const productsComponent = getProductsComponent(products);
    return `
    ${productsComponent}
    `;
  },
  {
    customEvents: productsResultsEvent,
    notes: {
      markdown: `
      ${productsNotesMarkdownIntro}

        * Rendering a collection of products with data passed directly via the  \`products\` attribute on the DOM element.
            * In this story, the products attribute is populated with hardcoded data initially
              * To modify the hardcoded data, navigate to the 'Knobs' tab
                * Either change some of the existing data contained in the products knob or populate with an array of product data that adheres to the product interfaces.

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
  },
  {

  })
  .add('Rendering event payload', () => {
    const productsComponent = getProductsComponent();
      return `
      ${productsComponent}
      ${getDisplayCode(productsComponent)}
    `;
  },
  {
    customEvents: productsResultsEvent,
    notes: {
      markdown: `
      ${productsNotesMarkdownIntro}

        * Rendering the payload of the 'sfx::provide_products' event
          * To emit an event, navigate to the 'Custom Events' tab
          * To emit the provided event on the left, click the 'emit' button
          * To create another event, add an event name and event detail in the provided area on the right

          \`\`\`html
          <sfx-products></sfx-products>
          \`\`\`
      `
    }
  }
  );
