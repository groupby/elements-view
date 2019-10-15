import {
  customElement,
  property,
  html,
  TemplateResult,
  LitElement,
} from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
// import { Base } from '@sfx/base';
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
      if (this.isColor(variant.color)) {
        this.style.backgroundColor = variant.color;
      } else {
        this.type = 'swatchColor';
      }
      this.title = variant.text;
    }

    if (type === 'color' && !this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', variant.text);
    }
    console.log('this in connectedcallback', this);
  }

  isColor(color: string): boolean {
    return !color.includes('https');
  }

  render(): TemplateResult {
    const { variant } = this;
    console.log('variant in render function', variant);
    console.log('this.type in render', this.type);

    return html`<style>
        .sfx-variant-image {
          height: 50px;
          width: 50px;
        }
      </style>
      ${this.type === 'image'
    ? html`<img
          class="sfx-variant-image"
          src="${variant.product.imageSrc}"
          alt="${variant.product.text}"
        />`
    : ''
}
${this.type === 'swatchColor'
    ? html`<img
class="sfx-variant-image"
src="${variant.color}"
alt="${variant.product.text}"
/>`
    : ''}
      ${this.type === 'text' ? variant.text : ''}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
