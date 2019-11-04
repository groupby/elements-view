import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import {
  SAYT_PRODUCTS_RESPONSE,
  SEARCH_RESPONSE,
  Product,
} from '@groupby/elements-events';
import {
  getDisplayCode,
  getProducts,
  generateSaytProductsResponseEvent,
  generateSearchResponseEvent,
  hidePrompt,
} from '../../../../../.storybook/common';
import '../src';

function getProductsComponent(productsArray: Product[] = [], componentSuffix: string): string {
  if (productsArray.length > 0) {
    const products = text('Products', JSON.stringify(productsArray));
    return `<gbe-products${componentSuffix} products="${products}"></gbe-products${componentSuffix}>`;
  }
  return `<gbe-products${componentSuffix}></gbe-products${componentSuffix}>`;
}

const productsNotesMarkdownIntro = ` # GroupBy Elements Products Component

[Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/products "GroupBy Elements Products README").

\`\`\`html
<gbe-products-base></gbe-products-base>
\`\`\`

## Demonstrated in this story`;

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const productsComponent = getProductsComponent(getProducts(10), '-base');
      return `
    ${productsComponent}
    `;
    },
    {
      notes: {
        markdown: `
        ${productsNotesMarkdownIntro}

          ### The GB Elements Products Base component populated with hardcoded products data.

          * The Products Base component renders a collection of products, with the data passed directly via the  \`products\` attribute.
          * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
          * To modify the data within the \`products\` attribute in this story:
            1. Visit the **Knobs** tab and update the data inside the "Products" field.
            2. Observe that the component is updated with new data.


          \`\`\`html
          <gbe-products-base
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
          ]"></gbe-products-base>
          \`\`\`
          `,
      },
    }
  ).add(
    'Products from Sayt events',
    () => {
      hidePrompt(SAYT_PRODUCTS_RESPONSE);
      const productsComponent = getProductsComponent([], '-sayt');
      return `
        ${productsComponent}
        <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
        ${getDisplayCode(productsComponent)}
      `;
    },
    {
      customEvents: [generateSaytProductsResponseEvent(3)],
      notes: {
        markdown: `
          # GroupBy Elements Products Sayt Component

          [Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/products "GroupBy Elements Products README").

          \`\`\`html
          <gbe-products-sayt></gbe-products-sayt>
          \`\`\`

          ## Demonstrated in this story

          ### The GB Elements Products Sayt component is used inside of a Sayt component. It renders a product grid in response to the \`${SAYT_PRODUCTS_RESPONSE}\` event.
            * The payload of the event contains an array of products.
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${SAYT_PRODUCTS_RESPONSE}\` event.
              2. Click "emit".
              3. See the component update with the product data contained in the array.

          ### If using the Products Sayt component outside of the GB Elements Sayt component, a \`group\` attribute can be used to distinguish what events it should listen to.
          * This is only needed if multiple Products Sayt components are on the same page and the desire is for them to listen to different events.
          * The Sayt component will take care of this.
          * Ex.

          \`\`\`html
          <gbe-products-sayt group="group1"></gbe-products-sayt>
          <gbe-products-sayt group="group2"></gbe-products-sayt>
          \`\`\`
        `,
      },
    }
  )
  .add(
    'Products from Search events',
    () => {
      hidePrompt(SEARCH_RESPONSE);
      const productsComponent = getProductsComponent([], '');
      return `
        ${productsComponent}
        <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
        ${getDisplayCode(productsComponent)}
      `;
    },
    {
      customEvents: [generateSearchResponseEvent(15)],
      notes: {
        markdown: `
          # GroupBy Elements Products Sayt Component

          [Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/products "GroupBy Elements Products README").

          \`\`\`html
          <gbe-products></gbe-products>
          \`\`\`

          ## Demonstrated in this story

          ### The GB Elements Products component can be used as a product listing grid. It renders a grid in response to the \`${SEARCH_RESPONSE}\` event.
            * The payload of the event contains an array of products.
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${SEARCH_RESPONSE}\` event.
              2. Click "emit".
              3. See the component update with the product data contained in the array.


          ### The Products component can take a \`group\` attribute to determine what group of events it will listen to.
            * Can be useful if mulitple product grids that render products from different collections or a specific subset of a collection are on the page.
              * Ex.

            \`\`\`html
            <gbe-products group="group1"></gbe-products>
            <gbe-products group="group2"></gbe-products>
            \`\`\`
        `,
      },
    }
  );
