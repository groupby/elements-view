import { Selector } from 'testcafe';

fixture `SFX Web Components Functional Testing`
      .page `./demo/demo.html`;

// test when pointing to joeys demo page

// const headerSearchbox = Selector('#header-searchbox');
// const headerClearButton = Selector('#header-clear-button');
// const catalogueSearchBox = Selector('#catalogue-searchbox');
// const firstAutocomplete = Selector('sfx-autocomplete:first-child');
// const lastAutocomplete = Selector('sfx-autocomplete sfx-list ul:nth-child(2)');


//     test('sfx-search-box accepts input and displays autocomplete', async t => {
//     await t
//         .setTestSpeed(0.4)
//         .hover(headerSearchbox)
//         .click(headerSearchbox)
//         .pressKey( 'home left c h e c k space d r e s s' )
//         .setTestSpeed(0.1)
//         .hover(firstAutocomplete)
//         .hover(lastAutocomplete)
//         .hover(headerClearButton)
//         .setTestSpeed(0.6)
//         .click(headerClearButton)
//         .hover(catalogueSearchBox, {offsetY: 500})
//         .hover(catalogueSearchBox)
//         .click(catalogueSearchBox)
//         .setTestSpeed(0.4)
//         .pressKey('home left p a n t s')
//         .pressKey('enter')
//         .hover(catalogueSearchBox, {offsetY: 1000})
//         .hover(catalogueSearchBox)
// });

// test for using plain demo html

const searchbox = Selector('sfx-search-box');
const clearButton = Selector('.sfx-clear');
// const catalogueSearchBox = Selector('#catalogue-searchbox');
const firstAutocomplete = Selector('sfx-autocomplete sfx-list ul :first-child');
const lastAutocomplete = Selector('sfx-autocomplete sfx-list ul:nth-child(2)');

test('sfx-sayt autocomplete terms update sayt products on hover of term', async t => {
await t
    .setTestSpeed(0.4)
    .hover(searchbox)
    .click(searchbox)
    .pressKey( 'home left c h e c k space d r e s s' )
    .setTestSpeed(0.1)
    .hover(firstAutocomplete)
    .hover(lastAutocomplete)
    .hover(clearButton)
    .setTestSpeed(0.6)
    .click(clearButton)
    // .hover(catalogueSearchBox, {offsetY: 500})
    .hover(searchbox)
    .click(searchbox)
    .setTestSpeed(0.4)
    .pressKey('home left p a n t s')
    .pressKey('enter')
    .setTestSpeed(0.1)
    .hover(searchbox)
});
