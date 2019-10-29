import { Selector } from 'testcafe';

fixture `SFX Web Components Functional Testing`
      .page `../demo/demo.html`;

const searchbox = Selector('sfx-search-box#main-search');
const input = Selector('sfx-search-box#main-search > input');
const clearButton = Selector('.sfx-clear');
const autocomplete = Selector('sfx-autocomplete');

test('SFX typing in searchbox populates sayt terms and sayt products', async t => {
  // confirm searchbox exists
  await t.expect(searchbox).ok('Searchbox exists')
  await t.hover(searchbox)
  await t.click(searchbox)
  // confirm searchbox input
  await t.typeText(searchbox, 'check dress')
  await t.expect(input.value).contains('check dress', 'Searchbox has successful input value')
  // confirm autocomplete terms are present
  const autocompleteTermsList = autocomplete.child('ul');
  await t.expect(await autocompleteTermsList.childElementCount).gte(2, 'Autocomplete terms are present')
  // confirm autocomplete products are present
  const autocompleteProductsList = Selector('sfx-products-sayt');
  await t.expect( await autocompleteProductsList.childElementCount).gte(2, 'Autocomplete products are present')

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
  const thirdAutocompleteTerm = await autocomplete.child('ul').child('li').nth(autocompleteTermIndex)();
  await t.hover(thirdAutocompleteTerm)
  // confirm hover sets selected index property
  const autocompleteSelectedProperty = await autocomplete.getAttribute('selectedindex');
  await t.expect(Number(autocompleteSelectedProperty)).eql(autocompleteTermIndex, 'Hovering on third autocomplete term sets selected index')
});

test('SFX clear button works', async t => {
  // confirm searchbox ox exists
  await t.expect(searchbox).ok('Searchbox exists')
  await t.hover(searchbox)
  await t.click(searchbox)
  // confirm searchbox input
  await t.typeText(searchbox, 'check dress')
  await t.expect(input.value).contains('check dress', 'Searchbox has successful input value')
  // confirm clear button exists
  await t.expect(clearButton).ok('Clear button exists')
  // confirm click of clear button clears searchbox input
  await t.hover(clearButton)
  await t.click(clearButton)
  await t.expect(input.value).contains('', 'Searchbox has successfully been cleared')
});

test('SFX enter button triggers search', async t => {
  // confirm searchbox ox exists
  await t.expect(searchbox).ok('Searchbox exists')
  await t.hover(searchbox)
  await t.click(searchbox)
  // confirm searchbox input
  await t.typeText(searchbox, 'pants')
  await t.expect(input.value).contains('pants', 'Searchbox has successful input value')
  // confirm pressing enter does search and populates product grid
  await t.pressKey('enter')
  const productsGrid = Selector('sfx-products')
  await t.expect( await productsGrid.childElementCount).gte(2, 'Products are present on products grid')
});
