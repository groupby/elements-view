import { css, CSSResult, customElement } from 'lit-element';
import {
  SAYT_PRODUCTS_RESPONSE,
  Product,
  SaytProductsResponsePayload,
  CacheResponsePayload,
} from '@groupby/elements-events';
import * as shortid from 'shortid';
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
   * A random string suitable for use in stable IDs related to this
   * component.
   */
  protected componentId = shortid.generate();

  /**
  A string intended to be used as the name of the return event in
  * cache requests for this component.
  */
  protected cacheResponseEventName = this.getResponseEventName('products-sayt', this.componentId);

  /**
   * Binds relevant methods.
   */
  constructor() {
    super();
    this.setProductsFromEvent = this.setProductsFromEvent.bind(this);
    this.setProductsFromCacheEvent = this.setProductsFromCacheEvent.bind(this);
  }

  /**
   * Registers event listeners. Additionally requests initial data to populate
   * this component if cached data exists.
   */
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
    window.addEventListener(this.cacheResponseEventName, this.setProductsFromCacheEvent);
    this.requestInitialData(SAYT_PRODUCTS_RESPONSE, this.group, this.cacheResponseEventName);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(SAYT_PRODUCTS_RESPONSE, this.setProductsFromEvent);
    window.removeEventListener(this.cacheResponseEventName, this.setProductsFromCacheEvent);
  }

  /**
   * Receives an event for populating initial data.
   * Intended to be used on mount of this component.
   *
   * @param event The event object.
   */
  setProductsFromCacheEvent(event: CustomEvent<CacheResponsePayload>): void {
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
