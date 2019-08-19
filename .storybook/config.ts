import { configure, addDecorator, addParameters } from '@storybook/html';
import { withCssResources } from '@storybook/addon-cssresources';
import addons from '@storybook/addons';
import { withA11y } from '@storybook/addon-a11y';
import GroupByTheme from './theme';

// automatically import all files ending in *.stories.tsx
const req = require['context']('../packages/web-components', true, /\/stories\/index\.ts$/);

function loadStories() {
  addDecorator(withA11y);
  addDecorator(withCssResources);
  addParameters({
    options: {
      theme: GroupByTheme,
    },
    cssresources: [
      {
        id: `Elegant Theme`,
        code: `<link rel="stylesheet" type="text/css" href="/sfx-elegant-theme.css"></link>`,
        picked: true,
      },
      {
        id: `Bold Theme`,
        code: `<link rel="stylesheet" type="text/css" href="/sfx-bold-theme.css"></link>`,
        picked: false,
      },
    ],
  });
  req.keys().forEach(req);
}

addons.getChannel().on('customEvents/emitEvent', event => {
  window.dispatchEvent(
    new CustomEvent(event.name, {
      detail: event.payload
    })
  );
});

configure(loadStories, module);
