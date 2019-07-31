import { configure, addDecorator, addParameters } from '@storybook/html';
import { withCssResources } from '@storybook/addon-cssresources';
import { withA11y } from '@storybook/addon-a11y';
import GroupByTheme from './theme';

// automatically import all files ending in *.stories.tsx
const req = require['context']('../packages/web-components', true, /\/stories\/index\.ts$/);

function loadStories() {
  addDecorator(withA11y);
  addDecorator(withCssResources)
  addParameters({
    // options: {
    //   theme: GroupByTheme,
    // },
    cssresources: [
      {
        id: `Groupby Theme`,
        code: `<link rel="stylesheet" type="text/css" src=""></link>`,
        picked: true,
      },
      {
        id: `pinktheme`,
        code: `<link rel="stylesheet" type="text/css" src="./presets/themes/blue"></link>`,
        picked: false,
      },
    ],
  });
  req.keys().forEach(req);
}

configure(loadStories, module);
