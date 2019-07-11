/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
import { LitElement, customElement, html, property } from 'lit-element';

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
    <div>
      <img src="${this.imageSource}" />
      <p>${this.name}: $${this.price}.95</p>
      <p>${this.description}</p>
    </div>
    `
  }
}

@customElement('sfx-products')
export class Products extends LitElement {
  @property({ type: Number }) maxItems = 12;

  render() {
    const products = []
    for (let i = 0; i < this.maxItems; i++) {
      products.push({
        name: `Product ${i + 1}`,
        price: Math.ceil(Math.random() * 10),
        imageSource: 'https://via.placeholder.com/150',
        description: 'This product is...'
      })
    }
    return html`
      ${products.map(product => {
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

interface Search {
  query: String,
  autocomplete: String[],
}
