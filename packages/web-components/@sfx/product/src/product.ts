import { customElement, property, html, TemplateResult } from 'lit-element';

import { Base } from '@sfx/base';

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
  updateVariant(variant: ProductVariantModel): () => void {
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
    return url ? html`<a href="${ url }">${children}</a>` : children;
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

    return Object.keys(product).filter(p => !properties.has(p)).map(p => html`
      <span class="sfx-product-${ toLowerCaseKebab(p) }">${ product[p] }</span>
    `);
  }

  render() {
    const { title, price, variants, productUrl, imageSrc, imageAlt } = this.product;

    return html`
      <style>.product-variants { padding: 0 }</style>
      <slot name="image">
        ${ imageSrc ? html`<img src="${ imageSrc }" alt="${ imageAlt }" />`: '' }
      </slot>
      <slot name="variants">
        <ul class="product-variants">
          ${
            variants ?
              variants.items.map(v =>
                html`<sfx-product-variant @click="${this.updateVariant(v)}" type="${variants.type}" .variant="${v}"></sfx-product-variant>`
              )
            : ''
          }
        </ul>
      </slot>
      <slot name="title">
        ${ this.urlWrap(productUrl, html`<h3>${ title }</h3>`) }
      </slot>
      <slot name="price">
        <p>${ price }</p>
      </slot>
      ${ this.additionalInfo() }
    `;
  }
}

/**
 *  Converts object properties to valid css classes. Makes
 *  a string lowercase and replaces spaces with hyphens.
 *
 *  @param str The string to process.
 *  @returns The lower case kebab string.
 *
 *  @internal
 */
function toLowerCaseKebab(str: string): string {
  return str.toLowerCase().replace(/\s/g, '-');
}

/**
 *  The type of product that is expected by the product component.
 */
export interface ProductModel extends Record<string, any>{
  /** The name of the product. */
  title?: string;
  /** The display price of the product. */
  price?: number;
  /** The url of the product image. */
  imageSrc?: string;
  /** The alternative text for the product image. */
  imageAlt?: string;
  /** The url for product details page. */
  productUrl?: string;
  /** The variants of this product. */
  variants?: ProductVariantsModel;
}

/**
 * The type that contains the collection of variants.
 */
export interface ProductVariantsModel {
  /** The type of variant rendered. */
  type: 'color' | 'image' | 'text';
  /** The list of variants. */
  items: ProductVariantModel[];
}

/**
 * The type of variant that is expected by the product variant component.
 */
export interface ProductVariantModel {
  /** The background color for the variant. Must be a valid css color. */
  color?: string;
  /** The url for the variant thumbnail. */
  image?: string;
  /** The label for the variant. */
  text: string;
  /** The product data specific to this variant. */
  product: ProductModel;
}
