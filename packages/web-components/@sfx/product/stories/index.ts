import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import { ProductModel } from '../src/index';
import '../src/index';
import { getDisplayCode } from '../../../../../.storybook/common';

const product = {
  title: 'Best Shoe',
  price: 39.99,
  label: 'New Product',
  promo: '25% off',
  imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
  imageAlt: 'A spicy red shoe'
} as ProductModel;

const productWithVariant = {
  ...product,
  productUrl: 'https://groupbyinc.com',
        variants: {
          type: 'color',
          items: [
            { color: '#c00', text: 'Red', product },
            { color: '#28e', text: 'Blue', product: {
              imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
              imageAlt: 'Sonic blue, gotta go fast'
            },
            { color: '#555', text: 'Grey', product: {
              imageSrc: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
              imageAlt: 'Magic hovering shoes'
            },
          ]
        }
      }

const productMarkdownIntro =
` # SF-X Product Component

[SF-X Product README](https://github.com/groupby/sfx-view/tree/master/packages/web-components/%40sfx/product "SF-X Product README").

## Demonstrated in this story:`;

function getProduct(product): string {
  const productInfo = text('Product Info', JSON.stringify(product));

  return (
    '<sfx-product\n'
    + ` product="${productInfo}"\n`
    + '></sfx-product>'
  );
}

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const product = getProduct(productWithVariant)
    return `
    ${product}
    ${getDisplayCode(product)}
    `
    } , {
    notes: {
      markdown: `
      ${productMarkdownIntro}

        * Rendering of hardcoded product data
          * No styling applied
          * Hardcoded product data includes variants

        * Demonstrating toggling between variants
          * To view toggling in story, click on the various coloured squares, and see the product image change.

          \`\`\`html
          <sfx-product
          product = "{
          title: 'Best Shoe',
          price: 39.99,
          label: 'New Product',
          promo: '25% off',
          imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
          imageAlt: 'A spicy red shoe',
          productUrl: 'https://groupbyinc.com',
          variants: {
            type: 'color',
            items: [
              { color: '#c00', text: 'Red', product },
              { color: '#28e', text: 'Blue', product: {
                imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
                imageAlt: 'Sonic blue, gotta go fast'
              },
              { color: '#555', text: 'Grey', product: {
                imageSrc: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
                imageAlt: 'Magic hovering shoes'
              },
            ]
          }
        }))}"
      ></sfx-product>
      \`\`\`
    `}
})
// .add('Two Tiles', () => {
//   const product = getProduct(productWithVariant);
//   return `
//   <style>
//   sfx-product {
//     width: 40%;
//     display: inline-block;
//     box-shadow: 0 0 15px -5px rgba(0,0,0,0.5);
//     padding: 12px;
//     margin: 12px;
//   }
//   sfx-product img {
//     width: 100%;
//   }
//   </style>
//   ${product}
//   ${product}

//   ${getDisplayCode(product)}

//   `
// }, {
//     notes: {
//       markdown:
//       `${productMarkdownIntro}`
//     }
// })
// .add('Slotted Price', () => `
//   <sfx-product
//     class="full"
//     product="${text('Product Info', JSON.stringify(product))}"
//   >
//     <h1 slot="title">Slotted Title</h1>
//     <p slot="price"><span style="text-decoration: line-through">29.99</span> <span style="color: #C00">19.99</span></p>
//   </sfx-product>
// `, {
//   notes: {
//     markdown:
//     `
//     ${productMarkdownIntro}

//     * This does not work... did it ever?
//     `
//   }
// });
