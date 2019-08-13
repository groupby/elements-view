import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src';
import { getDisplayCode, dispatchProvideProductsEvent } from '../../../../../.storybook/common';

// @TODO allow for sending event with searchbox ID. This should allow for one
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results', {
  detail: [
    { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
    { title: '', items: [{ label: 'Cars' }, { label: 'Bikes' }] }
  ],
  bubbles: true
});

function getStyle() {
  return `
  <style>
    * {
      box-sizing: border-box;
    }
    .product-tile-wrapper {
      width: 33%;
      padding: 6px;
    }
    sfx-product {
      box-shadow: 0 0 15px -5px rgba(0,0,0,0.5);
      padding: 12px;
    }
    sfx-product img {
      width: 100%;
    }
  </style>`;
}

const productsDataReceivedEvent = new CustomEvent('sfx::provide_products',
  {
    detail: {
      products: [
        {
          title: 'Best Shoe',
          price: 39.99,
          label: 'New Product',
          promo: '25% off',
          imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
          imageAlt: 'A spicy red shoe',
          variants: {
            type: 'color',
            items: [
              { color: '#c00', text: 'Red', product: {
                imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
                imageAlt: 'A spicy red shoe',
              }
             },
              { color: '#28e', text: 'Blue', product: {
                imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
                imageAlt: 'Sonic blue, gotta go fast'
              },
            ]
          }
        },
        {
          title: 'Greatest Shoe',
          price: 49.99,
          label: 'Classic Product',
          promo: '25% off',
          imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
          imageAlt: 'A classic blue shoe',
        },
      ],
    },
    bubbles: true,
  }
);

function getSayt(searchbox = '', showSayt = true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', 'X');
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

function emitEventInFuture(event, timeout = 100) {
  setTimeout(() => {
    window.dispatchEvent(event);
  }, timeout);
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    emitEventInFuture(autocompleteDataReceivedEvent, 100);
    setTimeout(() => {
      dispatchProvideProductsEvent();
    }, 100);

    const sayt = getSayt();

    return `
    ${ getStyle() }
    ${ sayt }
  `;
    },
    {
      notes: {
        markdown: `
        # Search As You Type (SAYT)
        Hardcoded

        Here is the documentation for the SAYT component.
      `
      }
    }
  )
  // @TODO Remove these setTimeouts when opening a new story
  .add('Responding to Events - sayt_hide & sayt_show ', () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      setTimeout(() => {
        dispatchProvideProductsEvent();
      }, 100);
      emitEventInFuture(new Event('sfx::sayt_hide'), 2000);
      emitEventInFuture(new Event('sfx::sayt_show'), 4000);

      const sayt = getSayt('', false);

      return `
      ${ getStyle() }
      ${ sayt }
      ${ getDisplayCode(sayt) }
    `;
    },
    {
      notes: {
        markdown: `
        # Search As You Type (SAYT)
        - Show automatically once sub-component Autocomplete receives results.
        - Show automatically once sub-component Products receives results.
        - Receiving sayt_hide event after 2 seconds.
        - Receiving sayt_show event after 4 seconds.
      `
      }
    }
  )
  .add('SAYT with simple search input', () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      setTimeout(() => {
        dispatchProvideProductsEvent();
      }, 100);

      const input = `<input type="text" id="search-box" placeholder="Search here" />`;
      const sayt = getSayt('search-box');

      return `
      ${ input }
      <br />
      ${ getStyle() }
      ${ sayt }
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
        dispatchProvideProductsEvent();
      }, 100);

      const input1 = `<input type="text" id="search-box1" placeholder="Search here" />`;
      const input2 = `<input type="text" id="search-box2" placeholder="Or search here" />`;
      const sayt1 = getSayt('search-box1');
      const sayt2 = getSayt('search-box2');

      return `${ input1 }<br />
${ getStyle() }
${ sayt1 }
<hr />
${ input2 }<br />
${ sayt2 }

${ getDisplayCode(`${ input1 }
${ sayt1 }

${ input2 }
${ sayt2 }`) }
    `;
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
        dispatchProvideProductsEvent();
      }, 1000);

      const sayt = getSayt();

      return `
      ${ getStyle() }
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
      ${ getStyle() }
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
