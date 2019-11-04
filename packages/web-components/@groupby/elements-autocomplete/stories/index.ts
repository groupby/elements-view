import { storiesOf } from '@storybook/html';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import {
  AUTOCOMPLETE_RESPONSE,
  AutocompleteResultGroup,
  AutocompleteSearchTermItem,
} from '@groupby/elements-events';
import {
  getDisplayCode,
  generateAutocompleteResultsEvent,
  autocompleteResults,
  hidePrompt,
} from '../../../../../.storybook/common';
import '../src/index';

const autocompleteNotesIntro = `
# GroupBy Elements Autocomplete Component

[Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/autocomplete "GroupBy Elements Autocomplete README").

\`\`\`html
<gbe-autocomplete></gbe-autocomplete>
\`\`\`

## Demonstrated in this story`;

function getAutocompleteComponent(results: AutocompleteResultGroup<AutocompleteSearchTermItem>[] = []): string {
  const optionalTitle = text('Optional Title', 'Autocomplete Results');

  if (results.length > 0) {
    const autocompleteResultsKnob = text('Autocomplete Results', JSON.stringify(results));
    const selectedIndex = number('Selected Index', -1);
    return '<gbe-autocomplete\n'
      + ` results="${autocompleteResultsKnob}"\n`
      + ` caption="${optionalTitle}"\n`
      + ` selectedindex="${selectedIndex}"\n`
      + '></gbe-autocomplete>';
  }
  return '<gbe-autocomplete\n'
    + ` caption="${optionalTitle}"\n`
    + '></gbe-autocomplete>';
}

storiesOf('Components|Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => `
     ${getAutocompleteComponent(autocompleteResults)}
     ${getDisplayCode(getAutocompleteComponent())}`,
    {
      notes: {
        markdown: `
          ${autocompleteNotesIntro}

          ### The GB Elements Autocomplete component populated with hardcoded autocomplete data.
          * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
          * To see the story that demonstrates the component's functionality, visit the second story under "Autocomplete": "Rendering with event payload".

          \`\`\`html
          <gbe-autocomplete
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
          ></gbe-autocomplete>
          \`\`\`

          ### The Autocomplete component will select the item at the index specified by \`selectedIndex\`.
          * The selected item will have the \`aria-selected\` attribute set to \`true\`. On all other items, this attribute will be set to \`false\`.
          * The \`selectedId\` property reflects the ID of the currently selected item.
          * If the value of the \`selectedIndex\` property does not correspond to an item, no items are selected.
          * To demonstrate in this story:
            1. Visit the **Knobs** tab and modify the number inside the "Selected Index" field.
            2. Observe that the selection changes.

          ### The Autocomplete component selects terms that are hovered.
          * Hovering over an Autocomplete term will select the term by setting the \`selectedIndex\` property.
          * To demonstrate in this story:
            1. Hover over a term.
            2. Observe that the selection changes.
               * Note that the value of the knob will not change in response to this action. This is due to technical limitations with knobs and does not reflect the actual behavior of the component.
        `,
      },
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
      customEvents: [generateAutocompleteResultsEvent()],
      notes: {
        markdown: `
          ${autocompleteNotesIntro}

            ### The GB Elements Autocomplete component updates with autocomplete data in response to the \`${AUTOCOMPLETE_RESPONSE}\` event.**
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RESPONSE}\` event.
              2. Click "emit".
              3. Observe that the component is updated with the payload of the event.


            ### The Autocomplete component allows for an optional title which populates inside an \`<h3>\` tag, above the autocomplete terms.**
            * The optional title is populated via the \`caption\` attribute.
            * To update the optional title within this story:
              1. Visit the **Knobs** tab and modify the text inside the "Optional Title" field.
              2. Navigate to the **Custom Events** tab and emit the event.
              3. See the component update with the payload of the event and the optional title.

            ### If using the Autocomplete component outside of the GB Elements Sayt component, a \`group\` attribute can be used to distinguish what events it should listen to.
            * This is only needed if multiple Autocomplete components are on the same page and the desire is for them to listen to different events.
            * The Sayt component will take care of this.
            * Ex.

            \`\`\`html
            <gbe-autocomplete group="group1"></gbe-autocomplete>
            <gbe-autocomplete group="group2"></gbe-autocomplete>
            \`\`\`
          `,
      },
    }
  );
