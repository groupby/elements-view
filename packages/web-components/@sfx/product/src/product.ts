import { customElement, property, html, TemplateResult } from 'lit-element';

import { Base } from '@sfx/base';

@customElement('sfx-product')
export default class Product extends Base {
  @property({ type: Object }) product: ProductModel = {};

  constructor() {
    super();
    this.updateVariant = this.updateVariant.bind(this);
  }

  updateVariant(variant: ProductVariantModel) {
    return () => {
      this.product = {
        ...this.product,
        ...variant.product,
      };
    };
  }

  urlWrap(url: string, children: TemplateResult) {
    return url ? html`<a href="${ url }">${children}</a>` : children;
  }

  additionalInfo() {
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
      <span class="sfx-product-${ p }">${ product[p] }</span>
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

export interface ProductModel extends Record<string, any>{
  title?: string;
  price?: number;
  imageSrc?: string;
  imageAlt?: string;
  productUrl?: string;
  variants?: ProductVariantsModel;
}

export interface ProductVariantsModel {
  type: 'color' | 'image' | 'text';
  items: ProductVariantModel[];
}

export interface ProductVariantModel {
  color?: string;
  image?: string;
  text: string;
  product: ProductModel;
}
