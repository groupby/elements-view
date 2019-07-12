import { configure, addDecorator, addParameters } from '@storybook/html';
import addons from '@storybook/addons';
import { withA11y } from '@storybook/addon-a11y';

import GroupByTheme from './theme';


// automatically import all files ending in *.stories.tsx
const req = require['context']('../packages/web-components', true, /\/stories\/index\.ts$/);

function loadStories() {
  addDecorator(withA11y);
  addParameters({
    options: {
      theme: GroupByTheme,
    }
  });

  req.keys().forEach(req);
}

addons.getChannel().on('customEvents/emitEvent', (event) => {
  window.dispatchEvent(new CustomEvent(event.name, {
    detail: event.payload
  }));
});

configure(loadStories, module);
