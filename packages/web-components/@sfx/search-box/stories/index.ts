import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { getDisplayCode } from '../../../../../.storybook/common';
import '../src';
// import { SEARCHBOX_EVENT } from '../src/events';

// start of event dispatch testing
// window.addEventListener(SEARCHBOX_EVENT.SEARCH_REQUEST, e => {
//   console.log('search request received');
//   console.log('event', e);
// });

// window.addEventListener(SEARCHBOX_EVENT.SEARCHBOX_CLEAR_CLICK, e => {
//   console.log('search box cleared event received');
//   console.log('event', e);
// });

// window.addEventListener(SEARCHBOX_EVENT.SEARCHBOX_CLICK, e => {
//   console.log('search box clicked event received');
//   console.log('event', e);
// });

// window.addEventListener(SEARCHBOX_EVENT.SEARCHBOX_CHANGE, e => {
//   console.log('search box change event received');
//   console.log('event', e);
// });
// end of event dispatch testing

const updateTextEvent = [
  {
    name: 'sfx::update_search_term',
    payload: 'hot chocolate'
  }
];

const searchboxNotesMarkdownIntro = ` # SF-X Search Box Component

[SF-X Search Box README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/search-box "SF-X Search Box README").

## Demonstrated in this story:`;

function getSearchBoxComponent(): string {
  const placeholder = text('Placeholder Text', 'Search Here');
  const showSearchButton = boolean('Show search button', true) ? 'searchbutton' : '';
  const showClearButton = boolean('Show clear button', true) ? 'clearbutton' : '';
  return (
    '<sfx-search-box\n' +
    ` placeholder="${placeholder}"\n` +
    (showSearchButton ? ` ${showSearchButton}\n` : '') +
    (showClearButton ? ` ${showClearButton}\n` : '') +
    '></sfx-search-box>'
  );
}

storiesOf('Components|Searchbox', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
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

          * Rendering of searchbox
            * Clear and search buttons are optional
              * If the 'clearbutton' attribute is present, a clear button will display
              * If the 'searchbutton' attribute is present, a search button will display
                * To demonstrate this, visit the 'Knobs' tab and toggle the 'Show search button' and 'Show clear button'
                  * View the component and DOM update accordingly
            * The placeholder text can be customized
                * If the 'placeholder' attribute is present with a string value, the placeholder text will replace the default (Type your search)
                  * To demonstrate this, visit the 'Knobs' tab and modify the text contained within the 'Placeholder Text' field
                    * View the component and DOM update accordingly
            * The searchbox component updates with the payload of the 'sfx::update_search_term' evemt
              * To emit an event, navigate to the 'Custom Events' tab
              * To emit the provided event on the left, click the 'emit' button
              * To create another event, add an event name and event detail in the provided area on the right

              \`\`\`html
              <sfx-search-box
              placeholder="Search Here"
              searchbutton
              clearbutton
              ></sfx-search-box>
              \`\`\`
                `
      }
    }
  );
//   .add(
//     'Without any SFX provided buttons',
//     () => `
//   <sfx-search-box></sfx-search-box>
// `
//   )
//   .add(
//     'With a clear button, without a search button',
//     () => `
//   <sfx-search-box clearbutton></sfx-search-box>
// `
//   )
//   .add(
//     'With custom placeholder text',
//     () => `
//   <sfx-search-box placeholder="${text(
//     'Placeholder Title',
//     'Placeholder here...'
//   )}"></sfx-search-box>
// `
//   );
