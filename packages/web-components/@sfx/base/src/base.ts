import { LitElement, customElement, html } from 'lit-element';
import { makeSlot, createChildrenObserver } from './utils';

/**
 * Extends LitElement and all components extend it.
 */
@customElement('sfx-base')
export default class Base extends LitElement {
  /**
   * MutationObserver created via createChildrenObserver function.
   * See [[createChildrenObserver]] for details. This function was pulled directly from
   * https://github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
   */
  observer: MutationObserver;

  /**
   * Constructs an instance of the Base class and calls the addSlots function.
   */
  constructor() {
    super();
    this.addSlots();
  }

  /**
   * Adds slotted elements into the shadow dom.
   * See [[makeSlot]] for more details. This function was pulled directly from
   * https://github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
   */
  addSlots() {
    this.shadowRoot.appendChild(makeSlot('before'));
    this.shadowRoot.appendChild(makeSlot());
    this.shadowRoot.appendChild(makeSlot('after'));
  }

  /**
   * Sets up the MutationObserver to begin receiving notifications.
   */
  connectedCallback() {
    super.connectedCallback();
    this.observer = createChildrenObserver(this);

    /**
     * Configures the MutationObserver to watch for changes on the children of the
     * defined Node.
     *
     * @param this The Node to watch for changes.
     */
    this.observer.observe(this, { childList: true });
  }

  /**
   * Disconnects the MutationObserver.
   */
  firstUpdate() {
    this.observer.disconnect();
  }

  /**
   * Attaches shadow root to the Node, and sets the render root to the Node itself.
   * Enables use of the light dom.
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
