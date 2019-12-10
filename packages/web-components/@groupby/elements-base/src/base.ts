import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all GB Elements components to extend. It is based on LitElement.
 */
export default abstract class Base extends LitElement {
  /**
   * Determines whether or not the component has received its initial set of data.
   */
  protected _initialized: boolean = false;

  createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  dispatchElementsEvent<T>(eventName: string, payload?: T): boolean {
    const eventToDispatch = new CustomEvent<T>(eventName, { detail: payload, bubbles: true });
    return this.dispatchEvent(eventToDispatch);
  }
}
