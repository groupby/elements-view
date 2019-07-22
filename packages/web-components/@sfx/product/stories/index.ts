import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../src/index.ts';
import Product, { ProductModel } from '../src/product';

const product = <ProductModel> {
  name: 'Cool Product',
  price: 39.99,
  label: 'New Product',
  promo: '25% off',
  imageSrc: 'https://spudsmart.com/wp-content/uploads/2017/10/NZ-Bag-of-potatoes-cropped.png',
  imageAlt: 'Good bag of potatoes'
};

storiesOf('Components|Product', module)
  .addDecorator(withKnobs)
  .add('Default', () => `
    <sfx-product 
      product="${text('Product Info', JSON.stringify({
        ...product,
        variants: { 
          type: 'color', 
          items: [
            { color: '#da5', text: 'Brown', product},
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
      
      The product tile component will display information about a given product.

      ## Functionality 

      The 

      This component takes one \`product\` attribute that uses the data format seen [here](#) (@todo Link to TSDoc)

      \`\`\`js
      {
        "name": "Product Name",
        "price": 3.55,
        "productUrl": "http://url",
        "imageSrc": "http://url",
        "imageAlt": "Alternative image text"
      }
      \`\`\`

      The component can also use variants to display different information based on what variant is selected
      
      \`\`\`js
      {
        ...
        "variants": {
          
        }
      }
      \`\`\`
      
      ## Customizations
      
      ## Testing
      
      The test suite for this component is contained in /packages/web-components/@sfx/product/test.
      To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:
      
      - To run the tests once:
      
      \`\`\`sh
      yarn test
      \`\`\`
      
      - To run the tests and watch the \`src\` and \`test\` directories to rerun the tests after any changes:
      
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
`);
