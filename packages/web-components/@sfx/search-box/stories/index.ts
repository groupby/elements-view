import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
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

function getSearchBoxComponent(): string {
  const placeholder = text('Placeholder Text', 'Search Here');
  const showSearchButton = boolean('Show search button', true) ? 'searchbutton' : '';
  const showClearButton = boolean('Show clear button', true) ? 'clearbutton' : '';
  return '<sfx-search-box\n'
  + ` placeholder="${placeholder}"\n`
  + (showSearchButton ? ` ${showSearchButton}\n` : '')
  + (showClearButton ? ` ${showClearButton}\n` : '')
  + '></sfx-search-box>'
}

storiesOf('Components|Searchbox', module)
  .addDecorator(withKnobs)
    .add('Default', () => {
      const searchBoxComponent = getSearchBoxComponent();
      return `
      ${searchBoxComponent}
      `;
    })
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
