import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index';

const items = [
      {
        label: 'Pen',
      }, 
      {
        label: 'Headphones',
      },
      {
        label: 'Duck',
      }, 
      {
        label: 'Chocolate',
      }
    ];

storiesOf('UI|List', module)
  .addDecorator(withKnobs)
    .add('Default', () => `
      <sfx-list items="${text('List Items', JSON.stringify(items))}"></sfx-list>
    `)
    .add('With Title', () => `
      <sfx-list title="${text('Title', "Items")}" items="${text('List Items', JSON.stringify(items))}"></sfx-list>
    `);
