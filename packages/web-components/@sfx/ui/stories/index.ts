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

function getListComponent(codeSnippet: boolean = false): string {
  const title = text('SF-X List Title', 'Items');
  const list = text('List Items', JSON.stringify(items));

  return codeSnippet === false
    ? `<sfx-list caption="${title}" items="${list}"></sfx-list>`
    : `<sfx-list caption="${title}"></sfx-list>`;
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

        [Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/ui "SF-X List README")

        \`\`\`html
        <sfx-list
          caption="Items"
          items="[]"
        ></sfx-list>
        \`\`\`

        ## Demonstrated in this story

        **NOTE**: The SF-X List component is intended to be used as a "building block" UI component inside other components (e.g. the SF-X Autocomplete component uses the SF-X List component as part of its template).

        #### **The \`items\` attribute defines the list items.**
          * The \`items\` attribute data has been hardcoded in this story.
          * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
          * To modify the \`items\` attribute data (the list items) in this story:
            1. Visit the **Knobs** tab.
            2. Modify the data inside the "List Items'" field.
            3. See the component update with the new data.

        #### **The \`caption\` attribute defines the list title text.**
          * To modify the \`caption\` attribute text (the optional title):
            1. Visit the **Knobs** tab.
            2. Update the text in the in the SF-X "List Title" field.
            3. See the component update with the new text.

            \`\`\`html
            <sfx-list
              caption="Items"
              items="[{
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
              }]"
            ></sfx-list>
            \`\`\`
        `
      }
    }
  );
