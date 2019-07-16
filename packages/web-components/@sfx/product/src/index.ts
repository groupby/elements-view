import { customElement, property, html } from 'lit-element';
import { BaseElement } from '../../base';

@customElement('sfx-product')
export class Product extends BaseElement {
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
    const { name, price, variants, productUrl } = this.product;

    this.classList.add(this.display);

    return html`
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

interface ProductVariantsModel {
  type: 'color' | 'image' | 'text';
  items: ProductVariantModel[];
}

interface ProductVariantModel {
  color?: String;
  image?: String;
  label?: String;
  text: String;
  product: String;
}
