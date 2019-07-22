import { LitElement, customElement, property, html } from 'lit-element';
import { ProductVariantModel } from './product';

// import Base from '@sfx/base';
import Base from '../../base';

@customElement('sfx-product-variants')
export default class ProductVariants extends Base {
  @property({ type: String }) type = 'text';
  @property({ type: Array }) items: ProductVariantModel[] = [];

  listVariant(variant: ProductVariantModel) {
    switch (this.type) {
      case 'color':
        return html`<li class="product-variant" style="background-color:${variant.color}" title="${variant.text}"></li>`;
      case 'image':
        return html`<li class="product-variant" style="background-image:${variant.image}; background-color:${variant.color}" title="${variant.text}"></li>`;
      case 'text':
      default:
        return html`<li class="product-variant">${variant.text}</li>`;
    }
  }

  render() {
    return html`
      <style>
        .product-variants {
          padding: 0;
          list-style: none;
        }
        .product-variants .product-variant {
          height: 15px;
          width: 15px;
          border-radius: 8px;
          margin: 4px;
          background-size: cover;
          display: inline-block;
        }
      </style>
      <ul class="product-variants">
        ${ this.items.map((v: ProductVariantModel) => this.listVariant(v)) }
      </ul>
    `;
  }
}
