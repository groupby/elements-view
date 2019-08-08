import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { getDisplayCode } from '../test/utils';
import '../src/index';

// @TODO allow for sending event with searchbox ID. This should allow for one
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results',
  { detail: [
      { "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] },
      { "title": "", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }
    ],
    bubbles: true }
);

function getSayt(searchbox = '', showSayt = true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', 'Close');
  const showCloseButton = boolean('Show Close button', true) ? 'showclosebutton' : '';

  return '<sfx-sayt\n'
    + (searchbox ? `  searchbox="${searchbox}"\n` : '')
    + `  closetext="${closeText}"\n`
    + (showCloseButton ? `  ${showCloseButton}\n` : '')
    + (showAttribute ? `  ${showAttribute}\n` : '')
    + '></sfx-sayt>';
}

function emitEventInFuture(event, timeout = 100) {
  setTimeout(() => {
    window.dispatchEvent(event);
  }, timeout);
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);

    const sayt = getSayt();
    return `
      ${ sayt }

      ${ getDisplayCode(sayt) }
    `;
  }, {
    notes: {
      markdown: `
        # Search As You Type (SAYT)
        Hardcoded
        
        Here is the documentation for the SAYT component.
      `
    } 
  })
  // @TODO Remove these setTimeouts when opening a new story
  .add('Responding to Events - sayt_hide & sayt_show ', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);
    emitEventInFuture(new Event('sfx::sayt_hide'), 2000);
    emitEventInFuture(new Event('sfx::sayt_show'), 4000);

    const sayt = getSayt('', false);
    return `
      ${ sayt }
      ${ getDisplayCode(sayt) }
    `;
  }, {
    notes: {
      markdown:`
        # Search As You Type (SAYT)
        - Show automatically once sub-component Autocomplete receives results.
        - Receiving sayt_hide event after 2 seconds.
        - Receiving sayt_show event after 4 seconds.
      `
    }
  })
  .add('SAYT with simple search input', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);

    const input = `<input type="text" id="search-box" placeholder="Search here" />`;
    const sayt = getSayt();
    return `
      ${ input }
      <br />
      ${ sayt }
      ${ getDisplayCode(`${ input }\n${ sayt }`) }
    `
  }, {
    notes: {
      markdown:`
        #Search As You Type (SAYT)
        Demonstrating SAYT working with a standard input element,
        rather than our Seach component.
      `
    }
  })
  .add('SAYT with multiple search inputs', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);

    const input1 = `<input type="text" id="search-box1" placeholder="Search here" />`;
    const input2 = `<input type="text" id="search-box2" placeholder="Or search here" />`;
    const sayt1 = getSayt('search-box1');
    const sayt2 = getSayt('search-box2');

    return `${ input1 }<br />
${ sayt1 }
<hr />
${ input2 }<br />
${ sayt2 }

${ getDisplayCode(`${ input1 }
${ sayt1 }

${ input2 }
${ sayt2 }`) }
    `;
  }, {
    notes: {
      markdown:`
        #Search As You Type (SAYT)
        Demonstrating multiple SAYT components.This proves that eachSearch/SAYT
        pair acts independently.

        Note that it is virtually impossible to open two SAYT windows simultaneously.
        Nevertheless, this proves two open SAYT components are acting independently.

        * Clicking anywhere but either of the SAYT components should result in both
        being closed due to lost focus.
        * Clicking on a given SAYT component should leave that component
        open, and any other SAYT component would be closed.
        * Clicking \`Close\` on a given SAYT will close both SAYTs because:

          * You have closed the SAYT for which you have clicked Close.
          * The other SAYT has closed due to lost focus.
      `,
    },
  });
