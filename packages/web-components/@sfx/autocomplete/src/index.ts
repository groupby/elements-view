import { LitElement, customElement, html, property } from 'lit-element';
import '@sfx/ui';

@customElement('sfx-autocomplete')
// export default class Autocomplete extends LitElement {
export class Autocomplete extends LitElement {
  @property({ type: Array, reflect: true }) results = [];

  /** @todo Put this in the base class */
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('autocomplete_received_results', this.receivedResults);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('autocomplete_received_results', this.receivedResults);
  }

  receivedResults(e) {
    this.results = e.detail;
  }

  render() {
    return html`${
      this.results.map(list => html`<sfx-list .title=${list.title === 'default' ? '' : list.title} .items=${list.items}></sfx-list>`)
    }`;
  }
}

