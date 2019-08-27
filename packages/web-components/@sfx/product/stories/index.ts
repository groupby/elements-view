import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ProductModel } from '@sfx/product';

import '../src/index';
import { getDisplayCode, getProducts } from '../../../../../.storybook/common';

function getProductComponent(product: ProductModel = {}, codeSnippet: boolean = false): string {
  const productInfo = text('Product Info', JSON.stringify(product));

  return codeSnippet === false
    ? `<sfx-product product="${productInfo}"></sfx-product>`
    : '<sfx-product></sfx-product>';
}

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
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

        [Package README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/product "SF-X Product README").

        \`\`\`html
        <sfx-product></sfx-product>
        \`\`\`

        ## Demonstrated in this story

        ### The SF-X Product component populated with hardcoded product data

        \`\`\`html
        <sfx-product
          product="{
          title: 'Best Shoe',
          price: 39.99,
          label: 'New Product',
          promo: '25% off',
          imageSrc:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
          imageAlt: 'A spicy red shoe',
          info: 'Info 1',
          info2: 'Info 2',
          variants: {
            type: 'color',
            items: [
              {
                color: '#c00',
                text: 'Red',
                product: {
                  imageSrc:
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
                  imageAlt: 'A spicy red shoe'
                }
              },
              {
                color: '#28e',
                text: 'Blue',
                product: {
                  imageSrc:
                    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
                  imageAlt: 'Sonic blue, gotta go fast'
                }
              }
            ]
          }
        }"
        ></sfx-product>
        \`\`\`

        ### The SF-X Product component renders with product data populated via the \`product\` attribute.
        * ***Disclaimer***: although possible, it is not recommended to pass data objects via an attribute.
          * Refer to the \`ProductModel\` and \`ProductVariantsModel\` interfaces for the accepted data format.
          * To modify the data within the \`product\` attribute in this story:
            1. Visit the **Knobs** tab and modify the data inside the "Product Data" field.
            2. Observe that the component is updated with the new data.

        ### The SF-X Product component visually updates when clicking on variant tile icons.
          * The product component includes icons to toggle between product variants.
          * To toggle between product variants in this story:
            1. Navigate to the **Canvas** tab.
              * If the product tile has multiple colored squares below the product image, click on the various squares.
              * If the product tile does not have multiple colored squares below the product image, refresh the page until a product with variants appears, then click on the various squares.
            2. Observe that the component is updated with different product images.
        `
      }
    }
  );
