import { LitElement, customElement, html, property } from 'lit-element';
// import { Base } from '@sfx/base';
import '@sfx/autocomplete';

@customElement('sfx-sayt')
export default class Sayt extends LitElement {
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;

  constructor() {
    super();

    this.eventCallback = this.eventCallback.bind(this);
  }

  connectedCallback() {
    // TODO: look into the Base class so this class can extend it again.
    // super.connectedCallback();

    window.addEventListener('sayt_show', this.eventCallback);
    window.addEventListener('sayt_hide', this.eventCallback);
  }

  disconnectedCallback() {
    // TODO: look into the Base class so this class can extend it again.
    // super.disconnectedCallback();

    window.removeEventListener('sayt_show', this.eventCallback);
    window.removeEventListener('sayt_hide', this.eventCallback);
  }

  // TODO: Remove createRenderRoot once Base class is extended.
  createRenderRoot() {
    return this;
  }

  eventCallback(e) {
    console.log('logging out the event', e);
  }

  render() {
    return html`
      ${
       this.hideAutocomplete ? html`<h2>Test</h2>` : html`<sfx-autocomplete></sfx-autocomplete>`
      }
    `;
  }

}
