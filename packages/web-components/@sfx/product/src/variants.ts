import { LitElement, customElement, property, html } from 'lit-element';
import { ProductVariantModel } from './index';
@customElement('sfx-product-variants')
export class ProductVariants extends LitElement {
  @property({ type: String }) type = '';
  @property({ type: Array }) items: ProductVariantModel[] = [];

  listVariants(variant: ProductVariantModel) {
    switch (this.type) {
      case 'color':
        return html`<li class="product-variant" style="background-color:${variant.color}" title="${variant.text}"></li>`;
      case 'image':
        return html`<li class="product-variant" style="background-image:${variant.image};background-color:${variant.color}" title="${variant.text}"></li>`;
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
        ${ this.items.map((v: ProductVariantModel) => this.listVariants(v)) }
      </ul>
    `;
  }
}
