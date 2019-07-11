/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-products')
export class Products extends LitElement {
  @property({ type: Number }) maxItems = 12;

  render() {
    const products = []
    for (let i = 0; i < this.maxItems; i++) {
      products.push({
        name: `Product ${i + 1}`,
        price: Math.ceil(Math.random() * 10),
      })
    }
    return html`
      ${products.map(product => {
        return html`
          <div>
            <p>${product.name}: $${product.price}.95</p>
          </div>
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
