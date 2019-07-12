import { storiesOf } from '@storybook/html';

import addons from '@storybook/addons';
import { withKnobs, text } from '@storybook/addon-knobs';

import '../src/index.ts';

const results = [
  {
    title: 'default',
    items: [
      { label: 'Golf Ball' }, 
      { label: 'Basketball' }
    ]
  }, {
    title: 'Brands',
    items: [
      { label: 'New Balance' }, 
      { label: 'Bauer' }
    ]
  }
]

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
  `, {
    customEvents: [
      {
        name: 'autocomplete_received_results',
        payload: [
          {
            title: "default",
            items: [
              { label: "Teal" },
              { label: "Orange" },
              { label: "Fuschia" }
            ]
          }, {
            title: "Brands",
            items: [
              { label: "Kashi" },
              { label: "Excel" }
            ]
          }, {
            title: "Colors",
            items: [
              { label: "Teal" },
              { label: "Orange" },
              { label: "Fuschia" }
            ]
          }
        ],
      }
    ]
  })
