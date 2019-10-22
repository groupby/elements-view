import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all SF-X components to extend. It is based on LitElement.
 */
export default abstract class Base extends LitElement {
  createRenderRoot(): Element {
    return this;
  }

  dispatchSfxEvent<T>(eventName: string, payload?: T): void {
    const eventToDispatch = new CustomEvent<T>(eventName, { detail: payload, bubbles: true });
    this.dispatchEvent(eventToDispatch);
  }
}
