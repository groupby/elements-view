import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import {
  AUTOCOMPLETE_RESPONSE,
  AutocompleteResultGroup,
  AutocompleteSearchTermItem,
} from '@sfx/events';
import {
  getDisplayCode,
  autocompleteResponseEvent,
  autocompleteResults,
  hidePrompt,
} from '../../../../../.storybook/common';
import '../src/index';

const autocompleteNotesIntro = `
# SF-X Autocomplete Component

[Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/autocomplete "SF-X Autocomplete README").

\`\`\`html
<sfx-autocomplete></sfx-autocomplete>
\`\`\`

## Demonstrated in this story`

// TODO: add results type to function when imported from @sfx/events repo
function getAutocompleteComponent(results: AutocompleteResultGroup<AutocompleteSearchTermItem>[] = []): string {
  const optionalTitle = text('Optional Title', 'Autocomplete Results');

  if (results.length > 0) {
    const autocompleteResults = text('Autocomplete Results', JSON.stringify(results))
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
     ${getAutocompleteComponent(autocompleteResults)}
     ${getDisplayCode(getAutocompleteComponent())}`
    },
    {
      notes: {
        markdown: `
        ${autocompleteNotesIntro}

        ### The SF-X Autocomplete component populated with hardcoded autocomplete data.
        * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
        * To see the story that demonstrates the component's functionality, visit the second story under "Autocomplete": "Rendering with event payload".

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
      `
      }
    }
  )
  .add(
    'Rendering with event payload',
    () => {
      hidePrompt(AUTOCOMPLETE_RESPONSE);
      const autocomplete = getAutocompleteComponent();

      return `
      ${autocomplete}
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      ${getDisplayCode(autocomplete)}
     `;
    },
    {
      customEvents: [autocompleteResponseEvent],
      notes: {
        markdown: `
          ${autocompleteNotesIntro}

            ### The SF-X Autocomplete component updates with autocomplete data in response to the \`${AUTOCOMPLETE_RESPONSE}\` event.**
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RESPONSE}\` event.
              2. Click "emit".
              3. Observe that the component is updated with the payload of the event.


            ### The SF-X Autocomplete component allows for an optional title which populates inside an \`<h3>\` tag, above the autocomplete terms.**
            * The optional title is populated via the \`caption\` attribute.
            * To update the optional title within this story:
              1. Visit the **Knobs** tab and modify the text inside the "Optional Title" field.
              2. Navigate to the **Custom Events** tab and emit the event.
              3. See the component update with the payload of the event and the optional title.
            `
      }
    }
  );
