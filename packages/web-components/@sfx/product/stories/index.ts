import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import { ProductModel } from '../src/index';
import '../src/index';

const product = {
  title: 'Best Shoe',
  price: 39.99,
  label: 'New Product',
  promo: '25% off',
  imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
  imageAlt: 'A spicy red shoe'
} as ProductModel;

const markdown = `
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
`;



storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-product
      product="${text('Product Info', JSON.stringify({
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
      }))}"
    ></sfx-product>
  `, {
    notes: {
      markdown
    }
}).add('Two Tiles', () => `
  <style>
  sfx-product {
    width: 40%;
    display: inline-block;
    box-shadow: 0 0 15px -5px rgba(0,0,0,0.5);
    padding: 12px;
    margin: 12px;
  }
  sfx-product img {
    width: 100%;
  }
  </style>
  <sfx-product
  product="${text('Product Info', JSON.stringify({
    ...product,
    variants: {
      type: 'image',
      items: [
        { color: '#c00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80', text: 'Red', product },
        { color: '#28e', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80', text: 'Blue', product: {
          imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
          imageAlt: 'Sonic blue, gotta go fast'
        },
        { color: '#555', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80', text: 'Grey', product: {
          imageSrc: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80' },
          imageAlt: 'Magic hovering shoes'
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
  `, {
    notes: {
      markdown
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
    markdown
  }
});
