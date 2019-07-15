import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';

@customElement('sfx-autocomplete')
export default class Autocomplete extends Base {
  @property({ type: Array, reflect: true }) results = [];
  @property({ type: String, reflect: true, attribute: 'optional-title' }) optionalTitle = '';

  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('sfx::autocomplete_received_results', this.receivedResults);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('sfx::autocomplete_received_results', this.receivedResults);
  }

  receivedResults(e: CustomEvent) {
    this.results = e.detail;
  }

  render() {
    return html`${this.optionalTitle ? html`<h3>${this.optionalTitle}</h3>` : ''}
    ${
      this.results.map(list => html`<sfx-list .title=${list.title === 'default' ? '' : list.title} .items=${list.items}></sfx-list>`)
      }`;
    }
  }
