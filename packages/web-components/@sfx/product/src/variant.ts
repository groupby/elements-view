import { customElement, property, html } from 'lit-element';

import { Base } from '@sfx/base';

import { ProductVariantModel } from './product';

/**
 * A product variant component that displays a thumbnail of a product variant.
 */
@customElement('sfx-product-variant')
export default class Variant extends Base {
  /** The type of variant to render. One of `text`, `color` or `image`. Default is `text`. */
  @property({ type: String, reflect: true }) type: string = 'text';
  /** The variant data. */
  @property({ type: Object }) variant: ProductVariantModel = { text: '', product: {} };

  /**
   * Sets various display properties based on the type of variant to be rendered.
   */
  connectedCallback() {
    super.connectedCallback();

    const { type, variant } = this;

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }

    switch (type) {
      case 'color':
        this.style.backgroundColor = variant.color;
        this.title = variant.text;
        break;
      case 'image':
        this.style.backgroundColor = variant.color;
        this.style.backgroundImage = `url(${variant.image})`;
        this.title = variant.text;
        break;
      case 'text':
      default:
        this.innerText = variant.text;
        break;
    };
  }

  render() {
    return html`<style>sfx-product-variant { width: 15px; height: 15px; display: inline-block; margin: 2px; cursor: pointer}</style>`;
  }
}
