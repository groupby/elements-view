import { storiesOf } from '@storybook/html';
import { withKnobs, number } from '@storybook/addon-knobs';
import '../src/index.ts';

const sampleProducts = [];
  for (let i = 0; i < 15; i++) {
    sampleProducts.push({
      name: `Product ${i + 1}`,
      price: Math.ceil(Math.random() * 10),
      imageSource: 'https://via.placeholder.com/150',
      description: 'This product is...',
    });
  }

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    function sendSampleProducts() {
      const productsEvent = new CustomEvent('sfx:provide-products', {
        detail: {
          products: sampleProducts,
        }
      });
      window.dispatchEvent(productsEvent);
    }
    // @TODO Find other way of setting default products. Hacky.
    window.setTimeout(sendSampleProducts, 300);

    return `
      <sfx-products
        maxItems="${number('Max items', 12)}"
      ></sfx-products>
    `}, {
    notes: {
      markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
    },
});
