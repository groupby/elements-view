/**
 * The sfx-products web component is designed to wrap and render a number of 
 * sfx-product components.
 */
import { LitElement, customElement, css, html, property } from 'lit-element';

import Product from '../../product/src/product';

@customElement('sfx-products')
export class Products extends LitElement {
  @property({ type: Number, reflect: true }) maxItems = 12;
  @property({ type: Array }) products = [];

  constructor() {
    super()
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    // @TODO the `event` param should be of type Event, or a custom interface.
    window.addEventListener('sfx:provide-products', this.setProductsFromEvent);
  }

  setProductsFromEvent(event: CustomEvent) {
    this.products = event.detail.products;
  }

  getRenderableProducts() {
    return this.products.slice(0, this.maxItems);
  }

  render() {
    return html`
      <style>
        sfx-products {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        sfx-product {
          padding: 10px;
        }
      </style>

      ${this.getRenderableProducts().map(product => {
        return html`
          <sfx-product
            .product="${product}"
            />
        `
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
