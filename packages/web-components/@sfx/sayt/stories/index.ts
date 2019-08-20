import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src';
import { getDisplayCode, dispatchProvideProductsEvent, getProducts } from '../../../../../.storybook/common';

// @TODO allow for sending event with searchbox ID. This should allow for one
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results', {
  detail: [
    { title: '', items: [{ label: 'Cars' }, { label: 'Bikes' }] },
    { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
  ],
  bubbles: true
});


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

const autocompleteReceivedResultsEvent =
  {
    name: 'sfx::autocomplete_received_results',
    payload: [
      {
        title: '',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      },
      {
        title: 'Brands',
        items: [{ label: 'Kashi' }, { label: 'Excel' }]
      },
      {
        title: 'Colors',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      }
    ]
  }


const productsResultsEvent =
  {
    name: 'sfx::provide_products',
    payload: {
      products: getProducts(5)
    }
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

                ${getDisplayCode(getSayt())}
      `
      }
    }
  )
  // @TODO Remove these setTimeouts when opening a new story
  // .add('Responding to Events - sayt_hide & sayt_show ', () => {
  //     emitEventInFuture(autocompleteDataReceivedEvent, 100);
  //     setTimeout(() => {
  //       dispatchProvideProductsEvent(3);
  //     }, 100);
  //     emitEventInFuture(new Event('sfx::sayt_hide'), 2000);
  //     emitEventInFuture(new Event('sfx::sayt_show'), 4000);

  //     const sayt = getSayt('', false);

  //     return `
  //     ${ sayt }
  //     ${ getDisplayCode(sayt) }
  //   `;
  //   },
  //   {
  //     notes: {
  //       markdown: `
  //       # Search As You Type (SAYT)
  //       - Show automatically once sub-component Autocomplete receives results.
  //       - Show automatically once sub-component Products receives results.
  //       - Receiving sayt_hide event after 2 seconds.
  //       - Receiving sayt_show event after 4 seconds.
  //     `
  //     }
  //   }
  // )
  .add('SAYT with simple search input', () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      setTimeout(() => {
        dispatchProvideProductsEvent(3);
      }, 100);

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
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating SAYT working with a standard input element,
        rather than our Seach component.
      `
      }
    }
  )
  .add('SAYT with multiple search inputs', () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      setTimeout(() => {
        dispatchProvideProductsEvent(2);
      }, 100);

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
      notes: {
        markdown: `
          #Search As You Type (SAYT)
          Demonstrating multiple SAYT components.This proves that each Search/SAYT
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
      `
      }
    }
  )
  .add(
    'SAYT with events received at different points',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 3000);
      setTimeout(() => {
        dispatchProvideProductsEvent(3);
      }, 1000);

      const sayt = getSayt();

      return `
      ${ sayt }

      ${getDisplayCode(sayt)}
    `;
    },
    {
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating functionality of SAYT when products and autocomplete events are received at different points.
        Each portion of SAYT (autocomplete, products) should display when its respective data is received.
        Autocomplete should appear at 1 second, and products should appear at 3 seconds.
      `
      }
    }
  )
  .add('SAYT with only autocomplete event received', () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);

      const sayt = getSayt();

      return `
      ${ sayt }

      ${getDisplayCode(sayt)}
    `;
    },
    {
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating functionality of SAYT when only receiving one of autocomplete and products events.
        Autocomplete data should appear if products data is not received, and vice versa.
        Only autocomplete should appear in this specific story.
        `
      }
    }
  );
