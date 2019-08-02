import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import '../src/index.ts';
import { getDisplayCode } from '../../../../../.storybook/common';
import { ProductModel } from '../../product/src/product';

const sampleProducts = [
  {
    title: 'Best Shoe',
    price: 39.99,
    label: 'New Product',
    promo: '25% off',
    imageSrc:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A spicy red shoe'
  } as ProductModel,
  {
    title: 'Greatest Shoe',
    price: 49.99,
    label: 'Classic Product',
    promo: '25% off',
    imageSrc:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
    imageAlt: 'A classic red shoe'
  } as ProductModel
];

for (let i = 0; i < 12; i++) {
  sampleProducts.push(sampleProducts[i % 2]);
}

// @TODO allow for sending event with searchbar ID. This should allow for one
// story's events to not affect another story.
const autocompleteDataReceivedEvent = new CustomEvent(
  'sfx::autocomplete_received_results',
  {
    detail: [
      { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
      { title: '', items: [{ label: 'Cars' }, { label: 'Bikes' }] }
    ],
    bubbles: true
  }
);

const productsEvent = new CustomEvent('sfx:provide-products', {
  detail: {
    products: sampleProducts
  }
});

function getSayt(searchbar = '', showSayt = true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', 'Close');
  const showCloseButton = boolean('Show Close button', true)
    ? 'showclosebutton'
    : '';

  return `<sfx-sayt${searchbar ? ` searchbar="${searchbar}"` : ''}
  closetext="${closeText}"${
    showCloseButton
      ? `
  ${showCloseButton}`
      : ''
  }${
    showAttribute
      ? `
  ${showAttribute}`
      : ''
  }
></sfx-sayt>`;
}

function getStyle() {
  return `    <style>
  sfx-sayt {
    width: 60%;
  }
  * {
    box-sizing: border-box;
  }
  .product-wrapper {
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
  sfx-product {
  }
</style>`;
}

function emitEventInFuture(event, timeout = 100) {
  setTimeout(() => {
    window.dispatchEvent(event);
  }, timeout);
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      emitEventInFuture(productsEvent, 500);
      emitEventInFuture(autocompleteDataReceivedEvent, 500);

      const sayt = getSayt();
      const style = getStyle();
      return `
      ${style}
      ${sayt}

      ${getDisplayCode(sayt)}
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
  .add(
    'Responding to Events - sayt_hide & sayt_show ',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 300);
      emitEventInFuture(productsEvent, 300);
      emitEventInFuture(new Event('sfx::sayt_hide'), 2000);
      emitEventInFuture(new Event('sfx::sayt_show'), 4000);

      const sayt = getSayt('', false);
      const style = getStyle();
      return `
      ${style}
      ${sayt}
      ${getDisplayCode(sayt)}
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
  .add(
    'SAYT with simple search input',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      emitEventInFuture(productsEvent, 100);

      const input = `<input type="text" id="search-bar" placeholder="Search here" />`;
      const sayt = getSayt();
      const style = getStyle();
      return `
      ${input}
      <br />
      ${style}
      ${sayt}
      ${getDisplayCode(`${input}
${sayt}`)}
    `;
    },
    {
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating initially visible SAYT for showing/hiding.
      `
      }
    }
  )
  .add(
    'SAYT with multiple search inputs',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);
      emitEventInFuture(productsEvent, 100);

      const input1 = `<input type="text" id="search-bar1" placeholder="Search here" />`;
      const input2 = `<input type="text" id="search-bar2" placeholder="Or search here" />`;
      const sayt1 = getSayt('search-bar1');
      const sayt2 = getSayt('search-bar2');
      const style = getStyle();

      return `${input1}<br />
${style}
${sayt1}
<hr />
${input2}<br />
${sayt2}

${getDisplayCode(`${input1}
${sayt1}

${input2}
${sayt2}`)}
    `;
    },
    {
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating multiple SAYT components. This proves that each Search/SAYT pair acts independently.
      `
      }
    }
  )
  .add(
    'SAYT with events received at different points',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 1000);
      emitEventInFuture(productsEvent, 3000);

      const sayt = getSayt();
      const style = getStyle();

      return `
      ${style}
      ${sayt}

      ${getDisplayCode(sayt)}
    `;
    },
    {
      notes: {
        markdown: `
        #Search As You Type (SAYT)
        Demonstrating functionality of SAYT when products and autocomplete events are received at different points.
        Each portion of SAYT (autocomplete, products) should display when its respective data is received.
      `
      }
    }
  );
