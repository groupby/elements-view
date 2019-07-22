import { customElement, property, html } from 'lit-element';
import { ProductVariantModel } from './product';

// import Base from '@sfx/base';
import Base from '../../base';

@customElement('sfx-product-variant')
export default class Variant extends Base {
  @property({ type: String }) type: string = 'text';
  @property({ type: Object }) variant: ProductVariantModel = { text: '', product: {} };

  connectedCallback() {
    super.connectedCallback();
    
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('change_product_variant', {
        bubbles: true,
        detail: this.variant.product
      }));
    });
  }
  
  render() {
    const { type, variant } = this;

    switch (type) {
      case 'color':
        return html`<li class="product-variant" style="background-color:${variant.color}" title="${variant.text}"></li>`;
      case 'image':
        return html`<li class="product-variant" style="background-image:${variant.image}; background-color:${variant.color}" title="${variant.text}"></li>`;
      case 'text':
      default:
        return html`<li class="product-variant">${variant.text}</li>`;
    };
  }
}
