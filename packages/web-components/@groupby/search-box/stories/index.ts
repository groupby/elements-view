import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { UPDATE_SEARCH_TERM } from '@groupby/elements-events';
import { getDisplayCode } from '../../../../../.storybook/common';
import '../src';

const updateTextEvent = [
  {
    name: UPDATE_SEARCH_TERM,
    payload: { term: 'hot chocolate' },
  },
];

const searchboxNotesMarkdownIntro = `# GB Elements Search Box Component

[Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/search-box "GB Elements Search Box README").

  \`\`\`html
  <gbe-search-box placeholder="Search Here" searchbutton clearbutton></gbe-search-box>
  \`\`\`

## Demonstrated in this story`;

function getSearchBoxComponent(): string {
  const placeholder = text('Placeholder Text', 'Type your search');
  const showSearchButton = boolean('Show search button', true) ? 'searchbutton' : '';
  const showClearButton = boolean('Show clear button', true) ? 'clearbutton' : '';
  return (
    /* eslint-disable prefer-template */
    '<gbe-search-box\n'
    + (placeholder ? ` placeholder="${placeholder}"\n` : '')
    + (showSearchButton ? ` ${showSearchButton}\n` : '')
    + (showClearButton ? ` ${showClearButton}\n` : '')
    + '></gbe-search-box>'
    /* eslint-enable prefer-template */
  );
}

storiesOf('Components|Searchbox', module)
  .addDecorator(withKnobs)
  .add(
    'Rendering based on events and attributes',
    () => {
      const searchBoxComponent = getSearchBoxComponent();
      return `
      ${searchBoxComponent}
      ${getDisplayCode(searchBoxComponent)}
      `;
    },
    {
      customEvents: updateTextEvent,
      notes: {
        markdown: `
          ${searchboxNotesMarkdownIntro}

          ### The GB Elements Search Box component can render "clear" and "search" buttons.
            * If the \`clearbutton\` attribute is present, a clear button will display.
            * If the \`searchbutton\` attribute is present, a search button will display.
            * To add and remove these attributes in this story:
              1. Visit the **Knobs** tab and toggle the "Show search button" and "Show clear button".
              2. See the component update with the buttons added or removed.

          ### The placeholder text can be customized.
          * The \`placeholder\` attribute defines the placeholder text of the search box. It defaults to "Type your search" if not present.
            * To modify the \`placeholder\` attribute in this story:
              1. Visit the **Knobs** tab and modify the text contained within the "Placeholder Text" field.
              2. See the component update with the updated text.

          ### The GB Elements Search Box component populates with an updated search term in response to the \`${UPDATE_SEARCH_TERM}\` event.
            * To emit the event in this story:
              1. Navigate to the **Custom Events** tab and locate the \`${UPDATE_SEARCH_TERM}\` event.
              2. Click "emit".
              3. See the component update with the new search term.

          ### Multiple Search Box components can behave independently
            * If multiple Search Box, Sayt, and Products components are on the page, the \`group\` attribute can be used to send events to specific groups.
              * Ex.

                \`\`\`html
                <!-- Two searchboxes -->
                <gbe-search-box
                  placeholder="Search Here"
                  group="group1"
                  searchbutton
                  clearbutton
                ></gbe-search-box>
                <gbe-search-box
                  placeholder="Search Here"
                  group="group2"
                  searchbutton
                  clearbutton
                ></gbe-search-box>
                \`\`\`
              `,
      },
    }
  );
