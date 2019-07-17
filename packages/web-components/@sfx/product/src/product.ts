import { customElement, property, html } from 'lit-element';
import Base from '../../base';

import './variants';

@customElement('sfx-product')
export default class Product extends Base {
  @property({ type: String }) display: 'full' | 'tile' = 'full';
  @property({ type: Object }) product: ProductModel = {};

  urlWrap(url, children) {
    return url ? html`<a href="${ url }">${children}</a>` : html`${children}`;
  }

  productNodes() {
    const { product } = this;

    const properties = Object.keys({
      name: '',
      price: 0,
      variants: { type: 'text', items: [] },
      productUrl: '',
      imageAlt: '',
      imageSrc: ''
    } as ProductModel);

    return Object.keys(product).filter(p => !properties.includes(p)).map(p => html`
      <span class="sfx-product-${p}">${product[p]}</span>
    `);
  }
  
  render() {
    const { name, price, variants, productUrl, imageSrc, imageAlt } = this.product;

    this.classList.add(this.display);

    return html`
      <slot name="image">
        ${ imageSrc ? html`<img src="${imageSrc}" alt="${imageAlt}" />`: '' }
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
  imageSrc?: String;
  imageAlt?: String;
  name?: String;
  price?: Number;
  productUrl?: String;
  variants?: ProductVariantsModel; 
}

export interface ProductVariantsModel {
  type: 'color' | 'image' | 'text';
  items: ProductVariantModel[];
}

export interface ProductVariantModel {
  color?: String;
  image?: String;
  label?: String;
  text: String;
  product: String;
}
