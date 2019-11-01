import { css, CSSResult, customElement } from 'lit-element';
import {
  SAYT_PRODUCTS_RESPONSE,
  Product,
  SaytProductsResponsePayload,
} from '@elements/events';
import { ProductsBase } from '.';

/**
 * The `gbe-products-sayt` web component wraps and renders a number of
 * `gbe-product` components. It wraps each `gbe-product` component in an
 * additional wrapper for flexibility.
 *
 * This component updates upon receiving a [[SAYT_PRODUCTS_RESPONSE]] event.
 */
@customElement('gbe-products-sayt')
export default class ProductsSayt extends ProductsBase {
  /**
   * Binds relevant methods.
   */
  constructor() {
    super();

    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromEvent(event: CustomEvent<SaytProductsResponsePayload<Product>>): void {
    const eventGroup = event.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.products = event.detail.products || [];
    }
  }

  protected renderStyles(): CSSResult {
    return css`
      gbe-products-sayt {
        display: flex;
        flex-wrap: wrap;
      }

      gbe-products-sayt[hidden] {
        display: none;
      }
    `;
  }
}
