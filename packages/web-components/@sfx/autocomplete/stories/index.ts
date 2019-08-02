import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index';

const tbd = {};

const results = [
  {
    title: '',
    items: [
      {
        ...tbd,
        label: 'Golf Ball'
      },
      {
        ...tbd,
        label: 'Basketball'
      },
      {
        ...tbd,
        label: 'Baseball'
      },
    ]
  },
  {
    title: 'Brands',
    items: [
      {
        ...tbd,
        label: 'New Balance'
      },
      {
        ...tbd,
        label: 'Bauer'
      },
      {
        ...tbd,
        label: 'CCM'
      },
    ]
  },
  {
    title: 'Categories',
    items: [
      {
        ...tbd,
        label: 'Sport Equipment'
      },
      {
        ...tbd,
        label: 'Sport Apparel'
      },
    ]
  },
];

const optionalTitle = 'Autocomplete Results';

/*
 * --- Slots Testing ---
 * The final story demonstrates that content slotted in (in this case,
 * the <div> contained within the autocomplete custom element)
 * appears within the light-dom as desired.
 *
 */

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => `
      <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
      <button @click=${this.dispatchAutocompleteResults}>
        Click to dispatch event
      </button>
    `
  )
  .add(
    'No Data - populate with data received',
    () => `
      <sfx-autocomplete>
      </sfx-autocomplete>
      <button @click=${this.dispatchAutocompleteResults}>
        Click to dispatch event
      </button>
    `
  )
  .add(
    'With Slots',
    () => `
      <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}">
        <div>Content appears after main content</div>
      </sfx-autocomplete>
      <button @click=${this.dispatchAutocompleteResults}>
        Click to dispatch event
      </button>
    `
  )
  .add(
    'With title customization',
    () => `
      <sfx-autocomplete
        caption="${text('Optional Title', optionalTitle)}"
        results="${text('Autocomplete', JSON.stringify(results))}">
      </sfx-autocomplete>
      <button @click=${this.dispatchAutocompleteResults}>
        Click to dispatch event
      </button>
    `
  );
