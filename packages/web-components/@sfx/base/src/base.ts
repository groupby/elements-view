import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all SF-X components to extend. It is based on LitElement.
 */
export default class Base extends LitElement {
  constructor() {
    super();
    this.dispatchEvent = this.dispatchEvent.bind(this);
  }

  createRenderRoot(): Element {
    return this;
  }

  dispatchSfxEvent(eventName: string, payload?: any): void {
    const eventToDispatch = new CustomEvent(eventName, { detail: payload, bubbles: true });
    this.dispatchEvent(eventToDispatch);
  }
}
