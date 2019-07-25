import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import { ProductModel } from '../src/index';
import '../src/index';

const product = {
  title: 'Cool Product',
  price: 39.99,
  label: 'New Product',
  promo: '25% off',
  imageSrc: 'https://spudsmart.com/wp-content/uploads/2017/10/NZ-Bag-of-potatoes-cropped.png',
  imageAlt: 'Good bag of potatoes'
} as ProductModel;

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-product
      product="${text('Product Info', JSON.stringify({
        ...product,
        variants: {
          type: 'color',
          items: [
            { color: '#da5', text: 'Brown', product },
            { color: '#7a0', text: 'Green', product: {
              imageSrc: 'https://teara.govt.nz/files/p-9780-enz.jpg' },
              imageAlt: 'Spicy green potatoes'
            },
            { color: '#546', text: 'Blue', product: {
              imageSrc: 'http://startuptipsdaily.com/wp-content/uploads/2016/12/purple-and-blue-potato.jpg' },
              imageAlt: 'Mystery blue potatoes'
            },
          ]
        }
      }))}"
    ></sfx-product>
    <sfx-product
      product="${text('Product Info', JSON.stringify({
        ...product,
        variants: {
          type: 'color',
          items: [
            { color: '#da5', text: 'Brown', product },
            { color: '#7a0', text: 'Green', product: {
              imageSrc: 'https://teara.govt.nz/files/p-9780-enz.jpg' },
              imageAlt: 'Spicy green potatoes'
            },
            { color: '#546', text: 'Blue', product: {
              imageSrc: 'http://startuptipsdaily.com/wp-content/uploads/2016/12/purple-and-blue-potato.jpg' },
              imageAlt: 'Mystery blue potatoes'
            },
          ]
        }
      }))}"
    ></sfx-product>
  `, {
    notes: {
      markdown: `
        # SF-X Product Component

        \`\`\`html
        <sfx-product product="{}"></sfx-product>
        \`\`\`

        The product component will display information about a given product.

        ## Functionality

        The component takes one \`product\` attribute (refer to the \`ProductModel\` instance for the data format).

        \`\`\`js
        {
          "title": "Product Name",
          "price": 3.55,
          "productUrl": "http://example.com/img.jpg",
          "imageSrc": "http://example.com/img.jpg",
          "imageAlt": "Alternative image text"
        }
        \`\`\`

        ## Customizations

        Optionally the product can use \`variants\` to display different information based on what variant is selected (refer to the \`ProductVariantsModel\` instance for the data format).

        \`\`\`js
        {
          "variants": {
            "type": "text" // default, can be either "text", "image", "color"
            "items": [
              {
                "text": "Variant Label",
                "product": {
                  // Data that will be overwritten in the product component
                }
              }
            ]
          }
        }
        \`\`\`

        The \`image\`, \`variants\`, \`title\` and \`price\` can be changed using slots.

        \`\`\`html
        <sfx-product product="{}">
          <h1 slot="title">Slotted Title</h1>
        </sfx-product>
        \`\`\`

        **Any properties that are not identified in the ProductModel, will be rendered as additional \`<span>\` tags in the component.**


        ## Testing

        The test suite for this component is contained in \`test\` directory.
        To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

        - To run the tests once:

        \`\`\`sh
        yarn test
        \`\`\`

        - To run the tests and watch the \`src\` and \`test\` directories for changes:

        \`\`\`sh
        yarn tdd
        \`\`\`
      `
    }
}).add('Slotted Price', () => `
  <sfx-product
    class="full"
    product="${text('Product Info', JSON.stringify(product))}"
  >
    <h1 slot="title">Slotted Title</h1>
    <p slot="price"><span style="text-decoration: line-through">29.99</span> <span style="color: #C00">19.99</span></p>
  </sfx-product>
`, {
  notes: {
    markdown: `
      # SF-X Product Component

      \`\`\`html
      <sfx-product product="{}"></sfx-product>
      \`\`\`

      The product component will display information about a given product.

      ## Functionality

      The component takes one \`product\` attribute (refer to the \`ProductModel\` instance for the data format).

      \`\`\`js
      {
        "title": "Product Name",
        "price": 3.55,
        "productUrl": "http://example.com/img.jpg",
        "imageSrc": "http://example.com/img.jpg",
        "imageAlt": "Alternative image text"
      }
      \`\`\`

      ## Customizations

      Optionally the product can use \`variants\` to display different information based on what variant is selected (refer to the \`ProductVariantsModel\` instance for the data format).

      \`\`\`js
      {
        "variants": {
          "type": "text" // default, can be either "text", "image", "color"
          "items": [
            {
              "text": "Variant Label",
              "product": {
                // Data that will be overwritten in the product component
              }
            }
          ]
        }
      }
      \`\`\`

      The \`image\`, \`variants\`, \`title\` and \`price\` can be changed using slots.

      \`\`\`html
      <sfx-product product="{}">
        <h1 slot="title">Slotted Title</h1>
      </sfx-product>
      \`\`\`

      **Any properties that are not identified in the ProductModel, will be rendered as additional \`<span>\` tags in the component.**


      ## Testing

      The test suite for this component is contained in \`test\` directory.
      To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

      - To run the tests once:

      \`\`\`sh
      yarn test
      \`\`\`

      - To run the tests and watch the \`src\` and \`test\` directories for changes:

      \`\`\`sh
      yarn tdd
      \`\`\`
    `
  }
});
