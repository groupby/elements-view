import { storiesOf } from '@storybook/html';
import { getDisplayCode } from '../../../../../.storybook/common';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index';


const autocompleteNotesMarkdownIntro =
` # SF-X Autocomplete Component

[SF-X Autocomplete README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/autocomplete "SF-X Autocomplete README").

## Demonstrated in this story:`;

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

function getAutocomplete(title ='', results =[], display = false): string {
  const optionalTitle = text('Optional Caption', title);
  const autocompleteResults = text('Results', JSON.stringify(results));

  return display === false ? (
    '<sfx-autocomplete\n'
    + ` caption="${optionalTitle}"\n`
    + ` results="${autocompleteResults}"\n`
    + '></sfx-autocomplete>'
  ) : (
  '<sfx-autocomplete\n'
  + ` caption="${optionalTitle}"\n`
  + '></sfx-autocomplete>'
);
}

// function getAutocompleteDisplay(title =''): string {
//   const optionalTitle = text('Optional Caption', title);

//   return (
//     '<sfx-autocomplete\n'
//     + ` caption="${optionalTitle}"\n`
//     + '></sfx-autocomplete>'
//   );
// }

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const autocomplete = getAutocomplete('Autocomplete Results', results);
      const autocompleteDisplay = getAutocomplete('Autocomplete Results', [], true)
      return `
      ${autocomplete}
      ${getDisplayCode(autocompleteDisplay)}`;
    },
    {
      customEvents: autocompleteReceivedResultsEvent,
      notes: {
        markdown: `
        ${autocompleteNotesMarkdownIntro}

          * Rendering of hardcoded autocomplete data
            * Hardcoding includes the optional title (contained in the caption attribute)

          \`\`\`html
          <sfx-autocomplete
          caption="Autocomplete Results"
          results="[
            {
              title: 'Brands',
              items: [
                {
                  label: 'New Balance'
                },
                {
                  label: 'Bauer'
                }
              ]
            },
            {
              title: '',
              items: [
                {
                  label: 'Golf Ball'
                },
                {
                  label: 'Basketball'
                }
              ]
            }
          ]"></sfx-autocomplete>
          \`\`\`
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
      ${getDisplayCode(getAutocomplete(null, null,true))}`
    },
    {
      customEvents: autocompleteReceivedResultsEvent,
      notes: {
        markdown: `
          ${autocompleteNotesMarkdownIntro}

            \`\`\`html
            <sfx-autocomplete></sfx-autocomplete>
            \`\`\`

            ## Demonstrated in this story:

            Demonstrating autocomplete populating with autocomplete data in response to the autocomplete received results event.

            * To emit the event, visit the Custom Events tab and view the sfx::autocomplete\_received\_results event.
            * Clicking 'emit' will fire the event, which sfx-autocomplete listens on.
              * The payload of the event (event detail) should populate on the page.
            `
      }
    }
  );
