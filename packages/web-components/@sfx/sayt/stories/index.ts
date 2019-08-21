import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src';
import { getDisplayCode, productsResultsEvent, autocompleteReceivedResultsEvent } from '../../../../../.storybook/common';

const saytNotesMarkdownIntro = ` # SF-X SAYT Component

[SF-X SAYT README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/sayt "SF-X SAYT README").

## Demonstrated in this story:`;

function getSayt(searchbox = '', showSayt = true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', '×');
  const showCloseButton = boolean('Show Close button', true) ? 'showclosebutton' : '';
  const hideAutocomplete = boolean('Hide Autocomplete', false) ? 'hideAutocomplete' : '';
  const hideProducts = boolean('Hide Products', false) ? 'hideProducts' : '';

  return (
    '<sfx-sayt\n' +
    (searchbox ? `  searchbox="${searchbox}"\n` : '') +
    `  closetext="${closeText}"\n` +
    (showCloseButton ? `  ${showCloseButton}\n` : '') +
    (showAttribute ? `  ${showAttribute}\n` : '') +
    (hideAutocomplete ? `  ${hideAutocomplete}\n` : '') +
    (hideProducts ? `  ${hideProducts}\n` : '') +
    '></sfx-sayt>'
  );
}

const saytHide = {
  name: 'sfx::sayt_hide',
  payload: ''
}

const saytShow = {
  name: 'sfx::sayt_show',
  payload: ''
}

function emitEventInFuture(event, timeout = 100) {
  setTimeout(() => {
    window.dispatchEvent(event);
  }, timeout);
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const sayt = getSayt();
    return `
      ${ sayt }

      ${ getDisplayCode(sayt) }`;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          * Rendering of 'autocomplete' and 'products' in response to events
            * Component should render the payload of the 'sfx::autocomplete_received_results' in response to the event, as a list of autocomplete items
              * To emit the event, navigate to the 'Custom Events' tab
              * Click the 'sfx::autocomplete_received_results' button on the left hand side
              * Click the 'Emit' button
                * View the SAYT component popualte with autocomplete data
            * Component should render the payload of the 'sfx::provide_products' in response to the event, as a number of product tiles
              * To emit the event, navigate to the 'Custom Events' tab
              * Click the 'sfx::provide_products' button on the left hand side
              * Click the 'Emit' button
                * View the SAYT component populate with produts
            * Component should display the autocomplete and products in response to the 'sfx::sayt_show' event
              * To emit the 'sfx::sayt_show' event, navigate to the 'Custom Events' tab
              * To demonstrate functionality, the sayt component should have rendered SAYT and have hidden it... <-- fix
              * Click the 'sfx::sayt_show' button on the left hand side
              * Click the 'Emit' button
                * View the display of SAYT
            * Component should hide when there is a click anywhere outside of the input box or SAYT itself
              * Open SAYT, click the area below SAYT
                * View SAYT close

                ${getDisplayCode(getSayt())}
      `
      }
    }
  )
  .add('SAYT with simple search input', () => {
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
        ${ input }
        ${ sayt }
      </div>
      ${ getDisplayCode(`${ input }\n${ sayt }`) }
    `;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          * SAYT working with a standard input element, rather than our Seach component
            * SAYT should not close when clicking within the input element or anywhere within the autocomplete or products data
            * Open SAYT, click the input element
            * View SAYT remaining open
      `
      }
    }
  )
  .add('SAYT with multiple search inputs', () => {

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
      </style>
      <div class="search-container">
        ${ input1 }
        ${ sayt1 }
      </div>
      <div class="search-container">
        ${ input2 }
        ${ sayt2 }
      </div>
      ${ getDisplayCode(`${ input1 }${ sayt1 }${ input2 }${ sayt2 }`) }`;
    },
    {
      customEvents: [productsResultsEvent, autocompleteReceivedResultsEvent, saytHide, saytShow],
      notes: {
        markdown: `
          ${saytNotesMarkdownIntro}

            * Each Search/SAYT pair acts independently
              * NOTE - it is virtually impossible to open two SAYT windows simultaneously.
              Nevertheless, this proves two open SAYT components are acting independently.
              * A click on one SAYT component should result in the other SAYT closing
                * Open both SAYTs
                * Click anywhere within one SAYT component
                  * View the other SAYT closing
            * A click on \`Close\` on a given SAYT will close both SAYTs because:
              * You have closed the SAYT for which you have clicked Close.
              * The other SAYT has closed due to lost focus.
      `
      }
    }
  )
