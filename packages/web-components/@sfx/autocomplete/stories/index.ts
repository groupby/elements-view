import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode, autocompleteReceivedResultsEvent, autocompleteResults } from '../../../../../.storybook/common';
import '../src/index';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '../src/index';

const autocompleteNotesIntro = `
# SF-X Autocomplete Component

[Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/autocomplete "SF-X Autocomplete README").

\`\`\`html
<sfx-autocomplete></sfx-autocomplete>
\`\`\`


## Demonstrated in this story`

function getAutocomplete(results = []): string {
  const optionalTitle = text('Optional Title', 'Autocomplete Results');
  const autocompleteResults = text('Autocomplete Results', JSON.stringify(results))
  if (results.length > 0) {
    return '<sfx-autocomplete\n'
    + ` results="${autocompleteResults}"\n`
    + ` caption="${optionalTitle}"\n`
    + '></sfx-autocomplete>';
  } else {
    return '<sfx-autocomplete\n'
    + ` caption="${optionalTitle}"\n`
    + '></sfx-autocomplete>';
  }
}

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
     return `
     ${getAutocomplete(autocompleteResults)}
     ${getDisplayCode(getAutocomplete())}`
    },
    {
    notes: {
      markdown: `
        ${autocompleteNotesIntro}

        #### **The SF-X Autocomplete component populated with hardcoded autocomplete data for display purposes.**

        \`\`\`html
        <sfx-autocomplete
          caption="Autocomplete Results"
          results="[
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
          ]"
        ></sfx-autocomplete>
        \`\`\`

        * To see story that demonstrates the component's functionality, visit the second story 'Rendering with event payload'.`
    }
  }
  )
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
          ${autocompleteNotesIntro}

            #### **The SF-X Autocomplete component populates with autocomplete data in response to the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.**
            * To emit the event:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RECEIVED_RESULTS_EVENT}\` event.
              2. Click "emit".
              3. Observe that the component is updated with the payload of the event.

            #### **The SF-X Autocomplete component allows for an optional title which populates inside an \`<h3>\` tag, above the autocomplete terms.**
            * The optional title is populated via the \`caption\` attribute.
                * In this story, the "Optional Title"  knob maps to the \`caption\` attribute.
                * To update the optional title within this story:
                  1. Visit the **Knobs** tab and modify the text inside the 'Optional Title' field.
                  2. Navigate to the **Custom Events** tab and emit the event.
                  3. See the component update with the optional title.
            `
      }
    }
  );
