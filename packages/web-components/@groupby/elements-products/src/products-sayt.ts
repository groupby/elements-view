import { css, CSSResult, customElement } from 'lit-element';
import {
  SAYT_PRODUCTS_RESPONSE,
  Product,
  SaytProductsResponsePayload,
  CACHE_REQUEST,
  CacheRequestPayload,
  CacheResponsePayload,
} from '@groupby/elements-events';
import * as shortid from 'shortid';
import { ProductsBase, getResponseEventName } from '.';

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
   * A random string suitable for use in stable IDs related to this
   * component.
   */
  protected componentId = shortid.generate();

  /**
   * Binds relevant methods.
   */
  constructor() {
    super();
    console.log('>>> yo products sayt');
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
    this.setProductsFromCacheData = this.setProductsFromCacheData.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();
    const cacheResponseEventName = getResponseEventName('products-sayt', this.componentId);
    console.log(cacheResponseEventName, 'cacheResponseEventName');
    window.addEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
    window.addEventListener(cacheResponseEventName, this.setProductsFromCacheData);
    this.requestInitialData();
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    const cacheResponseEventName = getResponseEventName('products-sayt', this.componentId);
    window.removeEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
    window.removeEventListener(cacheResponseEventName, this.setProductsFromCacheData);
  }

  requestInitialData(): void {
    const cacheResponseEventName = getResponseEventName('products-sayt', this.componentId);
    const payload: CacheRequestPayload = {
      name: SAYT_PRODUCTS_RESPONSE,
      group: this.group,
      returnEvent: cacheResponseEventName,
    };
    this.dispatchElementsEvent<CacheRequestPayload>(CACHE_REQUEST, payload);
  }


  /**
   * Receives an event for populating initial data.
   * Intended to be used on mount of this component.
   *
   * @param event The event object.
   */
  setProductsFromCacheData(event: CustomEvent<CacheResponsePayload>): void {
    console.log('in set productsFromCache products-sayt - event', event);
    // would this only have a data property on detail? vs. group, results etc. yes
    const data = event.detail.data || {};
    this.products = data.products || [];
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
