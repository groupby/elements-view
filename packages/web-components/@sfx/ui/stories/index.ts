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
        markdown: `# SF-X List Component

        [SF-X UI README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/ui "SF-X List README")

        \`\`\`html
        <sfx-ui
          caption="Items"
          list=[]
        ></sfx-ui>
        \`\`\`

        ## Demonstrated in this story:

          * The SF-X List component rendering a list with data populated via the caption and list attributes.
            * To modify the hardcoded list data:
              1. Visit the **Knobs** tab.
              2. Modify the data in the in the List Items field.
                * View the component update with the updated data.
            * To modify the optional title:
              1. Visit the **Knobs** tab.
              2. Update the text in the in the SF-X List Title field.
                * View the DOM (the caption attribute) and the component update with the updated text.
          * NOTE: The SF-X List component is intended to be used as an UI component in conjunction with other components (see the SF-X Autocomplete component).
        `
      }
    }
  );
