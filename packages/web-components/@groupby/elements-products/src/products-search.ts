import { css, CSSResult, customElement } from 'lit-element';
import {
  SEARCH_RESPONSE,
  CacheResponsePayload,
  SearchResponsePayload,
  Product,
} from '@groupby/elements-events';
import { ProductsBase } from '.';

/**
 * The `gbe-products` web component wraps and renders a number of
 * `gbe-product` components. It wraps each `gbe-product` component in an
 * additional wrapper for flexibility.
 *
 * This component updates upon receiving a [[SEARCH_RESPONSE]] event.
 */
@customElement('gbe-products')
export default class ProductsSearch extends ProductsBase {
  /**
   * Binds relevant methods.
   */
  constructor() {
    super();

    this.setProductsFromProductsEvent = this.setProductsFromProductsEvent.bind(this);
    this.setProductsFromCacheEvent = this.setProductsFromCacheEvent.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(SEARCH_RESPONSE, this.setProductsFromProductsEvent);
    window.addEventListener(this.cacheResponseEventName, this.setProductsFromCacheEvent);
    this.requestInitialData(SEARCH_RESPONSE, this.group, this.cacheResponseEventName);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener(SEARCH_RESPONSE, this.setProductsFromProductsEvent);
    window.removeEventListener(this.cacheResponseEventName, this.setProductsFromCacheEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromProductsEvent(event: CustomEvent<SearchResponsePayload<Product>>): void {
    const eventGroup = event.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.products = event.detail.results.products || [];
    }
  }

  protected renderStyles(): CSSResult {
    return css`
      gbe-products {
        display: flex;
        flex-wrap: wrap;
      }

      gbe-products[hidden] {
        display: none;
      }
    `;
  }
}
