import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { ProductModel } from '@sfx/product';

/** The name of the event that contains product data. */
export const PRODUCTS_RESPONSE_EVENT: string = 'sfx::sayt_products_response';
/** The name of the event that contains product request. */
export const PRODUCTS_REQUEST_EVENT: string = 'sfx::sayt_products_request';

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

    window.addEventListener(PRODUCTS_RESPONSE_EVENT, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(PRODUCTS_RESPONSE_EVENT, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromEvent(event: CustomEvent<ProductsEventPayload>) {
    this.products = event.detail.results.products || [];
  }

  render(): TemplateResult {
    return html`
      <style>
        sfx-products {
          display: flex;
          flex-wrap: wrap;
        }

        sfx-products[hidden] {
          display: none;
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
          <div class="sfx-product-tile-wrapper" role="listitem">
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
 * The type of the payload of the [[PRODUCTS_RESPONSE_EVENT]] event.
 */
export interface ProductsEventPayload {
  /** The products. */
  results: {
    products: ProductModel[];
    query: string;
  }
  searchbox?: string;
}
