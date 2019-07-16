import { LitElement, customElement, property, html } from 'lit-element';

@customElement('sfx-product-variants')
export class ProductVariants extends LitElement {
  @property({ type: String }) type = '';
  @property({ type: Array }) items = [];

  listVariants() {
    switch (this.type) {
      case 'color':
        
        break;
      case 'image':
        
        break;
      case 'text':
        
        break;
      default:
        break;
    }
  }

  render() {
    return html`
      <ul>
        ${ this.items.map(v => html`<li>${v.text}</li>`) }
      </ul>
    `;
  }
}
