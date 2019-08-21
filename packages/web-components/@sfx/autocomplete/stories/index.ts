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
    'Default',
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

          ## Demonstrated in this story:

            * Autocomplete populating with autocomplete data in response to the autocomplete received results event.
              * To emit the event, visit the Custom Events tab and view the sfx::autocomplete\_received\_results event.
              * Clicking 'emit' will fire the event, which sfx-autocomplete listens on.
                * The payload of the event (event detail) should populate on the page.
            * Autocomplete with an optional title
              * This is populated by the caption attribute
                * To update this attribute, visit the Knobs tab and modify the text in the 'Optional Caption' knob and emit the event
                  * View the DOM and component update with the updated text

            \`\`\`html
            <sfx-autocomplete></sfx-autocomplete>
            \`\`\`
            `
      }
    }
  );
