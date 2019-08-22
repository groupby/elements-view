import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode } from '../../../../../.storybook/common';
import '../src/index';

const items = [
  {
    label: 'Pen'
  },
  {
    label: 'Headphones'
  },
  {
    label: 'Duck'
  },
  {
    label: 'Chocolate'
  }
];

function getListComponent(codeSnippet = false) {
  const title = text('SF-X List Title', 'Items');
  const list = text('List Items', JSON.stringify(items));

  return codeSnippet === true
    ? '<sfx-list\n' + ` caption="${title}"\n` + '></sfx-list>'
    : '<sfx-list\n' + ` caption="${title}"\n` + ` items="${list}"\n` + '></sfx-list>';
}

storiesOf('UI|List', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      return `
      ${getListComponent()}
      ${getDisplayCode(getListComponent(true))}
    `;
    },
    {
      notes: {
        markdown: `# SF-X UI Component

        [SF-X UI README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/ui "SF-X Products README").

        \`\`\`html
        <sfx-ui
          caption="Items"
          list=[]
        ></sfx-ui>
        \`\`\`

        ## Demonstrated in this story:
          * NOTE - this UI component is to be used when a list is required (currently being used by autocomplete)
          * Rendering a list with hardcoded data and an optional title
            * To modify the hardcoded data, navigate to the 'Knobs' tab
              * Modify the data in the in the list items knob and view the data populate on page
              * Modify the text in the SF-X List Title knob (the caption attribute) and view the data populate on page
        `
      }
    }
  );
