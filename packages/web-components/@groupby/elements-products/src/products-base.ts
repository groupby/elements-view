import {
  css,
  CSSResult,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import {
  CACHE_REQUEST,
  CACHE_RESPONSE_PREFIX,
  CacheRequestPayload,
  CacheResponsePayload,
  Product,
} from '@groupby/elements-events';
import * as shortid from 'shortid';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { Base, dataInitializer } from '@groupby/elements-base';

/**
 * The `gbe-products-base` web component wraps and renders a number of
 * `gbe-product` components. It wraps each `gbe-product` component in an
 * additional wrapper for flexibility.
 */
@customElement('gbe-products-base')
export default class ProductsBase extends Base {
  /**
   * The product data to be rendered.
   */
  @dataInitializer('_initialize')
  @property({ type: Array })
  products: Product[] = [];

  /**
   * The name of the event group that this component belongs to.
   * This component will dispatch events with this group in their
   * payloads and will only react to events that contain this group.
   */
  @property({ type: String, reflect: true }) group: string = '';

  /**
   * A random string suitable for use in stable IDs related to a
   * component.
   */
  protected componentId = shortid.generate();

  /**
   * Sets the ARIA role to `list` if one is not already specified.
   */
  connectedCallback(): void {
    super.connectedCallback();

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'list');
    }
  }

  /**
   * Requests initial data for the component.
   *
   * @param name The name of the initial cached data to return.
   * @param group The name of the event group that the component belongs to.
   * @param returnEvent The name of the event under which to dispatch the cached data.
   */
  requestInitialData(name: string, group: string, returnEvent: string): void {
    const payload: CacheRequestPayload = { name, group, returnEvent };
    this.dispatchElementsEvent<CacheRequestPayload>(CACHE_REQUEST, payload);
  }

  /**
   * Receives an event for populating initial product data.
   *
   * @param event The event object.
   */
  setProductsFromCacheEvent(event: CustomEvent<CacheResponsePayload>): void {
    const data = event.detail.data || {};
    this.products = data.products || [];
  }

  /**
   * Generates a string intended to be used as the name of the return event in
   * cache requests for the component.
   */
  get cacheResponseEventName(): string {
    return `${CACHE_RESPONSE_PREFIX}${this.tagName}-${this.componentId}`;
  }

  /**
   * Returns styles to be included with the component. When the
   * [[render]] function is not being overridden, override this function
   * to include additional styles for this component.
   */
  protected renderStyles(): CSSResult {
    return css`
      gbe-products-base {
        display: flex;
        flex-wrap: wrap;
      }

      gbe-products-base[hidden] {
        display: none;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <style>
        gbe-product {
          display: block;
        }

        gbe-product[hidden] {
          display: none;
        }

        ${this.renderStyles()}
      </style>

      ${this.products.map((product) => html`
          <div class="gbe-product-tile-wrapper" role="listitem">
            <gbe-product .product="${product}"></gbe-product>
          </div>
        `)}
    `;
  }
}
