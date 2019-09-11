import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { PRODUCTS_RESPONSE_EVENT, PRODUCTS_REQUEST_EVENT } from '@sfx/products';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, AUTOCOMPLETE_REQUEST_RESULTS } from '@sfx/autocomplete';
import { SAYT_EVENT } from '../src/events';
import '../src';
import {
  getDisplayCode,
  productsResultsEvent,
  autocompleteReceivedResultsEvent,
  autocompleteResults,
  getProductsReceivedEvent,
  hidePrompt,
} from '../../../../../.storybook/common';

const saytNotesMarkdownIntro = ` # SF-X SAYT Component

[Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/sayt "SF-X SAYT README").

\`\`\`html
<sfx-sayt
  closetext="×"
  showclosebutton
  visible
></sfx-sayt>
\`\`\`

## Demonstrated in this story`;

function getSayt(searchbox: string = ''): string {
  const closeText = text('Close link text', '×');
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
        ${saytNotesMarkdownIntro}

          ### The SF-X SAYT component populated with autocomplete and products data.
          * The SF-X SAYT component is designed to render different data in response to events, however, this story generates the data on page load. This is done in order to see the visual component immediately.
          * For stories that demonstrate the component's functionality, visit three stories listed below this one, under "SAYT".
      `
      }
    })
  .add(
    'Rendering based on events and attributes',
    () => {
      hidePrompt(SAYT_EVENT.SAYT_HIDE);
      const sayt = getSayt();
      return `
      <style>
        .display-code {
          position: absolute;
          top: 800px;
          z-index: -1;
        }
        sfx-sayt {
          background-color: white;
        }
      </style>

      ${sayt}
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      <div class="display-code">
      ${getDisplayCode(sayt)}
      </div>`
        ;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          ### The SF-X SAYT component will render the SF-X Autocomplete component with the payload of the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\`, in response to the event.

            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.
              2. Click "emit".
              3. See the SF-X SAYT component update with the autocomplete data.


          ### The component will render the SF-X Products component with the payload of the \`${PRODUCTS_RESPONSE_EVENT}\`, in response to the event.
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${PRODUCTS_RESPONSE_EVENT}\` event.
              2. Click "emit".
              3. See the SF-X SAYT component update with the products data.


          ### The component will display the SF-X SAYT component in response to the \`${SAYT_EVENT.SAYT_SHOW}\` event, and hide the SF-X SAYT component in response to the \`${SAYT_EVENT.SAYT_HIDE}\` event.
            * To emit the events in this story:
              1. Visit the **Custom Events** tab.

                If SAYT is currently visible, locate the \`${SAYT_EVENT.SAYT_HIDE}\` event.

              2-a. Click "emit".

              3-a. Observe the SF-X SAYT component close.

                If SAYT is currently hidden, locate the \`${SAYT_EVENT.SAYT_SHOW}\` event.

              2-b. Click "emit".

              3-b. Observe the SF-X SAYT component open.


          ### The component will close when there is a click anywhere outside of the input box or SAYT itself.
            * To demonstrate in this story:
                1. Open SAYT with one of the methods outlined above.
                2. Click the area below SAYT.
                3. Observe SF-X SAYT component close.


          ### The SF-X SAYT component rendered based on the attributes defined on the element.
            * The component allows for customization via the inclusion of the following attributes:
              * \`hideAutocomplete\`
              * \`hideProducts\`
              * \`closeText\`
              * \`minSearchLength\` - *Note*: to observe the impact of modifying this attribute, it is necessary to add an event listener to listen for either the \`${AUTOCOMPLETE_REQUEST_RESULTS} \`or \`${PRODUCTS_REQUEST_EVENT}\` events. These events will trigger when the number of characters typed into the input box is equal to or greater than the number defined in the attribute.
            * To modify these attributes:
              1. Visit the **Knobs** tab and click any of the "Hide Autocomplete", "Hide Products", and "Show Close button'", and/or update the text contained within the "Close link text" field.
              2. Emit the appropriate events
              3. Observe the component render based on the attributes defined.

          ### The SF-X SAYT component will overlap any html behind it.
            * To demonstrate in this story:
              1. Open SAYT with one of the methods outlined above.
              2. Observe the message on the page
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

      return `
      <style>
        .search-container {
          float: left;
          position: relative;
          width: 100%;
        }
        #search-box {
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

      <div class="search-container">
        ${input}
        ${sayt}
      </div>
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      <div class="display-code">
      ${getDisplayCode(`${input}\n${sayt}`)}
      </div>
    `;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          ### The SF-X SAYT component can work with a standard input element, instead of an SF-X Search Box component.
            * The component will not close when clicking within the input element or anywhere within the SAYT component.
            * To demonstrate in this story:
              1. Open SAYT, click the input element.
              2. Observe that the SAYT component remains open.


          ### Example of the SF-X SAYT component with a standard input element


      \`\`\`html
      <input type="text" id="search-box" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box"
        closetext="×"
        showclosebutton
        visible
      ></sfx-sayt>
      \`\`\`
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
