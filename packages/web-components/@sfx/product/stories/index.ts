import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import '../src/index';
import { getDisplayCode, getProducts } from '../../../../../.storybook/common';

const productMarkdownIntro = ` # SF-X Product Component

[SF-X Product README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/product "SF-X Product README").

\`\`\`html
<sfx-product></sfx-product>
\`\`\`

## Demonstrated in this story:`;

function getProductComponent(product = {}, codeSnippet = false): string {
  const productInfo = text('Product Info', JSON.stringify(product));

  return codeSnippet === false
    ? '<sfx-product\n' + ` product="${productInfo}"\n` + '></sfx-product>'
    : '<sfx-product>\n' + '</sfx-product>';
}

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const productComponent = getProductComponent(getProducts(1)[0]);
      return `
    ${productComponent}
    ${getDisplayCode(getProductComponent(null, true))}
    `;
    },
    {
      notes: {
        markdown: `
        ${productMarkdownIntro}

          * The SF-X Product component rendering with hardcoded product data (randomized).
            * The product data is being populated via the 'product' attribute (refer to the \`ProductModel\` and \`ProductVariantsModel\` instance for the data format).
              * To modify the data within the 'product' attribute:
                1. Visit the **Knobs** tab and modify the data in the 'Product Data' field.
                  * View the component update with the updated data.
          * The SF-X Product component updating with variant product data when toggling between variants.
            * To view toggling in story, click on the various coloured squares and see the product image change.
        `
      }
    }
  );
