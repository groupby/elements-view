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

// const autocompleteReceivedResultsEvent = {
//   customEvents: [
//     {
//       name: 'sfx::autocomplete_received_results',
//       payload: [
//         {
//           title: '',
//           items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
//         },
//         {
//           title: 'Brands',
//           items: [{ label: 'Kashi' }, { label: 'Excel' }]
//         },
//         {
//           title: 'Colors',
//           items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
//         }
//       ]
//     }
//   ]
// };

// function getAutocomplete(): string {
//   const optionalTitle = text('Optional Title', 'Autocomplete Results');
//   // const autocompleteResults = text('Autocomplete Results', JSON.stringify(results));
//   return '<sfx-autocomplete\n'
//     + ` caption="${optionalTitle}"\n`
//     // + ` results="${autocompleteResults}"`
//     + '></sfx-autocomplete>';
// }

function getAutocomplete(): string {
  const optionalTitle = text('Optional Title', 'Autocomplete Results');
  return '<sfx-autocomplete\n'
    + ` caption="${optionalTitle}"\n`
    + '></sfx-autocomplete>';
}

const optionalTitle = 'Autocomplete Results';

/*
 * --- Slots Testing ---
 * The final story demonstrates that content slotted in (in this case,
 * the <div> contained within the autocomplete custom element)
 * appears within the light-dom as desired.
 *
 */

// storiesOf('Components|Autocomplete', module)
//   .addDecorator(withKnobs)
//   .add('Default', () => {
//       const autocomplete = getAutocomplete();
//       console.log(autocomplete, 'autocomplete')
//       return `
//       ${autocomplete}
//       ${ getDisplayCode(autocomplete) }`;
//     }
// storiesOf('Components|Autocomplete', module)
//   .addDecorator(withKnobs)
//   .add('Default', () => {
//       const autocomplete = getAutocomplete();
//       console.log(autocomplete, 'autocomplete')
//       return `${autocomplete}`;
//     }
// // storiesOf('Components|Autocomplete', module)
// //   .addDecorator(withKnobs)
// //   .add('Default', () => {
// //       const autocomplete = getAutocomplete();
// //       console.log(autocomplete, 'autocomplete')
// //       return `
// //       ${autocomplete}
// //       ${ getDisplayCode(autocomplete) }`;
// //     },
//     // {
//     //   customEvents: autocompleteReceivedResultsEvent
//     // },
//     // {
//     //   notes: {
//     //     markdown: `
//     //       # Autocomplete
//     //       Hardcoded

//     //       - Display hardcoded data with one titled autocomplete grouping, and one untitled autocomplete grouping.
//     //       `
//     //   }
//     // }
//     // autocompleteReceivedResultsEvent
//   )
  storiesOf('Components|Autocomplete', module)
    .addDecorator(withKnobs)
    .add(
      'Default',
      () => `
        <sfx-autocomplete caption="${text('Optional Title', optionalTitle)}" results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
      `,
      {
        customEvents: autocompleteReceivedResultsEvent
      },
      {
        notes: {
          markdown: `
            # Autocomplete
            Hardcoded

            - Display hardcoded data with one titled autocomplete grouping, one untitled autocomplete grouping and optional title.
              - Use Knobs (contained within the first tab) to change or remove the Optional Title or Autocomplete Data.
            `
        }
      },
    )
  .add(
    'No initial data - emit event to populate with data',
    () => `
      <sfx-autocomplete>
      </sfx-autocomplete>
    `,
    {
      customEvents: autocompleteReceivedResultsEvent
    },
    {
      notes: {
        markdown:`
          #Autocomplete
          Demonstrating autocomplete populating with autocomplete data in response to the autocomplete received results event.

          * To emit the event, visit the Custom Events tab and view the 'sfx::autocomplete_received_results' event.
          * Clicking 'emit' will fire the event, which sfx-autocomplete listens on.
            * The payload of the event (event detail) should populate on the page.
          `,
      }
    },
  );
