import {
  storiesOf
} from '@storybook/html';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import '../src/index.ts';

const search = {
  query: '',
  autocomplete: []
};

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-sayt search="${object('Search', search)}" placeholder="${text('Placeholder', 'Search')}"></sfx-sayt>
  `, { 
    notes: { 
      markdown: `# Search As You Type (SAYT)\n Here is the documentation for the SAYT component.`
    } 
  });
