import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { Product } from '@sfx/events';

/**
 * The `sfx-products-base` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
 */
@customElement('sfx-products-base')
export default class ProductsBase extends LitElement {
  /**
   * The product data to be rendered.
   */
  @property({ type: Array }) products: Product[] = [];
  /**
   * The name of the event group that this component belongs to.
   * This component will dispatch events with this group in their
   * payloads and will only react to events that contain this group.
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

  /**
   * Returns styles to be included with the component. When the
   * [[render]] function is not being overridden, override this function
   * to include additional styles for this component.
   */
  protected renderStyles(): CSSResult {
    return css`
      sfx-products-base {
        display: flex;
        flex-wrap: wrap;
      }

      sfx-products-base[hidden] {
        display: none;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <style>
        sfx-product {
          display: block;
        }

        sfx-product[hidden] {
          display: none;
        }

        ${this.renderStyles()}
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
