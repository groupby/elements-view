import {
  storiesOf
} from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-sayt 
      query="${text('Query', '')}" 
      placeholder="${text('Placeholder', 'Search')}" 
      autocomplete="${text('Autocomplete', '["one", "two"]')}"
    ></sfx-sayt>
  `, { 
    notes: { 
      markdown: `# Search As You Type (SAYT)\n Here is the documentation for the SAYT component.`
    } 
  });
