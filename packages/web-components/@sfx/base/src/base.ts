import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all SF-X components to extend. It is based on LitElement.
 */
export default class Base extends LitElement {
  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
