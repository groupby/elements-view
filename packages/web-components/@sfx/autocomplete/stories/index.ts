import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode, autocompleteReceivedResultsEvent } from '../../../../../.storybook/common';
import '../src/index';

function getAutocomplete(): string {
  const optionalTitle = text('Optional Caption', 'Autocomplete Results');
  return '<sfx-autocomplete\n' + ` caption="${optionalTitle}"\n` + '></sfx-autocomplete>';
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

          [SF-X Autocomplete README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/autocomplete "SF-X Autocomplete README").

          \`\`\`html
          <sfx-autocomplete></sfx-autocomplete>
          \`\`\`


          ## Demonstrated in this story:

            * The SF-X Autocomplete component populating with autocomplete data in response to the \`sfx::autocomplete_received_results\` event.
              * To emit the event:
                1. Visit the **Custom Events** tab and locate the \`sfx::autocomplete_received_results\` event.
                2. Click 'emit'.
                  * The payload of the event will populate on the page as a list of autocomplete items.
            * The SF-X Autocomplete component populating with an optional title.
              * The optional title is populated via the 'caption' attribute.
                * To update the 'caption' attribute text:
                  1. Visit the **Knobs** tab and modify the text inside the 'Optional Caption' field.
                  2. Navigate to the **Custom Events** tab and emit the event.
                    * View the DOM and component update with the updated text.
            `
      }
    }
  );
