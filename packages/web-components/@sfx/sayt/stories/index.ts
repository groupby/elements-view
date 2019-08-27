import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { PRODUCTS_EVENT } from '@sfx/products';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '@sfx/autocomplete';
import {
  getDisplayCode,
  productsResultsEvent,
  autocompleteReceivedResultsEvent,
  autocompleteResults,
  getProductsReceivedEvent
} from '../../../../../.storybook/common';
import { SAYT_EVENT } from '../src/events';
import '../src';

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

  return (
    '<sfx-sayt\n' +
    (searchbox ? `  searchbox="${searchbox}"\n` : '') +
    `  closetext="${closeText}"\n` +
    (showCloseButton ? `  ${showCloseButton}\n` : '') +
    (hideAutocomplete ? `  ${hideAutocomplete}\n` : '') +
    (hideProducts ? `  ${hideProducts}\n` : '') +
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
    results: autocompleteResults
  }
});

function generateBaseData() {
  setTimeout(() => {
    window.dispatchEvent(autocompleteDataReceivedEvent)}, 0)
  setTimeout(() => {
    window.dispatchEvent(getProductsReceivedEvent())}, 0)
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    generateBaseData();
    const sayt = getSayt();

    return `
    <style>
      .sayt-container {
        height: 800px;
      }
    </style>

    <div class="sayt-container">
    ${sayt}
    </div>

    ${getDisplayCode(sayt)}`;
  }, {
    notes: {
      markdown: `
        ${saytNotesMarkdownIntro}

          #### **The SF-X SAYT component initially populated with autocomplete and products data for display purposes.**
          * The SF-X SAYT component is designed to render different data in response to events.
            * This story begins with the events required to display SAYT to have been fired.
            * This is done in order to see the visual component immediately.
          * For stories that demonstrate the component's functionality, visit three stories listed below this one.
      `
    }
  })
  .add(
    'Rendering based on events and attributes',
    () => {
      const sayt = getSayt();

      return `
      <style>
        .sayt-container {
          height: 800px;
        }
      </style>

      <div class="sayt-container">
      ${sayt}
      </div>

      ${getDisplayCode(sayt)}`;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          #### **The SF-X SAYT component will render the SF-X Autocomplete component with the payload of the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\`, in response to the event.**

            * To emit the event:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.
              2. Click "emit".
              3. See the SF-X SAYT component update with the autocomplete data.


          #### **The component will render the SF-X Products component with the payload of the \`${PRODUCTS_EVENT}\`, in response to the event.**
            * To emit the event
              1. Visit the **Custom Events** tab and locate the \`${PRODUCTS_EVENT}\` event.
              2. Click 'emit'.
              3. See the SF-X SAYT component update with the products data.


          #### **The component will display the SF-X SAYT component in response to the \`${SAYT_EVENT.SAYT_SHOW}\` event, and hide the SF-X SAYT component in response to the \`${SAYT_EVENT.SAYT_HIDE}\` event.**
            * To emit the events:
              1. Visit the **Custom Events** tab.

                If SAYT is currently visible, locate the \`${SAYT_EVENT.SAYT_HIDE}\` event.

              2-a. Click "emit".

              3-a. Observe the SF-X SAYT component close.

                If SAYT is currently hidden, locate the \`${SAYT_EVENT.SAYT_SHOW}\` event.

              2-b. Click "emit".

              3-b. Observe the SF-X SAYT component open.


          #### **The component will close when there is a click anywhere outside of the input box or SAYT itself.**
            * To demonstrate:
                1. Open SAYT with one of the methods outlined above.
                2. Click the area below SAYT.
                3. Observe SF-X SAYT component close.


          #### **The SF-X SAYT component rendering based on the attributes defined on the element.**
            * The component allows for customization via the inclusion of the following attributes:
              * hideAutocomplete
              * hideProducts
              * closeText
            * To modify these attributes:
              1. Visit the **Knobs** tab and click any of the 'Hide Autocomplete', 'Hide Products', and 'Show Close button', and/or update the text contained within the 'Close link text' field.
              2. Emit the appropriate events
              3. Observer the component render based on the attributes defined.
      `
      }
    }
  )
  .add(
    'SAYT with simple search input',
    () => {
      const input = `<input type="text" id="search-box" placeholder="Search here" />`;
      const sayt = getSayt('search-box');

      return `
      <style>
        .search-container {
          float: left;
          position: relative;
          width: 100%;
          height: 900px;
        }
        #search-box {
          width: 100%;
        }
      </style>
      <div class="search-container">
        ${input}
        ${sayt}
      </div>
      ${getDisplayCode(`${input}\n${sayt}`)}
    `;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          #### **The SF-X SAYT component can work with a standard input element, instead of an SF-X Search Box component.**
            * The component will not close when clicking within the input element or anywhere within the SAYT component.
              * To demonstrate this functionality:
                1. Open SAYT, click the input element.
                  * View SAYT remaining open.


          ### Example of the SF-X SAYT component with a standard input element:


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
        .sayt-container {
          height: 700px;
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
      </div>
      ${getDisplayCode(`${input1}${sayt1}${input2}${sayt2}`)}`;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
          ${saytNotesMarkdownIntro}

            #### **Two SF-X SAYT components act independently when mulitple SAYT components are included on a page, if the \`searchbox\` attribute is set.**
              * A click on one SAYT component will result in the other SAYT closing.
                * To demonstrate:
                  1. Open both SAYTs.
                  2. Click anywhere within one SAYT component.
                  3. Observe that the other SAYT component is closed.
              * A click on the close button on a given SAYT will close both SAYTs because:
                * You have closed the SAYT for which you have clicked close.
                * The other SAYT has closed due to lost focus.
                * To demonstrate:
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
