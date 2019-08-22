import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src';
import {
  getDisplayCode,
  productsResultsEvent,
  autocompleteReceivedResultsEvent
} from '../../../../../.storybook/common';

const saytNotesMarkdownIntro = ` # SF-X SAYT Component

[SF-X SAYT README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/sayt "SF-X SAYT README").

\`\`\`html
<sfx-sayt
  closetext='x'
  showclosebutton
  visible
></sfx-sayt>
\`\`\`

## Demonstrated in this story:`;

function getSayt(searchbox = '', showSayt = true): string {
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
  name: 'sfx::sayt_hide',
  payload: ''
};

const saytShow = {
  name: 'sfx::sayt_show',
  payload: ''
};

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const sayt = getSayt();
      return `
      <div style="display:relative">
      ${sayt}
      </div>

      ${getDisplayCode(sayt)}`;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          * The SF-X SAYT component rendering the SF-X Autocomplete and the SF-X Products component in response to events.
            * The component will render the SF-X Autocomplete component with the payload of the \`sfx::autocomplete_received_results\` in response to the event.
              * To emit the event:
                1. Visit the **Custom Events** tab and locate the \`sfx::autocomplete_received_results\` event.
                2. Click 'emit'.
                  * View the SF-X SAYT component populate with autocomplete data.
            * The component will render the SF-X Products component with the payload of the \`sfx::provide_products\` in response to the event.
              * To emit the event
                1. Visit the **Custom Events** tab and locate the \`sfx::provide_products\` event.
                2. Click 'emit'.
                  * View the SF-X SAYT component populate with a product grid.
            * The component will display the SF-X SAYT component in response to the \`sfx::sayt_show\` event, and hide the SF-X SAYT component in response to the \`sfx::sayt_hide\` event.
              * To emit the events:
                1. Visit the **Custom Events** tab
                  - If SAYT is currently visible, locate the \`sfx::sayt_hide\` event.
                  - Click 'emit'.
                    * View the SF-X SAYT component close.
                  - If SAYT is currently hidden, locate the \`sfx::sayt_show\` event.
                  - Click 'emit'.
                    * View the SF-X SAYT component open.
            * The component will close when there is a click anywhere outside of the input box or SAYT itself.
              * To demonstrate:
                1. Open SAYT with one of the methods outlined above.
                2. Click the area below SAYT.
                  * View SAYT close
          * The SF-X SAYT component rendering based on the attributes defined on the element.
            * The component allows for customization via the inclusion of the following attributes:
              * hideAutocomplete
              * hideProducts
              * closeText
            * To modify these attributes:
              1. Visit the **Knobs** tab and modify toggle the 'Hide Autocomplete', 'Hide Products', and 'Show Close button', and/or update the text contained within the 'Close link text' field.
                * View the component update (dependent on intial state)
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

          * The SF-X SAYT component working with a standard input element, rather than the SF-X Search Box component.
            * The component should not close when clicking within the input element or anywhere within the SAYT component.
              * To demonstrate this functionality:
                1. Open SAYT, click the input element.
                  * View SAYT remaining open.


          ### Example of the SF-X SAYT component with a standard input element:


      \`\`\`html
      <input type="text" id="search-box" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box"
        closetext="x"
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
          position: relative;
          display: block;
          height: 600px;
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

            * Two SF-X SAYT components acting independently when mulitple SAYT components are  included on a page.
              * A click on one SAYT component will result in the other SAYT closing.
                * To demonstrate:
                  1. Open both SAYTs.
                  2. Click anywhere within one SAYT component.
                    * View the other SAYT component closing.
              * A click on the close button on a given SAYT will close both SAYTs because:
                * You have closed the SAYT for which you have clicked close.
                * The other SAYT has closed due to lost focus.
                * To demonstrate:
                  1. Open both SAYTs.
                  2. Click on one of the close buttons.
                    * View both SAYT components closing.

      ### Example of the multple SAYT components:

      \`\`\`html
      <input type="text" id="search-box1" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box1"
        closetext="x"
        showclosebutton
        visible
      ></sfx-sayt>
      <input type="text" id="search-box2" placeholder="Search here" />
      <sfx-sayt
        searchbox="search-box2"
        closetext="x"
        showclosebutton
        visible
      ></sfx-sayt>
      \`\`\`
        `
      }
    }
  );
