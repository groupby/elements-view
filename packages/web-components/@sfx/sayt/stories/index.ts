import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { XmlEntities } from 'html-entities';

import '../src/index.ts';

const entities = new XmlEntities();

// @TODO allow for sending event with searchbar ID. This should allow for one 
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results',
  { detail: [
      { "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] },
      { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }
    ],
    bubbles: true }
);

function getSayt(searchbar='', showSayt=true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', 'Close');
  const showCloseButton = boolean('Show Close button', true) ? 'showclosebutton' : '';

  return `<sfx-sayt${searchbar ? ` searchbar="${searchbar}"` : ''}
  closetext="${closeText}"${showCloseButton ? `
  ${ showCloseButton }` : ''}${showAttribute ? `
  ${ showAttribute }` : ''}
></sfx-sayt>`;
}

// @TODO Move this CSS elsewhere. Should be loaded globally.
function getDisplayCode(code: string): string {
  return `
    <style>
      pre.code-output {
        padding: 15px;
        background-color: #EEEEEE;
      }
    </style>
    <h3>The code</h3>
    <pre class="code-output"><code>${entities.encode(code)}</code></pre>
  `
}

function emitEventInFuture(event, timeout=100) {
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
      ${sayt}

      ${getDisplayCode(sayt)}
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
      ${sayt}
      ${getDisplayCode(sayt)}
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

    const input = `<input type="text" id="search-bar" placeholder="Search here" />`;
    const sayt = getSayt();
    return `
      ${input}
      <br />
      ${sayt}
      ${getDisplayCode(`${input}
${sayt}`)}
    `
  }, {
    notes: {
      markdown:`
        #Search As You Type (SAYT)
        Demonstrating initially visible SAYT for showing/hiding.
      `
    }
  })
  .add('SAYT with multiple search inputs', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);

    const input1 = `<input type="text" id="search-bar1" placeholder="Search here" />`;
    const input2 = `<input type="text" id="search-bar2" placeholder="Or search here" />`;
    const sayt1 = getSayt('search-bar1');
    const sayt2 = getSayt('search-bar2');

    return `${input1}<br />
${sayt1}
<hr />
${input2}<br />
${sayt2}

${getDisplayCode(`${input1}
${sayt1}

${input2}
${sayt2}`)}
    `
  }, {
    notes: {
      markdown:`
        #Search As You Type (SAYT)
        Demonstrating multiple SAYT components. This proves that each Search/SAYT pair acts independently.
      `
    }
  });
