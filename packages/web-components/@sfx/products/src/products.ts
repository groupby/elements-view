import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { ProductModel } from '@sfx/product';

/** The name of the event that contains product data. */
export const PRODUCTS_EVENT: string = 'sfx::provide_products'

/**
 * The `sfx-products` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products')
export default class Products extends LitElement {
  @property({ type: Array }) products: ProductModel[] = [];

  /**
   * Binds relevant methods.
   */
  constructor() {
    super();

    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
  }

  /**
   * Registers event listeners and sets the ARIA role. The ARIA role is
   * set to `list` if one is not already specified.
   */
  connectedCallback() {
    super.connectedCallback();


    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'list');
    }

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

  render(): TemplateResult {
    return html`
      <style>
        sfx-products {
          display: flex;
          flex-wrap: wrap;
        }

        sfx-product {
          display: block;
        }

        sfx-product[hidden] {
          display: none;
        }
      </style>

      ${this.products.map(product => {
        return html`
          <div class="product-tile-wrapper" role="listitem">
            <sfx-product .product="${product}"></sfx-product>
          </div>
        `;
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}

/**
 * The type of the payload of the [[PRODUCTS_EVENT]] event.
 */
export interface ProductsEventPayload {
  /** The products. */
  products: ProductModel[];
}
