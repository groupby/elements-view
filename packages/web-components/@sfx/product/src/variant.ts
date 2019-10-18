import {
  customElement,
  property,
  html,
  TemplateResult,
  LitElement,
} from 'lit-element';
import { ProductVariant } from '@sfx/events';

/**
 * A product variant component that displays a thumbnail of a product variant.
 */
@customElement('sfx-product-variant')
export default class Variant extends LitElement {
  /** The type of variant to render. One of `text`, `color` or `image`. Default is `text`. */
  @property({ type: String, reflect: true }) type: string = 'text';

  /** The variant data. */
  @property({ type: Object }) variant: ProductVariant = { text: '', product: {} };

  /**
   * Sets various display properties based on the type of variant to be rendered.
   */
  connectedCallback(): void {
    super.connectedCallback();

    const { type, variant } = this;

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }

    if (type === 'color' || this.type === 'image') {
      this.style.backgroundColor = variant.color;
      this.title = variant.text;
    }

    if (type === 'color' && !this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', variant.text);
    }
  }

  render(): TemplateResult {
    const { variant } = this;
    const img = this.type === 'image'
      ? html`<img
          class="sfx-variant-image"
          src="${variant.image}"
          alt="${variant.text}"
        />` : '';

    return html`${img}
      ${this.type === 'text' ? variant.text : ''}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
