import {
  storiesOf,
  withKnobs,
//   html,
//   object,
//   text
} from '@storybook/html';
import '../src/index.ts';

const search = {
  query: '',
  autocomplete: []
};

storiesOf('SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => `<sfx-sayt search="${search}" placeholder="${'Search'}"></sfx-sayt>`, { notes: { markdown: `# OPPA GAng \n ## HOW ABOUT` } });

// import { storiesOf } from '@storybook/html';

// storiesOf('Button', module)
//   .add('with text', () => '<button class="btn">Hello World</button>')
//   .add('with emoji', () => {
//     const button = document.createElement('button');
//     button.innerText = '😀 😎 👍 💯';
//     return button;
//   });
  