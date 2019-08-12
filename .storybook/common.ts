import { XmlEntities } from 'html-entities';
import { ProductModel } from '@sfx/product';

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
      <pre class="code-output"><code>${ entities.encode(code) }</code></pre>
    `
  }

  export const sampleProducts = [
    {
      title: 'Best Shoe',
      price: 39.99,
      label: 'New Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A spicy red shoe'
    } as ProductModel,
    {
      title: 'Greatest Shoe',
      price: 49.99,
      label: 'Classic Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A classic red shoe'
    } as ProductModel
  ];


  export const productsEvent = new CustomEvent('sfx:provide-products', {
    detail: {
      products: sampleProducts
    }
  });
