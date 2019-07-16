import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';

const autococompleteReceivedResults = 'sfx::autocomplete_received_results'
@customElement('sfx-autocomplete')
export default class Autocomplete extends Base {
  // FIXME Type properly
  @property({ type: Array }) results:  any[] = [];
  @property({ type: String, reflect: true }) optionalTitle: string = '';

  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(autococompleteReceivedResults, this.receivedResults);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(autococompleteReceivedResults, this.receivedResults);
  }

  receivedResults(e: CustomEvent) {
    this.results = e.detail;
  }

  /*
   * --- setup for testing event listeners ---
   * Because Storybook is contained in an iframe, for testing purposes, 
   * we are unable to dispatch events directly from the console.
   * 
   * As an alternative - temporary, we have a button to click to dispatch event.
   * Should be updated when/if functionality is avaiable via Storybook tab.
   * 
   */
  dispatchAutocompleteResults() {
    const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"","items":[{"label":"Cars"},{"label":"Bikes"}]}],
    bubbles: true });
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }

  render() {
    return html`${this.optionalTitle ? html`<h3>${this.optionalTitle}</h3>` : ''}
      ${
      this.results.map(list => html`<sfx-list .title="${list.title}" .items="${list.items}"></sfx-list>`)
      }
      <button @click=${this.dispatchAutocompleteResults}>Click to dispatch event</button>`;
    }
  }
