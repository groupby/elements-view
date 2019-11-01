import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { getDisplayCode } from '../../../../../.storybook/common';
import '../src/index';

const items = [
  {
    label: 'Pen',
  },
  {
    label: 'Headphones',
  },
  {
    label: 'Duck',
  },
  {
    label: 'Chocolate',
  },
];

function getListComponent(codeSnippet: boolean = false): string {
  const title = text('GB Elements List Title', 'Items');
  const list = text('List Items', JSON.stringify(items));

  return codeSnippet === false
    ? `<gbe-list caption="${title}" items="${list}"></gbe-list>`
    : `<gbe-list caption="${title}"></gbe-list>`;
}

storiesOf('UI|List', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => `
      ${getListComponent()}
      ${getDisplayCode(getListComponent(true))}
    `,
    {
      notes: {
        markdown: `# GB Elements List Component

        [Package README](https://github.com/groupby/gbe-view/tree/master/packages/web-components/%40sfx/ui "GB Elements List README")

        \`\`\`html
        <gbe-list
          caption="Items"
          items="[]"
        ></gbe-list>
        \`\`\`

        ## Demonstrated in this story

        **NOTE**: The GB Elements List component is intended to be used as a "building block" UI component inside other components (e.g. the GB Elements Autocomplete component uses the GB Elements List component as part of its template).

        ### The \`items\` attribute defines the list items.
          * The \`items\` attribute data has been hardcoded in this story.
          * ***Disclaimer***: although possible, it is not recommended to pass arrays of data via an attribute.
          * To modify the \`items\` attribute data (the list items) in this story:
            1. Visit the **Knobs** tab.
            2. Modify the data inside the "List Items'" field.
            3. See the component update with the new data.

        ### The \`caption\` attribute defines the list title text.
          * To modify the \`caption\` attribute text (the optional title):
            1. Visit the **Knobs** tab.
            2. Update the text in the in the GB Elements "List Title" field.
            3. See the component update with the new text.

            \`\`\`html
            <gbe-list
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
            ></gbe-list>
            \`\`\`
        `,
      },
    }
  );
