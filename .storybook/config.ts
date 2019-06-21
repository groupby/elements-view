import { configure } from '@storybook/html';

// automatically import all files ending in *.stories.tsx
const req = require.context('../packages/web-components', true, /\/stories\/index\.ts$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
