import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { dispatchProvideProductsEvent } from '../../../../../.storybook/common';
import addons from '@storybook/addons';
import { ProductModel } from '@sfx/product'

function dispatchRandomProducts() {
  return dispatchProvideProductsEvent(Math.ceil(Math.random() * 6));
}

function getProductsComponent(productsArray) {
  const products = text('Products Array', JSON.stringify(productsArray));

  return 'sfx-products\n'
  + ` products="${products}"\n`
  + 'sfx-products>'
}

// <div class="sfx-product-tile-wrapper" role="listitem">
// <sfx-product .product="${product}"></sfx-product>
// </div>

const productsNotesMarkdownIntro =
` # SF-X Products Component

[SF-X Products README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/products "SF-X Products README").

## Demonstrated in this story:`;

const sampleProducts: ProductModel[] = [
  {
    title: 'Best Shoe',
    price: 39.99,
    label: 'New Product',
    promo: '25% off',
    imageSrc:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A spicy red shoe'
  },
  {
    title: 'Greatest Shoe',
    price: 49.99,
    label: 'Classic Product',
    promo: '25% off',
    imageSrc:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A classic blue shoe'
  }
];

const productsResultsEvent = [
  {
    name: 'sfx::provide_products',
    payload: {
      products: sampleProducts
  },
}
];

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const products = getProductsComponent(sampleProducts);
    console.log('products', products)
    // setTimeout(() => dispatchProvideProductsEvent(), 10);
    return `
      <sfx-products></sfx-products>
    `;
  },
  {
    customEvents: productsResultsEvent,
    notes: {
      markdown: `
      ${productsNotesMarkdownIntro}

        * Rendering a collection of products
          * Two methods exist to receive the product data:
            * It can be passed products directly via the \`products\` attribute on the DOM element.
              * To demonstrate this, navigate to the 'Knobs' tab
              * Populate the 'products' attribute with an array of product data that adheres to the product interfaces.
            * It can listen for the 'sfx::provide_products' event, that contains the products to be rendered as the payload.
              * To emit an event, navigate to the 'Custom Events' tab
              * To emit the provided event on the left, click the 'emit' button
              * To create another event, add an event name and event detail in the provided area on the right
      `
    }
  },
  {

  })
  .add('Default - event listening', () => {
    // for (let i = 1; i < 6; i++) {
    //   setTimeout(() => dispatchRandomProducts(), i * 2000);
    // }
      return `
      <sfx-products></sfx-products>
    `;
  },
  {
    customEvents: productsResultsEvent,
    notes: {
      markdown: `
        # Products - event listening

        This demonstrates the Products component listening to the
        products-received event.

        The event is fired once every two seconds, stopping after
        five total event emissions.
      `
    }
  }
  );
