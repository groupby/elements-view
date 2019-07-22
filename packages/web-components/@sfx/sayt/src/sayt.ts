import { LitElement, customElement, html, property } from 'lit-element';
// import { Base } from '@sfx/base';
import '@sfx/autocomplete';

@customElement('sfx-sayt')
// TODO: look into the Base class so this class can extend it again. The
// issue that we're seeing is related to changing properties and having
// the DOM update accurately in response to those property changes.
export default class Sayt extends LitElement {
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;
  @property({ type: Boolean, reflect: true }) show = false;

  constructor() {
    super();

    this.eventCallback = this.eventCallback.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('sfx::sayt_show', this.eventCallback);
    window.addEventListener('sfx::sayt_hide', this.eventCallback);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('sfx::sayt_show', this.eventCallback);
    window.removeEventListener('sfx::sayt_hide', this.eventCallback);
  }

  // TODO: Remove createRenderRoot once Base class is extended.
  createRenderRoot() {
    return this;
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('show')) {
      this.hidden = !this.show;
    }
  }

  eventCallback(e: CustomEvent) {
    switch(e.type) {
      case 'sfx::sayt_show':
        this.show = true;
        break;
      case 'sfx::sayt_hide':
        this.show = false;
        break;
    }
  }

  render() {
    return html`
      ${
        this.hideAutocomplete ? '' : html`<sfx-autocomplete></sfx-autocomplete>`
      }
    `;
  }
}
