import { LitElement, customElement, html } from 'lit-element';
import { makeSlot, createChildrenObserver } from './utils';

/**
 * A base component for all SF-X components to extend. It is based on LitElement.
 */
@customElement('sfx-base')
export default class Base extends LitElement {
  /**
   * MutationObserver created via createChildrenObserver function.
   * See [[createChildrenObserver]] for details. This function was
   * pulled directly from
   * github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
   */
  observer: MutationObserver;

  /**
   * Constructs an instance of the Base class and calls the [[addSlots]]
   * function.
   */
  constructor() {
    super();
    this.addSlots();
  }

  /**
   * Adds slots to the shadow dom.
   * See [[makeSlot]] for more details. This function was pulled
   * directly from
   * https://github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
   */
  addSlots() {
    this.shadowRoot.appendChild(makeSlot('before'));
    this.shadowRoot.appendChild(makeSlot());
    this.shadowRoot.appendChild(makeSlot('after'));
  }

  /**
   * Sets up a MutationObserver to listen on changes to this element's child list.
   */
  connectedCallback() {
    super.connectedCallback();
    this.observer = createChildrenObserver(this);

    this.observer.observe(this, { childList: true });
  }

  /**
   * Disconnects the MutationObserver.
   */
  firstUpdate() {
    this.observer.disconnect();
  }

  /**
   * Enables the use of the light dom with slots. A shadow dom is
   * attached to this element and the render root is set to the element
   * itself.
   */
  createRenderRoot() {
    this.attachShadow({ mode: 'open' });
    return this;
  }

  render() {
    return html`
      <div slot="before"></div>
      <div></div>
      <div slot="after"></div>
    `;
  }
}
