import {
  customElement,
  property,
  html,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import {
  Product as ProductModel,
  ProductVariant,
} from '@groupby/elements-events';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { Base } from '@groupby/elements-base';
import { toLowerCaseKebab } from './utils';

/**
 * A product component that consumes product data to display.
 */
@customElement('gbe-product')
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
      <span class="gbe-${toLowerCaseKebab(p)}">${product[p]}</span>
    `);
  }

  render(): TemplateResult {
    const {
      title,
      price,
      variants,
      productUrl,
      imageSrc,
      imageAlt,
    } = this.product;

    return html`
      <style>
        .product-variants {
          padding: 0;
        }
      </style>
        ${imageSrc
    ? html`<img
            class="gbe-image"
            src="${imageSrc}"
            alt="${imageAlt}" />`
    : ''}
        <ul class="gbe-product-variants">
          ${variants
    ? variants.items.map((v) => html`<gbe-product-variant
                @click="${this.updateVariant(v)}"
                type="${variants.type}"
                .variant="${v}"
              ></gbe-product-variant>`)
    : ''
}
        </ul>
        ${this.urlWrap(productUrl, html`<h3 class="gbe-title">${title}</h3>`)}
        <p class="gbe-price">${price}</p>
      ${this.additionalInfo()}
    `;
  }
}
