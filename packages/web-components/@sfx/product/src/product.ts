import {
  customElement,
  property,
  html,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { Base } from '@sfx/base';
import {
  Product as ProductModel,
  ProductVariant,
} from '@sfx/events';
import { toLowerCaseKebab } from './utils';

/**
 * A product component that consumes product data to display.
 */
@customElement('sfx-product')
export default class Product extends Base {
  /** The product data. */
  @property({ type: Object }) product: ProductModel = {};

  constructor() {
    super();
    this.updateVariant = this.updateVariant.bind(this);
  }

  /**
   *  Updates the product data with data from a specific variant.
   *
   *  @param variant The variant that is selected.
   *  @returns A function that updates the product data with the given variant.
   */
  updateVariant(variant: ProductVariant): () => void {
    return () => {
      this.product = {
        ...this.product,
        ...variant.product,
      };
    };
  }

  /**
   * Wraps the given template with an `<a>` tag if a valid url is provided.
   *
   * @param url The url to link to.
   * @param children The template to be wrapped.
   * @returns The wrapped template, or the original template if no url was provided.
   */
  urlWrap(url: string, children: TemplateResult): TemplateResult {
    return url ? html`<a href="${url}">${children}</a>` : children;
  }

  /**
   * Returns a template with `<span>` tags for each additional property in the product data.
   *
   * @returns The resulting template.
   */
  additionalInfo(): TemplateResult[] {
    const { product } = this;

    const properties: Set<keyof ProductModel> = new Set([
      'title',
      'price',
      'variants',
      'productUrl',
      'imageAlt',
      'imageSrc',
    ]);

    return Object.keys(product).filter((p) => !properties.has(p)).map((p) => html`
      <span class="sfx-${toLowerCaseKebab(p)}">${product[p]}</span>
    `);
  }

  render(): TemplateResult {
    const {
      title, price, variants, productUrl, imageSrc, imageAlt,
    } = this.product;

    return html`
      <style>
        .product-variants {
          padding: 0;
        }
      </style>
      <slot name="image">
        ${imageSrc
    ? html`<img
            class="sfx-image"
            src="${imageSrc}"
            alt="${imageAlt}" />`
    : ''}
      </slot>
      <slot name="variants">
        <ul class="sfx-product-variants">
          ${variants
    ? variants.items.map((v) => html`<sfx-product-variant
                @click="${this.updateVariant(v)}"
                type="${variants.type}"
                .variant="${v}"
              ></sfx-product-variant>`)
    : ''
}
        </ul>
      </slot>
      <slot name="title">
        ${this.urlWrap(productUrl, html`<h3 class="sfx-title">${title}</h3>`)}
      </slot>
      <slot name="price">
        <p class="sfx-price">${price}</p>
      </slot>
      ${this.additionalInfo()}
    `;
  }
}
