import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode, autocompleteReceivedResultsEvent } from '../../../../../.storybook/common';
import '../src/index';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '../src/index';

function getAutocomplete(): string {
  const optionalTitle = text('Optional Title', 'Autocomplete Results');
  return '<sfx-autocomplete\n'
  + ` caption="${optionalTitle}"\n`
  + '></sfx-autocomplete>';
}

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Rendering with event payload',
    () => {
      const autocomplete = getAutocomplete();
      return `
      ${autocomplete}
      ${getDisplayCode(autocomplete)}
     `;
    },
    {
      customEvents: [autocompleteReceivedResultsEvent],
      notes: {
        markdown: `
          # SF-X Autocomplete Component

          [Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/autocomplete "SF-X Autocomplete README").

          \`\`\`html
          <sfx-autocomplete></sfx-autocomplete>
          \`\`\`


          ## Demonstrated in this story

            * The SF-X Autocomplete component populates with autocomplete data in response to the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.
              * To emit the event:
                1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.
                2. Click "emit".
                  * The payload of the event will appear on the page as a list of autocomplete items.
            * The SF-X Autocomplete component comes with the option of including a title to title the autocomplete terms.
              * The optional title is populated via the \`caption\` attribute.
                  * In this story, the 'Optional Title' knob maps to the \`caption\` attribute.
                  * To update the optional title within this story:
                    1. Visit the **Knobs** tab and modify the text inside the 'Optional Title' field.
                    2. Navigate to the **Custom Events** tab and emit the event.
                      * See the component update with the optional title.
            `
      }
    }
  );
