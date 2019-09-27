import { customElement } from 'lit-element';
import {
  SEARCH_RESPONSE,
  SearchResponsePayload,
} from '@sfx/events';
import { ProductsBase } from '.';

/**
 * The `sfx-products` web component wraps and renders a number of
 * `sfx-product` components. It wraps each `sfx-product` component in an
 * additional wrapper for flexibility.
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
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SEARCH_RESPONSE, this.setProductsFromEvent);
  }

  /**
   * Sets the `products` property from the products in an event.
   *
   * @param event An event containing a search result with product data.
   */
  setProductsFromEvent(event: CustomEvent<SearchResponsePayload>) {
    const eventGroup = event.detail.group || '';
    if (eventGroup === this.group) {
      this.products = event.detail.results.records || [];
    }
  }
}
