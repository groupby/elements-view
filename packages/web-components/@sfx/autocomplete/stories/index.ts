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

storiesOf('Components|Autocomplete')
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-autocomplete results="${text('Autocomplete Results', JSON.stringify(results))}"></sfx-autocomplete>
  `)
