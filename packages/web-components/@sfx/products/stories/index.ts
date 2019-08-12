import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import { dispatchProvideProductsEvent } from '../../../../../.storybook/common';

function dispatchRandomProducts() {
  return dispatchProvideProductsEvent(Math.ceil(Math.random() * 6));
}

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    setTimeout(() => dispatchProvideProductsEvent(), 100);

    return `
      <sfx-products></sfx-products>
    `;
  },
  {
    notes: {
      markdown: `
        # Products

        The Products component (\`sfx-product\`) is used for rendering
        a collection of products. It can be passed products directly
        via the \`products\` attribute on the DOM element, or by
        emitting an event which contains the products to be rendered.
      `
    }
  })
  .add('Default - event listening', () => {
    for (let i = 1; i < 6; i++) {
      setTimeout(() => dispatchRandomProducts(), i * 2000);
    }

    return `
      <sfx-products></sfx-products>
    `;
  },
  {
    notes: {
      markdown: `
        # Products - event listening

        This demonstrates the Products component listening to the
        products-received event.

        The event is fired once every two seconds, stopping after
        five total event emissions.
      `
    }
  });
