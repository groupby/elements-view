import { XmlEntities } from 'html-entities';
import { ProductModel } from '@sfx/product';
import { PRODUCTS_EVENT } from '@sfx/products';

const entities = new XmlEntities();

export function getDisplayCode(code: string): string {
  return `
      <style>
        pre.code-output {
          padding: 15px;
          background-color: #EEEEEE;
        }
      </style>
      <h3>The code</h3>
      <pre class="code-output"><code>${entities.encode(code)}</code></pre>
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
      imageAlt: 'A spicy red shoe'
    },
    {
      title: 'Greatest Shoe',
      price: 49.99,
      label: 'Classic Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A classic red shoe'
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
