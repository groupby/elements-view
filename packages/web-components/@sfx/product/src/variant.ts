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

    if ( type === 'color' || this.type === 'image' ) {
      this.style.backgroundColor = variant.color;
      this.title = variant.text;
    }

    if (type === 'color' && !this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', variant.text);
    }
  }

  render() {
    const { variant } = this;

    return html`
      <style>
        sfx-product-variant {
          --product-variant-size: 15px;
          width: var(--product-variant-size);
          height: var(--product-variant-size);
          display: inline-block;
          background-size: cover;
          margin: 2px;
          overflow: hidden;
          cursor: pointer;
        }
        sfx-product-variant img {
          width: auto;
          height: auto;
          min-width: var(--product-variant-size);
          min-height: var(--product-variant-size);
          max-width: 150%;
          max-height: 150%;
        }
      </style>
      ${ this.type === 'image' ? html`<img src="${ variant.image }" alt="${ variant.text }" />` : '' }
      ${ this.type === 'text' ? variant.text : '' }
    `;
  }
}
