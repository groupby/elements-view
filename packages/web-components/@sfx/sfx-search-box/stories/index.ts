import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

// start of event dispatch testing
window.addEventListener('search_request', (e) => {
  console.log('search request received')
  console.log('event', e)
});

window.addEventListener('autocomplete_request', (e) => {
  console.log('autocomplete request received')
  console.log('event', e)
});
// end of event dispatch testing

storiesOf('Components|Searchbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
  <sfx-search-box></sfx-search-box>
`)



