import { XmlEntities } from 'html-entities';
import { ProductModel } from '@sfx/product';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '@sfx/autocomplete';
import { PRODUCTS_RESPONSE_EVENT } from '@sfx/products';

const entities = new XmlEntities();

export function getDisplayCode(code: string): string {
  return `
      <style>
        #the-code {
          position: block;
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
    },
    {
      title: 'Greatest Shoe',
      price: 49.99,
      label: 'Classic Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A classic blue shoe'
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

export const autocompleteResults = [
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

export const autocompleteReceivedResultsEvent = {
  name: AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
  payload: {
    results: autocompleteResults,
  }
};

export const productsResultsEvent = {
  name: PRODUCTS_RESPONSE_EVENT,
  payload: {
    results: {
      products: getProducts(5),
    }
  }
};

export function getProductsReceivedEvent(): CustomEvent {
  return new CustomEvent(PRODUCTS_RESPONSE_EVENT, {
    detail: {
      results: {
        products: getProducts(5),
      }
    },
    bubbles: true
  });
}

export function hidePrompt(event) {
  window.addEventListener(event, e => {
    let prompt: HTMLElement = document.querySelector('.prompt');
    prompt.style.display = 'none';
  });
}
