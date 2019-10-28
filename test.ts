import { Selector } from 'testcafe';

fixture `SFX Web Components Functional Testing`
      .page `./demo/demo.html`;

const searchbox = Selector('sfx-search-box');
const clearButton = Selector('.sfx-clear');
const autocomplete = Selector('sfx-autocomplete');

test('SFX search populates sayt terms and sayt products', async t => {
  await t
    // .setTestSpeed(0.4)
    .hover(searchbox)
    .click(searchbox)
    .pressKey( 'home left c h e c k space d r e s s' )
});

test('SFX sayt items are hoverable', async t => {
await t
    // .setTestSpeed(0.4)
    .hover(searchbox)
    .click(searchbox)
    .pressKey( 'home left c h e c k space d r e s s' )
    // .setTestSpeed(0.6)
    .hover(autocomplete)
});

test('SFX clear button works', async t => {
await t
    .setTestSpeed(0.4)
    .hover(searchbox)
    .click(searchbox)
    .pressKey( 'home left c h e c k space d r e s s' )
    .hover(clearButton)
    .setTestSpeed(0.6)
    .click(clearButton)
});

test('SFX enter button triggers search', async t => {
await t
    .setTestSpeed(0.4)
    .hover(searchbox)
    .click(searchbox)
    .pressKey('home left p a n t s')
    .pressKey('enter')
    .setTestSpeed(0.1)
    .hover(searchbox)
});
