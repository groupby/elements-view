import { XmlEntities } from 'html-entities';
import { ProductModel } from '@sfx/product';
import { PRODUCTS_EVENT } from '@sfx/products';

const entities = new XmlEntities();

export function getDisplayCode(code: string): string {
  return `
      <style>
        #the-code {
          position: fixed;
          bottom: 0;
        }
        pre.code-output {
          font-size: 12px;
          padding: 15px;
          background-color: #EEEEEE;
        }
      </style>
      <div id="the-code">
        <h3>The code</h3>
        <pre class="code-output"><code>${entities.encode(code)}</code></pre>
      </div
    `;
}

export function getSampleProducts(): ProductModel[] {
  return [
    {
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
              imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
              imageAlt: 'A spicy red shoe',
            },
          }, {
            color: '#28e',
            text: 'Blue',
            product: {
              imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
              imageAlt: 'Sonic blue, gotta go fast',
            },
          },
        ]
      },
    },
    {
      title: 'Greatest Shoe',
      price: 49.99,
      label: 'Classic Product',
      promo: '25% off',
      imageSrc: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A classic blue shoe',
    }
  ];
}

export function getProducts(quantity: number): ProductModel[] {
  const products = [];
  const sampleProducts = getSampleProducts();
  for (let i = 0; i < quantity; i++) {
    const randomIndex = Math.floor(Math.random() * sampleProducts.length);
    products.push(sampleProducts[randomIndex]);
  }
  return products;
}

export function getProductsReceivedEvent(products: ProductModel[]): CustomEvent {
  return new CustomEvent(PRODUCTS_EVENT, {
    detail: {
      products
    },
    bubbles: true
  });
}

export function sendSampleProducts(products: ProductModel[]) {
  const productsEvent = getProductsReceivedEvent(products);
  window.dispatchEvent(productsEvent);
}

export function dispatchProvideProductsEvent(count: number = 10) {
  const products = getProducts(count);
  sendSampleProducts(products);
}

export const autocompleteReceivedResultsEvent =
  {
    name: 'sfx::autocomplete_received_results',
    payload: [
      {
        title: '',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      },
      {
        title: 'Brands',
        items: [{ label: 'Kashi' }, { label: 'Excel' }]
      },
      {
        title: 'Colors',
        items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
      }
    ]
  }

export const productsResultsEvent =
  {
    name: 'sfx::provide_products',
    payload: {
      products: getProducts(5)
    }
  }
