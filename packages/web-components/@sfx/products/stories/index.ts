import { storiesOf } from '@storybook/html';
import { withKnobs, number } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|Products', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-products
      maxItems="${number('Max items', 12)}"
    ></sfx-products>
  `, {
    notes: {
      markdown: `
        # Products
        Hardcoded

        Here is the documentation for the Products component.
      `
    },
});
