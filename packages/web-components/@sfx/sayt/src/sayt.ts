import { LitElement, customElement, html, property } from 'lit-element';
// import { Base } from '@sfx/base';
import '@sfx/autocomplete';

@customElement('sfx-sayt')
// TODO: look into the Base class so this class can extend it again. The
// issue that we're seeing is related to changing properties and having
// the DOM update accurately in response to those property changes.
export default class Sayt extends LitElement {
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;
  @property({ type: Boolean, reflect: true }) hideSayt = true;

  constructor() {
    super();

    this.eventCallback = this.eventCallback.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('sayt_show', this.eventCallback);
    window.addEventListener('sayt_hide', this.eventCallback);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('sayt_show', this.eventCallback);
    window.removeEventListener('sayt_hide', this.eventCallback);
  }

  // TODO: Remove createRenderRoot once Base class is extended.
  createRenderRoot() {
    return this;
  }

  eventCallback(e: any) {
    switch(e.type) {
      case 'sayt_show':
        console.log('SAYT SHOULD BE SHOWING!');
        this.hideSayt = false;
        break;
      case 'sayt_hide':
        console.log('SAYT SHOULD BE HIDING!');
        this.hideSayt = true;
        break;
    }
  }

  render() {
    return html`
      ${
        this.hideSayt ? html`<p>sayt is not visible</p>` 
        : html`
          <div class="sayt-wrapper">
            <h1>This is the Sayt Wrapper</h1>
            ${
              this.hideAutocomplete ? html`` : html`<sfx-autocomplete></sfx-autocomplete>`
            }
          </div>
        `
      }
    `;
  }
}
