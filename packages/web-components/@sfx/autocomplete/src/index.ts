import { LitElement, customElement, html, property } from 'lit-element';
import '@sfx/ui';

@customElement('sfx-autocomplete')
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
    this.addEventListener('autocomplete_received_results', this.receivedResults);
    // works if you dispatch event on the component itself
    // also works if you add the event listener on the window yourself
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('in disconnected callback')
    window.removeEventListener('autocomplete_received_results', this.receivedResults);
  }

  receivedResults(data) {
    console.log('DATA::: in received results', data.detail);
    console.log('type of DATA::: in received results', typeof data);
    this.results = data.detail;
  }

  render() {
    return html`${
      this.results.map(list => html`<sfx-list .title=${list.title === 'default' ? '' : list.title} .items=${list.items}></sfx-list>`)
    }`;
  }
}

