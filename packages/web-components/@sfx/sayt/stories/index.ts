import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const showAttribute = boolean('show', false) ? 'show' : '';
    /**
     * TODO: Need to revisit this and consider a new way to pass in data
     * into the autocomplete component.
     * */
    const autocompleteDataReceivedEvent = new CustomEvent('autocomplete_received_results',
    {
      detail: [
        { "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] },
        { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }
      ],
      bubbles: true
    });

    setTimeout(() => {
      window.dispatchEvent(autocompleteDataReceivedEvent);
    }, 100);


    return `
      <sfx-sayt
        ${ showAttribute }
      ></sfx-sayt>
    `
  }
  , {
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
      window.dispatchEvent(new Event('sfx::sayt_show'));
    }, 3000);

    setTimeout(() => {
      window.dispatchEvent(new Event('sfx::sayt_hide'));
    }, 6000);

    return `
      <sfx-sayt></sfx-sayt>
    `
  }, {
    notes: {
      markdown:`
        # Search As You Type (SAYT)
        - Receiving sayt_show event after 3 seconds.
        - Receiving sayt_hide event after 6 seconds.
      `
    }
  })
