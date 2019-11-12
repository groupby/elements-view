import { css, CSSResult, customElement } from 'lit-element';
import {
  SEARCH_RESPONSE,
  Product,
  SearchResponsePayload,
  CACHE_REQUEST,
  CacheRequestPayload,
  CacheResponsePayload,
} from '@groupby/elements-events';
import * as shortid from 'shortid';
import { ProductsBase, getResponseEventName, requestCacheData } from '.';

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
   * A random string suitable for use in stable IDs related to this
   * component.
   */
  protected componentId = shortid.generate();

  /**
   * Binds relevant methods.
   */
  constructor() {
    super();
    // console.log('>> VIEW products search')
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
    this.setProductsFromCacheData = this.setProductsFromCacheData.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();
    const cacheResponseEventName = getResponseEventName(SEARCH_RESPONSE, this.componentId);
    console.log('>>> VIEW search cacheResponseEventName', cacheResponseEventName)
    window.addEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
    window.addEventListener(cacheResponseEventName, this.setProductsFromCacheData);
    const requestPayload = requestCacheData(SEARCH_RESPONSE, this.group, this.componentId, 'search-products');
    console.log('>>>VIEW search requestPayload', requestPayload)
    this.dispatchElementsEvent<CacheRequestPayload>(CACHE_REQUEST, requestPayload);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    const cacheResponseEventName = getResponseEventName('search-products', this.componentId);
    window.removeEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
    window.removeEventListener(cacheResponseEventName, this.setProductsFromCacheData);
  }

  /**
   * Receives an event for populating initial data.
   * Intended to be used on mount of this component.
   *
   * @param event The event object.
   */
  setProductsFromCacheData(event: CustomEvent<CacheResponsePayload & Product>): void {
    console.log('>>> VIEW search got cache event', event.detail);
    const eventGroup = event.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.products = event.detail.products || [];
    }
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
