import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all GB Elements components to extend. It is based on LitElement.
 */
export default abstract class Base extends LitElement {
  createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  dispatchElementsEvent<T>(eventName: string, payload?: T): boolean {
    const eventToDispatch = new CustomEvent<T>(eventName, { detail: payload, bubbles: true });
    return this.dispatchEvent(eventToDispatch);
  }
}
