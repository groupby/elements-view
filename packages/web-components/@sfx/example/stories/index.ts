import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|Best Box')
  .addDecorator(withKnobs)
  .add('Basic Box', () => `
    <example-best-box items="${text('Item List', '[{"name":"Cake", "price":100, "rating": 10, "dimensions": {}}]')}"></example-best-box>
  `)
