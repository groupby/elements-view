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

const searchboxNotesMarkdownIntro = ` # SF-X Search Box Component

[SF-X Search Box README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/search-box "SF-X Search Box README").

\`\`\`html
<sfx-search-box
placeholder="Search Here"
searchbutton
clearbutton
></sfx-search-box>
\`\`\`

## Demonstrated in this story:`;

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

          * The SF-X Search Box component rendering with customizations.
            * Clear and search buttons are optional.
              * If the 'clearbutton' attribute is present, a clear button will display.
              * If the 'searchbutton' attribute is present, a search button will display.
                * To add and remove these attributes:
                  1. Visit the **Knobs** tab and toggle the 'Show search button' and 'Show clear button'.
                    * View the DOM and component update accordingly.
            * The placeholder text can be customized.
                * If the 'placeholder' attribute is present with a string value, the placeholder text will replace the default placeholder (Type your search)
                  * To modify the 'placeholder' attribute:
                    1. Visit the **Knobs** tab and modify the text contained within the 'Placeholder Text' field.
                      * View the component and DOM update accordingly.
          * The SF-X Search Box component populating with an updated search term in response to the \`sfx::update_search_term\` event.
              * To emit the event:
                1. Navigate to the **Custom Events** tab and locate the \`sfx::update_search_term\` event.
                2. Click 'emit'.
                  * View the search term populate in the search box input.
                `
      }
    }
  );
