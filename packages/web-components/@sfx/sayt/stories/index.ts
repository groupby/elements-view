import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src/index.ts';

const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results',
  { detail: [
      { "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] },
      { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }
    ],
    bubbles: true }
);

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const showAttribute = boolean('visible', false) ? 'visible' : '';

    setTimeout(() => {
      window.dispatchEvent(autocompleteDataReceivedEvent);
    }, 100);

    return `<sfx-sayt ${ showAttribute }></sfx-sayt>`
  }, {
    notes: {
      markdown: `
        # Search As You Type (SAYT)
        Hardcoded
        
        Here is the documentation for the SAYT component.
      `
    } 
  })
  .add('Responding to Events - sayt_show & sayt_hide ', () => {
    setTimeout(() => {
      window.dispatchEvent(autocompleteDataReceivedEvent);
    }, 100);

    setTimeout(() => {
      window.dispatchEvent(new Event('sfx::sayt_show'));
    }, 3000);

    setTimeout(() => {
      window.dispatchEvent(new Event('sfx::sayt_hide'));
    }, 6000);

    return `
      <sfx-sayt></sfx-sayt>
    `;
  }, {
    notes: {
      markdown:`
        # Search As You Type (SAYT)
        - Receiving sayt_show event after 3 seconds.
        - Receiving sayt_hide event after 6 seconds.
      `
    }
  })
  .add('SAYT with simple search input', () => {
    const showAttribute = boolean('visible', true) ? 'visible' : '';

    setTimeout(() => {
      window.dispatchEvent(autocompleteDataReceivedEvent);
    }, 500);

    return `
      <input type="text" id="search-bar" placeholder="Search here" />
      <br />
      <sfx-sayt searchbar="search-bar" ${ showAttribute }></sfx-sayt>
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
    const showAttribute = boolean('visible', true) ? 'visible' : '';

    setTimeout(() => {
      window.dispatchEvent(autocompleteDataReceivedEvent);
    }, 500);

    return `
      <input type="text" placeholder="Click me to close SAYT." />
      <input type="text" id="search-bar" placeholder="Search here" />
      <br />
      <sfx-sayt searchbar="search-bar" ${ showAttribute }></sfx-sayt>
    `
  }, {
    notes: {
      markdown:`
        #Search As You Type (SAYT)
        Demonstrating multiple SAYT components. This proves that each Search/SAYT pair acts independently.
      `
    }
  });
