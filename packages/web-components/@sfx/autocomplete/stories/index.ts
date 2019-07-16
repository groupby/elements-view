import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

const tbd = {};

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
    title: '',
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
];

const optionalTitle = 'Autocomplete Results';

  /*
   * --- setup for testing event listeners ---
   * Because Storybook is contained in an iframe, for testing purposes, 
   * we are unable to dispatch events directly from the console.
   * 
   * As an alternative, we use a timeout to dispatch the event below.
   * 
   * After the timeout, we should see the original data being replaced by the data contained in the custom event below.
   */
const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"","items":[{"label":"Cars"},{"label":"Bikes"}]}],
bubbles: true });

// window.customElements.whenDefined('sfx-autocomplete').then(() => {
//   console.log('autocomplete defined')
//   console.log('autocompleteDataReceivedEvent', autocompleteDataReceivedEvent)
//   window.dispatchEvent(autocompleteDataReceivedEvent)
// });
setTimeout(() => {
  window.dispatchEvent(autocompleteDataReceivedEvent)
}, 3000);
 /*
  * --- end of setup for testing event listeners ---
  */

  /**
   * --- Slots Testing ---
   * The final story demonstrates that content slotted in (in this case, the <div> contained within the autocomplete custom element)
   * appears within the light-dom as desired. 
   * 
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
        <div>Content appears after main content</div>
      </sfx-autocomplete>
    `)
    .add('With title customization', () => `
      <sfx-autocomplete optionaltitle="${text('Optional Title', optionalTitle)}" results="${text('Autocomplete', JSON.stringify(results))}">
      </sfx-autocomplete>
    `);
