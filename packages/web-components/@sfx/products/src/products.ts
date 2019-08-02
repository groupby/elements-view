import {
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { ProductModel } from '@sfx/product';
import { Base } from '@sfx/base';

export const PRODUCTS_EVENT: string = 'sfx::provide-products'

/**
 * The sfx-products web component wraps and renders a number of
 * sfx-product components. It wraps each sfx-product component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products')
export default class Products extends Base {
  @property({ type: Number, reflect: true }) maxItems = 12;
  @property({ type: Array }) products: ProductModel[] = [];

  /**
   * Binds relevant methods.
   */
  constructor() {
    super();

    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
    this.getRenderableProducts = this.getRenderableProducts.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(PRODUCTS_EVENT, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(PRODUCTS_EVENT, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event A custom event containing information about products.
   */
  setProductsFromEvent(event: CustomEvent<ProductsEventPayload>) {
    this.products = event.detail.products;
  }

  /**
   * Returns an array of products limited by the `maxItems` property.
   */
  getRenderableProducts(): ProductModel[] {
    return this.products.slice(0, this.maxItems);
  }

  render(): TemplateResult {
    return html`
      <style>
        sfx-products {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .product-wrapper {
          display: block;
        }
        sfx-product {
          width: 100%;
          display: block;
        }
      </style>

      ${this.getRenderableProducts().map(product => {
        return html`
          <div class="product-wrapper">
            <sfx-product
              .product="${product}"
            ></sfx-product>
          </div>
        `
      })}
    `;
  }
}

export interface ProductsEventPayload {
  products: ProductModel[];
}
