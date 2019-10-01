import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import {
  SAYT_PRODUCTS_RESPONSE,
  Product,
  SaytProductsResponsePayload,
} from '@sfx/events';

/**
 * The `sfx-products` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products')
export default class Products extends LitElement {
  @property({ type: Array }) products: Product[] = [];

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
  connectedCallback(): void {
    super.connectedCallback();


    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'list');
    }

    window.addEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromEvent(event: CustomEvent<SaytProductsResponsePayload>): void {
    this.products = event.detail.products || [];
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

      ${this.products.map((product) => html`
          <div class="sfx-product-tile-wrapper" role="listitem">
            <sfx-product .product="${product}"></sfx-product>
          </div>
        `)}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
