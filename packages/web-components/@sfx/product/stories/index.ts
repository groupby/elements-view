import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ProductModel } from '@sfx/product';

import '../src/index';
import { getDisplayCode, getProducts } from '../../../../../.storybook/common';

function getProductComponent(product: ProductModel = {}, codeSnippet: boolean = false): string {
  const productInfo = text('Product Info', JSON.stringify(product));

  return codeSnippet === false
    ? '<sfx-product\n' + ` product="${productInfo}"\n` + '></sfx-product>'
    : '<sfx-product>\n' + '</sfx-product>';
}

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add(
    'Rendering data populated via attribute',
    () => {
      return `
    ${getProductComponent(getProducts(1)[0])}
    ${getDisplayCode(getProductComponent(null, true))}
    `;
    },
    {
      notes: {
        markdown: `
        # SF-X Product Component

        [SF-X Product README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/product "SF-X Product README").

        \`\`\`html
        <sfx-product></sfx-product>
        \`\`\`

        ## Demonstrated in this story:

          * The SF-X Product component rendering with product data populated via the 'product' attribute.
            * Refer to the \`ProductModel\` and \`ProductVariantsModel\` instance for the accepted data format.
              * To modify the data within the 'product' attribute:
                1. Visit the **Knobs** tab and modify the data inside the 'Product Data' field.
                  * View the component update with the updated data.
          * The SF-X Product component updating with variant product data when toggling between variants.
            * To view toggling in story:
              1. Navigate to the **Canvas** tab.
              2. View product tile.
                * If the product tile has multiple colored squares below the product image, click on the various squares.
                * If the product tile does not have multiple colored squares below the product image, refresh the page until a product with variants appears, then click on the various squares.
                  * View the component update with different product images.
        `
      }
    }
  );
