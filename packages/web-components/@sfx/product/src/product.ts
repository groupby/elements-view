import { customElement, property, html, TemplateResult } from 'lit-element';

import { Base } from '@sfx/base';

@customElement('sfx-product')
export default class Product extends Base {
  @property({ type: Object }) product: ProductModel | any = {};

  constructor() {
    super();
    this.updateVariant = this.updateVariant.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('change_product_variant', this.updateVariant);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('change_product_variant', this.updateVariant);
  }

  updateVariant(e: CustomEvent) {
    const product = e.detail;

    this.product = {
      ...this.product,
      ...product
    };
  }
  
  urlWrap(url: string, children: TemplateResult) {
    return url ? html`<a href="${ url }">${children}</a>` : html`${children}`;
  }

  additionalInfo() {
    const { product } = this;

    const properties: ProductModel = {
      name: '',
      price: 0,
      variants: { type: 'text', items: [] },
      productUrl: '',
      imageAlt: '',
      imageSrc: ''
    };

    return Object.keys(product).filter(p => !(p in properties)).map(p => html`
      <span class="sfx-product-${ p }">${ product[p] }</span>
    `);
  }
  
  render() {
    const { name, price, variants, productUrl, imageSrc, imageAlt } = this.product;

    return html`
      <slot name="image">
        ${ imageSrc ? html`<img src="${ imageSrc }" alt="${ imageAlt }" />`: '' }
      </slot>
      <slot name="variants">
        <ul>
          ${
            variants ? 
              variants.items.map((v: ProductVariantModel) => html`<sfx-product-variant type="${variants.type}" .variant="${v}"></sfx-product-variant>`)
            : ''
          }
        </ul>
      </slot>
      <slot name="title">
        ${ this.urlWrap(productUrl, html`
          <h3>${ name }</h3>
        `) }
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
  name?: string;
  price?: number;
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
  label?: string;
  text: string;
  product: Partial<ProductModel>;
}
