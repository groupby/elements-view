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

  /**
   * --- setup for testing event listeners ---
   * Because Storybook is contained in an iFrame, for testing purposes, we are unable to dispatch events 
   * we are unable to dispatch events directly from the console.
   * 
   * As an alternative, we use a timeout to dispatch the event below.
   */
const autocompleteDataReceivedEvent = new CustomEvent('autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"default","items":[{"label":"Cars"},{"label":"Bikes"}]}],
bubbles: true });

setTimeout(() => {
  window.dispatchEvent(autocompleteDataReceivedEvent)
}, 3000)
  /**
  * --- end of setup for testing event listeners ---
  */

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
  `)
  .add('No Data - populate with data received', () => `
    <sfx-autocomplete>
    </sfx-autocomplete>
  `) 
  .add('With Slots', () => `
    <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}">
      <div>test</div>
      <div slot="before">hello</div>
      <div slot="after">bye</div>
    </sfx-autocomplete>
  `)
