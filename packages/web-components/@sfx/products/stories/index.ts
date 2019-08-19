import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import { dispatchProvideProductsEvent } from '../../../../../.storybook/common';
import addons from '@storybook/addons';
import { ProductModel } from '@sfx/product'

function dispatchRandomProducts() {
  return dispatchProvideProductsEvent(Math.ceil(Math.random() * 6));
}

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
    setTimeout(() => dispatchProvideProductsEvent(), 100);

    return `
      <sfx-products></sfx-products>
    `;
  },
  {
    customEvents: productsResultsEvent,
    notes: {
      markdown: `
        # Products

        The Products component (\`sfx-product\`) is used for rendering
        a collection of products. It can be passed products directly
        via the \`products\` attribute on the DOM element, or by
        emitting an event which contains the products to be rendered.
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
