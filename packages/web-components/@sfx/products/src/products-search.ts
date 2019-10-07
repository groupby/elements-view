import { css, CSSResult, customElement } from 'lit-element';
import {
  SEARCH_RESPONSE,
  Product,
  SearchResponsePayload,
} from '@sfx/events';
import { ProductsBase } from '.';

/**
 * The `sfx-products` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
 *
 * This component updates upon receiving a [[SEARCH_RESPONSE]] event.
 */
@customElement('sfx-products')
export default class ProductsSearch extends ProductsBase {
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
    window.addEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromEvent(event: CustomEvent<SearchResponsePayload<Product>>): void {
    const eventGroup = event.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.products = event.detail.results.products || [];
    }
  }

  protected renderStyles(): CSSResult {
    return css`
      sfx-products {
        display: flex;
        flex-wrap: wrap;
      }

      sfx-products[hidden] {
        display: none;
      }
    `;
  }
}
