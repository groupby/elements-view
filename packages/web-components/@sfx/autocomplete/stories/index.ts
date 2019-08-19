import { storiesOf } from '@storybook/html';
import addons from '@storybook/addons';
import { getDisplayCode } from '../../../../../.storybook/common';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index';

const results = [
  {
    title: '',
    items: [
      {
        label: 'Golf Ball'
      },
      {
        label: 'Basketball'
      },
      {
        label: 'Baseball'
      },
    ]
  },
  {
    title: 'Brands',
    items: [
      {
        label: 'New Balance'
      },
      {
        label: 'Bauer'
      },
      {
        label: 'CCM'
      },
    ]
  },
  {
    title: 'Categories',
    items: [
      {
        label: 'Sport Equipment'
      },
      {
        label: 'Sport Apparel'
      },
    ]
  },
];

const autocompleteReceivedResultsEvent = [
  {
    name: 'sfx::autocomplete_received_results',
    payload: [
      {
        title: '',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      },
      {
        title: 'Brands',
        items: [{ label: 'Kashi' }, { label: 'Excel' }]
      },
      {
        title: 'Colors',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      }
    ]
  }
];

function getAutocomplete(title ='', results =[]): string {
  const optionalTitle = text('Optional Title', title);
  const autocompleteResults = text('Autocomplete Results', JSON.stringify(results));
  return (
    '<sfx-autocomplete\n'
    + ` caption="${optionalTitle}"\n`
    + ` results="${autocompleteResults}"\n`
    + '></sfx-autocomplete>'
  );
}

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const autocomplete = getAutocomplete('Autocomplete Results', results);
      console.log(autocomplete, 'autocomplete');
      return `
      ${autocomplete}
      ${getDisplayCode(autocomplete)}`;
    },
    {
      customEvents: autocompleteReceivedResultsEvent
    },
    {
      notes: {
        markdown: `
          # Autocomplete
          Hardcoded

          - Display hardcoded data with one titled autocomplete grouping, and one untitled autocomplete grouping.
          `
      }
    }
  )
  .add(
    'No initial data - emit event to populate with data',
    () => {
      const autocomplete = getAutocomplete();
      return `
      ${autocomplete}
      ${getDisplayCode(autocomplete)}`
    },
    {
      customEvents: autocompleteReceivedResultsEvent
    },
    {
      notes: {
        markdown: `
            #Autocomplete
            Demonstrating autocomplete populating with autocomplete data in response to the autocomplete received results event.

            * To emit the event, visit the Custom Events tab and view the 'sfx::autocomplete_received_results' event.
            * Clicking 'emit' will fire the event, which sfx-autocomplete listens on.
              * The payload of the event (event detail) should populate on the page.
            `
      }
    }
  );
