/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-products')
export class Products extends LitElement {
  @property({ type: Number }) maxItems = 12;

  render() {
    return html`
      <div>Product 1</div>
      <div>Product 2</div>
      <div>Product 3</div>
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
