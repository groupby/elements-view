import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

const tbd = {}

const results = [
  {
    title: 'Brands',
    items: [
      {
        label: 'New Balance',
        ...tbd
      }, {
        label: 'Bauer',
        ...tbd
      }
    ]
  }, {
    title: 'default',
    items: [
      {
        label: 'Golf Ball',
        ...tbd
      }, {
        label: 'Basketball',
        ...tbd
      }
    ]
  }
]

// <------ Set up for testing event listener ------>
const autocompleteDataReceivedEvent = new CustomEvent('autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"default","items":[{"label":"Cars"},{"label":"Bikes"}]}],
bubbles: true });

setTimeout(() => {
  window.dispatchEvent(autocompleteDataReceivedEvent)
}, 3000)
// <------ Set up completed for testing event listener ------>

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
  `)
