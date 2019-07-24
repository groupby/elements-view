import { customElement, property, html } from 'lit-element';
import { ProductVariantModel } from './product';

import { Base } from '@sfx/base';

@customElement('sfx-product-variant')
export default class Variant extends Base {
  @property({ type: String }) type: string = 'text';
  @property({ type: Object }) variant: ProductVariantModel = { text: '', product: {} };

  connectedCallback() {
    super.connectedCallback();

    const { type, variant } = this;

    // Configure variant component
    this.setAttribute('role', 'listitem');
    this.classList.add('product-variant');

    switch (type) {
      case 'color':
        this.setAttribute('style', `background-color:${variant.color}`);
        this.setAttribute('title', variant.text);
        break;
      case 'image':
        this.setAttribute('style', `background-image:${variant.image};background-color:${variant.color}`);
        this.setAttribute('title', variant.text);
      case 'text':
      default:
        this.innerText = variant.text;
    };

    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('sfx::change_product_variant', {
        bubbles: true,
        detail: this.variant.product
      }));
    });
  }

  render() {
    return html`<style>.product-variant { width: 15px; height: 15px; display: inline-block; margin: 2px; }</style>`;
  }
}

// customElements.define('sfx-product-variant', Variant, { extends: 'li' });
