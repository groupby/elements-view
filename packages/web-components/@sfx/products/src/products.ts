/**
 * The sfx-products web component is designed to wrap and render a number of
 * sfx-product components.
 */
import { LitElement, customElement, css, html, property } from 'lit-element';
import Product from '../../product/src/product';
import { TemplateResult } from 'lit-element';

@customElement('sfx-products')
export default class Products extends LitElement {
  @property({ type: Number, reflect: true }) maxItems = 12;
  @property({ type: Array }) products: Product[] = [];

  constructor() {
    super();
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    window.addEventListener('sfx:provide-products', this.setProductsFromEvent);
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
              />
          </div>
        `
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
