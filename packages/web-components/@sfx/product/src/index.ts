import { LitElement, customElement, property, html } from 'lit-element';

@customElement('sfx-product')
export class Product extends LitElement {
  @property({ type: Object }) product: ProductModel = {};

  urlWrap(url, children) {
    return url ? html`<a href="${ url }">${children}</a>` : html`${children}`;
  }

  createRenderRoot() {
    return this;
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

    return html`
      <slot name="title">
        ${ this.urlWrap(productUrl, html`
          <h3>${ name }</h3>
        `) }
      </slot> 
      <slot name="one"></slot>
      <slot name="price"></slot>
      <p>${ price }</p>
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
