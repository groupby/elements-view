import { customElement, property, html, TemplateResult } from 'lit-element';
import Base from '../../base';

import './variants';

@customElement('sfx-product')
export default class Product extends Base {
  @property({ type: String, reflect: true }) display: 'full' | 'tile' = 'full';
  @property({ type: Object, reflect: true }) product: ProductModel | any = {};

  urlWrap(url: string, children: TemplateResult) {
    return url ? html`<a href="${ url }">${children}</a>` : html`${children}`;
  }

  productNodes() {
    const { product } = this;

    const properties = {
      name: '',
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
    const { name, price, variants, productUrl, imageSrc, imageAlt } = this.product;

    this.classList.add(this.display);

    return html`
      <slot name="image">
        ${ imageSrc ? html`<img src="${ imageSrc }" alt="${ imageAlt }" />`: '' }
      </slot>
      <slot name="variants">
        ${ variants ? 
          html`<sfx-product-variants type="${ variants.type }" .items="${ variants.items }"></sfx-product-variants>`
        : '' }
      </slot>
      <slot name="title">
        ${ this.urlWrap(productUrl, html`
          <h3>${ name }</h3>
        `) }
      </slot> 
      <slot name="price">
        <p>${ price }</p>
      </slot>
      ${ this.productNodes() }
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
  product: string;
}
