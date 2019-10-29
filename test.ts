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
  // confirm autocomplete products are present
  const autocompleteProductsList = Selector('sfx-products-sayt');
  await t.expect( await autocompleteProductsList.childElementCount).gt(2, 'Autocomplete products are present')

});

test('SFX autcomplete terms has hover functionality', async t => {
  // confirm searchbox exists
  await t.expect(searchbox).ok('Searchbox exists')
  await t.hover(searchbox)
  await t.click(searchbox)
  // confirm searchbox input
  await t.typeText(searchbox, 'check dress')
  await t.expect(input.value).contains('check dress', 'Searchbox has successful input value')
  // confirm user can hover over autocomplete terms
  const autocompleteTermIndex = 2;
  const thirdAutocompleteTerm = await (Selector('sfx-autocomplete').child('ul').child('li').nth(autocompleteTermIndex))();
  await t.hover(thirdAutocompleteTerm)
  // confirm hover sets selected index property
  const autocompleteSelectedProperty = await (Selector('sfx-autocomplete').getAttribute('selectedindex'));
  await t.expect(Number(autocompleteSelectedProperty)).eql(autocompleteTermIndex, 'Hovering on third autocomplete term sets selected index')
});
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
