/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
import { LitElement, customElement, css, html, property } from 'lit-element';

@customElement('sfx-product')
class Product extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) description = ''
  @property({ type: Number }) price = ''
  @property({ type: String }) imageSource = ''

  static get properties() {
    return {
      name: { reflect: true },
      description: { reflect: true },
      price: { reflect: true },
      imageSource: { reflect: true },
    }
  }

  render() {
    return html`
      <style>
        sfx-product {
          padding: 5px;
        }
      </style>
      <div>
        <img src="${this.imageSource}" />
        <p>${this.name}: $${this.price}.95</p>
        <p>${this.description}</p>
      </div>
    `
  }

  createRenderRoot() {
    return this;
  }
}

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
      </style>

      ${this.getRenderableProducts().map(product => {
        return html`
          <sfx-product
            name="${product.name}"
            description="${product.description}"
            price="${product.price}"
            imageSource="${product.imageSource}"
            />
        `
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
