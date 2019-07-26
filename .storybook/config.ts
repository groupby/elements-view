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
    options: {
      theme: GroupByTheme,
    },
    cssresources: [
      {
        id: `bluetheme`,
        code: `<style>body { background-color: lightblue; }</style>`,
        picked: true,
      },
      {
        id: `pinktheme`,
        code: `<style>body { background-color: lightpink; }</style>`,
        picked: false,
      },
    ],
  });
  req.keys().forEach(req);
}

configure(loadStories, module);
