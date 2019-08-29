import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { getDisplayCode } from '../../../../../.storybook/common';
import { SEARCHBOX_EVENT } from '../src/events';
import '../src';

const updateTextEvent = [
  {
    name: SEARCHBOX_EVENT.UPDATE_SEARCH_TERM,
    payload: 'hot chocolate'
  }
];

const searchboxNotesMarkdownIntro = `# SF-X Search Box Component

[Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/search-box "SF-X Search Box README").

  \`\`\`html
  <sfx-search-box placeholder="Search Here" searchbutton clearbutton></sfx-search-box>
  \`\`\`

## Demonstrated in this story`;

function getSearchBoxComponent(): string {
  const placeholder = text('Placeholder Text', 'Type your search');
  const showSearchButton = boolean('Show search button', true) ? 'searchbutton' : '';
  const showClearButton = boolean('Show clear button', true) ? 'clearbutton' : '';
  return (
    '<sfx-search-box\n' +
    (placeholder ? ` placeholder="${placeholder}"\n` : '') +
    (showSearchButton ? ` ${showSearchButton}\n` : '') +
    (showClearButton ? ` ${showClearButton}\n` : '') +
    '></sfx-search-box>'
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

          ### The SF-X Search Box component can render "clear" and "search" buttons.
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

          ### The SF-X Search Box component populates with an updated search term in response to the \`${SEARCHBOX_EVENT.UPDATE_SEARCH_TERM}\` event.
            * To emit the event in this story:
              1. Navigate to the **Custom Events** tab and locate the \`${SEARCHBOX_EVENT.UPDATE_SEARCH_TERM}\` event.
              2. Click "emit".
              3. See the component update with the new search term.
              `
      }
    }
  );
