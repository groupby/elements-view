import {
  storiesOf,
  html
} from '@open-wc/demoing-storybook';
import './src/index.ts';

storiesOf('SAYT', module)
  .add('Default', () => html`<sfx-sayt></sfx-sayt>`);
