import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all SF-X components to extend. It is based on LitElement.
 */
export default abstract class Base extends LitElement {
  constructor() {
    super();
    this.dispatchSfxEvent = this.dispatchEvent.bind(this);
  }

  createRenderRoot(): Element {
    return this;
  }

  dispatchSfxEvent<T>(eventName: string, payload?: T): void {
    console.log('in dispatch event in base class')
    const eventToDispatch = new CustomEvent<T>(eventName, { detail: payload, bubbles: true });
    this.dispatchEvent(eventToDispatch);
  }
}
