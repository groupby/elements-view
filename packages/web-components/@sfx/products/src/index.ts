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
  @property({ type: Number }) maxItems = 12;
  @property({ type: Array }) products = [];

  constructor() {
    super()
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
  }

  static get properties() {
    return {
      maxItems: { reflect: true },
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    // @TODO the `event` param should be of type Event, or a custom interface.
    window.addEventListener('sfx:provide-products', this.setProductsFromEvent);
  }

  setProductsFromEvent(event: any) {
    this.products = event.detail.products;
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

      ${this.products.map(product => {
        return html`
          <sfx-product
            name=${product.name}
            description=${product.description}
            price=${product.price}
            imageSource=${product.imageSource}
            />
        `
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
