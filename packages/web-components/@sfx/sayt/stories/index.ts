import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { getDisplayCode } from '../test/utils';
import { AUTOCOMPLETE_RESPONSE, SAYT_HIDE, SAYT_SHOW } from '@sfx/events';
import '../src/index';

// @TODO allow for sending event with searchbox ID. This should allow for one
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent(AUTOCOMPLETE_RESPONSE,
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
  const hideAutocomplete = boolean('Hide Autocomplete', false) ? 'hideAutocomplete' : '';
  const hideProducts = boolean('Hide Products', false) ? 'hideProducts' : '';
  const minSearchLength = number('Min search length', 5);

  return (
    '<sfx-sayt\n' +
    (searchbox ? `  searchbox="${searchbox}"\n` : '') +
    `  closetext="${closeText}"\n` +
    (showCloseButton ? `  ${showCloseButton}\n` : '') +
    (hideAutocomplete ? `  ${hideAutocomplete}\n` : '') +
    (hideProducts ? `  ${hideProducts}\n` : '') +
    `  minsearchlength="${minSearchLength}"\n` +
    '></sfx-sayt>'
  );
}

const saytHide = {
  name: SAYT_EVENT.SAYT_HIDE,
  payload: ''
};

const saytShow = {
  name: SAYT_EVENT.SAYT_SHOW,
  payload: ''
};

const autocompleteDataReceivedEvent = new CustomEvent(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, {
  detail: {
    results: autocompleteResults,
  },
  bubbles: true,
});

function generateBaseData() {
  setTimeout(() => {
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }, 0)
  setTimeout(() => {
    window.dispatchEvent(getProductsReceivedEvent());
  }, 0)
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    generateBaseData();
    const sayt = getSayt();
    return `
    <style>
      .display-code {
        position: absolute;
        top: 800px;
        z-index: -1;
      }
    </style>

    ${sayt}
    <div class="display-code">
    ${getDisplayCode(sayt)}
    </div>`;
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
    emitEventInFuture(new Event(SAYT_HIDE), 2000);
    emitEventInFuture(new Event(SAYT_SHOW), 4000);

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
    }
  )
  .add(
    'SAYT with simple search input',
    () => {
      hidePrompt(SAYT_EVENT.SAYT_HIDE);
      const input = `<input type="text" id="search-box" placeholder="Search here" />`;
      const sayt = getSayt('search-box');

    const input = `<input type="text" id="search-box" placeholder="Search here" />`;
    const sayt = getSayt('search-box');
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
        rather than our Search component.
      `
      }
    }
  )
  .add(
    'SAYT with multiple search inputs',
    () => {
      hidePrompt(SAYT_EVENT.SAYT_HIDE);
      const input1 = `<input type="text" id="search-box1" placeholder="Search here" />`;
      const input2 = `<input type="text" id="search-box2" placeholder="Or search here" />`;
      const sayt1 = getSayt('search-box1');
      const sayt2 = getSayt('search-box2');

      return `
      <style>
        .search-container {
          float: left;
          position: relative;
          width: 50%;
        }
        #search-box1, #search-box2 {
          width: 100%;
        }
        .display-code {
          position: absolute;
          top: 800px;
          z-index: -1;
        }
        sfx-sayt {
          background-color: white;
        }
      </style>

      <div class="sayt-container">
        <div class="search-container">
          ${input1}
          ${sayt1}
        </div>
        <div class="search-container">
          ${input2}
          ${sayt2}
        </div>
        <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      </div>
      <div class="display-code">
      ${getDisplayCode(`${input1}${sayt1}${input2}${sayt2}`)}
      </div>`;

    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
          ${saytNotesMarkdownIntro}

            ### Two SF-X SAYT components act independently when mulitple SAYT components are included on a page, if the \`searchbox\` attribute is set.
              * A click on one SAYT component will result in the other SAYT closing.
              * To demonstrate in this story:
                1. Open both SAYTs.
                2. Click anywhere within one SAYT component.
                3. Observe that the other SAYT component is closed.

              * A click on the close button on a given SAYT will close both SAYTs because:
                * You have closed the SAYT for which you have clicked close.
                * The other SAYT has closed due to lost focus.
                * To demonstrate in this story:
                  1. Open both SAYTs.
                  2. Click on one of the close buttons.
                  3. Observe that both SAYT components are closed.

      ### Example of the multple SAYT components

      \`\`\`html
      <input type="text" id="search-box1" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box1"
        closetext="×"
        showclosebutton
        visible
      ></sfx-sayt>
      <input type="text" id="search-box2" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box2"
        closetext="×"
        showclosebutton
        visible
      ></sfx-sayt>
      \`\`\`
        `
      }
    }
  );
