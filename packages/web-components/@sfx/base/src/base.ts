import { LitElement, customElement, html } from 'lit-element';
import { makeSlot, createChildrenObserver } from './utils';

@customElement('sfx-base')
export default class Base extends LitElement {
  observer: any;

  constructor() {
    super();
    this.addSlots();
  }

  addSlots() {
    this.shadowRoot.appendChild(makeSlot('before'));
    this.shadowRoot.appendChild(makeSlot());
    this.shadowRoot.appendChild(makeSlot('after'));
  }

  connectedCallback() {
    super.connectedCallback();
    this.observer = createChildrenObserver(this);

    this.observer.observe(this, {
      childList: true,
    });
  }

  firstUpdate() {
    this.observer.disconnect();
  }

  createRenderRoot() {
    this.attachShadow({ mode: "open" });
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
