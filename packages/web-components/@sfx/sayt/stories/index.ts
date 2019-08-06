import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import '../src/index.ts';
import {
  getDisplayCode,
  emitEventInFuture,
  autocompleteDataReceivedEvent,
  sampleProducts,
  productsEvent
} from '../../../../../.storybook/common';

for (let i = 0; i < 12; i++) {
  sampleProducts.push(sampleProducts[i % 2]);
}

function getSayt(searchbar = '', showSayt = true): string {
  const showAttribute = boolean('visible', showSayt) ? 'visible' : '';
  const closeText = text('Close link text', 'Close');
  const showCloseButton = boolean('Show Close button', true) ? 'showclosebutton' : '';
  const hideAutocomplete = boolean('Hide Autocomplete', false) ? 'hideAutocomplete' : '';
  const hideProducts = boolean('Hide Products', false) ? 'hideProducts' : '';

  return `<sfx-sayt${searchbar ? ` searchbar="${searchbar}"` : ''}
  closetext="${closeText}"${showCloseButton ? ` ${showCloseButton}` : ''}
  ${showAttribute ? `${showAttribute}` : ''}
  ${hideAutocomplete ? `${hideAutocomplete}` : ''}
  ${hideProducts ? `${hideProducts}` : ''}
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
  )
  .add(
    'SAYT with only autocomplete event received',
    () => {
      emitEventInFuture(autocompleteDataReceivedEvent, 100);

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
        Demonstrating functionality of SAYT when only receiving one of autocomplete and products events.
        Autocomplete data should appear if products data is not received, and vice versa.
        `
      }
    }
  );
