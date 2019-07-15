import { LitElement, customElement, html, property } from 'lit-element';
// import { Base } from '@sfx/base';
import '@sfx/autocomplete';

@customElement('sfx-sayt')
export default class Sayt extends LitElement {
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${
       this.hideAutocomplete ? html`<h2>Test</h2>` : html`<sfx-autocomplete></sfx-autocomplete>`
      }
    `;
  }

}
