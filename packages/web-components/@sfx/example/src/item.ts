import { LitElement, customElement, html, property } from 'lit-element';

@customElement('example-best-box-item')
export class ExampleBestBoxItem extends LitElement { // BaseComponent will replace LitElement
  @property({ type: String, reflect: true })
  name = '';
  @property({ type: Number, reflect: true })
  rating = '';
  @property({ type: Number, reflect: true })
  price = '';
  @property({ type: Object })
  dimensions = {};
  @property({ type: Function })
  onStuff = () => {};

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <h2>TEST</h2>
      <p @click="${this.onStuff}">${this.name}</p>
      <p>${this.rating}</p>
      <p>${this.price}</p>
      <p>${this.dimensions}</p>
    `;
  }
}

export interface BoxItem {
  name: string;
  rating: number;
  price: number;
  dimensions: ItemDimensions;
}

export interface ItemDimensions {
  width: number;
  height: number;
  depth: number;
}
