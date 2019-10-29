import { Selector } from 'testcafe';

fixture `SFX Web Components Functional Testing`
      .page `./demo/demo.html`;

const searchbox = Selector('sfx-search-box#main-search');
const input = Selector('sfx-search-box#main-search > input');
const clearButton = Selector('.sfx-clear');

test('SFX typing in searchbox populates sayt terms and sayt products', async t => {

  // confirm searchbox exists
  await t.expect(searchbox).ok('Searchbox exists')
  await t.hover(searchbox)
  await t.click(searchbox)

  // confirm searchbox input
  await t.typeText(searchbox, 'check dress')
  await t.expect(input.value).contains('check dress', 'Searchbox has successful input value')

  // confirm autocomplete terms are present
  const autocompleteTermsList = Selector('sfx-autocomplete').child('ul');
  await t.expect(await autocompleteTermsList.childElementCount).gt(2, 'Autocomplete terms are present')

  // confirm sayt products are present
  const autocompleteProductsList = Selector('sfx-products-sayt');
  await t.expect( await autocompleteProductsList.childElementCount).gt(2, 'Autocomplete products are present')

});
//
// test('SFX sayt items are hoverable', async t => {
// // const autocompleteItem = await autocomplete();
// await t
//
//     // .setTestSpeed(0.4)
//     .expect(searchbox).ok('Searchbox exists')
//     .hover(searchbox)
//     .click(searchbox)
//     .pressKey( 'home left c h e c k space d r e s s' )
//     // .setTestSpeed(0.6)
//     // const test = await testing()
//     .hover(autocomplete)
// });
//
// test('SFX clear button works', async t => {
// await t
//
//     .hover(searchbox)
//     .click(searchbox)
//     .pressKey( 'home left c h e c k space d r e s s' )
//     .hover(clearButton)
//
//     .click(clearButton)
// });
//
// test('SFX enter button triggers search', async t => {
// await t
//
//     .hover(searchbox)
//     .click(searchbox)
//     .pressKey('home left p a n t s')
//     .pressKey('enter')
//
//     .hover(searchbox)
// });
