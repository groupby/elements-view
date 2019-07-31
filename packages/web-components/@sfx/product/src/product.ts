import { customElement, property, html, TemplateResult } from 'lit-element';

import { Base } from '@sfx/base';
import { type } from 'os';

@customElement('sfx-product')
export default class Product extends Base {
  @property({ type: Object }) product: ProductModel = {};

  constructor() {
    super();
    this.updateVariant = this.updateVariant.bind(this);
  }

  firstUpdated() {
    if ( 'variants' in this.product ) {
      this.querySelectorAll('sfx-product-variant').forEach(variant => {
        variant.addEventListener('click', this.updateVariant);
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if ( 'variants' in this.product ) {
      this.querySelectorAll('sfx-product-variant').forEach(variant =>
        variant.removeEventListener('click', this.updateVariant)
      );
    }
  }

  updateVariant(e: Event) {
    const { srcElement = {} as any } = e;

    if ( 'variant' in srcElement ) {
      const { product = {} } = srcElement.variant;

      this.product = {
        ...this.product,
        ...product,
      };
    }
  }

  urlWrap(url: string, children: TemplateResult) {
    return url ? html`<a href="${ url }">${children}</a>` : children;
  }

  additionalInfo() {
    const { product } = this;

    const properties = {
      title: '',
      price: 0,
      variants: { type: 'text', items: [] },
      productUrl: '',
      imageAlt: '',
      imageSrc: ''
    } as ProductModel;

    return Object.keys(product).filter(p => !(p in properties)).map(p => html`
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
                html`<sfx-product-variant type="${variants.type}" .variant="${v}"></sfx-product-variant>`
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

export interface ProductModel {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  price?: number;
  productUrl?: string;
  variants?: ProductVariantsModel;
  [prop: string]: any;
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
