
import { LitElement, customElement, css, html, property } from 'lit-element';
import Product from '../../product/src/product';
import { TemplateResult } from 'lit-element';

/**
 * The sfx-products web component wraps and renders a number of
 * sfx-product components. It wraps each sfx-product component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products')
export default class Products extends LitElement {
  @property({ type: Number, reflect: true }) maxItems = 12;
  @property({ type: Array }) products: Product[] = [];

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

    window.addEventListener('sfx:provide-products', this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('sfx:provide-products', this.setProductsFromEvent);
  }

  setProductsFromEvent(event: CustomEvent) {
    this.products = event.detail.products;
  }

  getRenderableProducts(): Product[] {
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

  createRenderRoot() {
    return this;
  }
}
