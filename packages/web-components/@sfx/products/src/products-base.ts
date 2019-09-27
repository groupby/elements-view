import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import {
  SAYT_PRODUCTS_RESPONSE,
  Product,
  SaytProductsResponsePayload,
} from '@sfx/events';

/**
 * The `sfx-products-base` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products-base')
export default class ProductsBase extends LitElement {
  @property({ type: Array }) products: Product[] = [];
  /**
   * The optional group name this will check in events.
   */
  @property({ type: String, reflect: true }) group: string = '';

  /**
   * Sets the ARIA role to `list` if one is not already specified.
   */
  connectedCallback() {
    super.connectedCallback();

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'list');
    }
  }

  render(): TemplateResult {
    return html`
      <style>
        sfx-products,
        sfx-products-base,
        sfx-products-sayt {
          display: flex;
          flex-wrap: wrap;
        }

        sfx-products-base[hidden] {
          display: none;
        }

        sfx-product {
          display: block;
        }

        sfx-product[hidden] {
          display: none;
        }
      </style>

      ${this.products.map(product => {
        return html`
          <div class="sfx-product-tile-wrapper" role="listitem">
            <sfx-product .product="${product}"></sfx-product>
          </div>
        `;
      })}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
