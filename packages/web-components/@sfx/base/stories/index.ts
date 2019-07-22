import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|Base', module)
  .addDecorator(withKnobs)
  .add(
    'With inserted element',
    () => `
      <sfx-base>
        <p>Hello</p>
      </sfx-base>
    `
  );
