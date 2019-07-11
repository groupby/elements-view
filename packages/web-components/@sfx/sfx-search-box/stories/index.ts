import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|Searchbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
  <sfx-search-box></sfx-search-box>
`)



