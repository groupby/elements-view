import { customElement, html, property, LitElement } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';

// TODO: replace with @sfx/events import - added temporarily for import in storybook/common
export const AUTOCOMPLETE_RECEIVED_RESULTS_EVENT = 'sfx::autocomplete_received_results';
export const HOVER_AUTOCOMPLETE_TERM_EVENT = 'sfx::sayt_hover_autocomplete_term';
export const AUTOCOMPLETE_REQUEST_RESULTS = 'sfx::autocomplete_fetch_data';

/**
 * Listens for the `sfx::autocomplete_received_results` event and
 * populates a list with the data received.
 */
@customElement('sfx-autocomplete')
export default class Autocomplete extends LitElement {
  /**
   * Autocomplete request results.
   */
  @property({ type: Array }) results: any[] = [];
  /**
   * The text to use in the header.
   */
  @property({ type: String, reflect: true }) caption: string = '';

  /**
   * Constructs an instance of Autocomplete.
   * Binds receivedResults function to the class.
   */
  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
    this.handleHoverTerm = this.handleHoverTerm.bind(this);
  }

  /**
   * Sets up event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, this.receivedResults);
    window.addEventListener('mouseover', this.handleHoverTerm);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, this.receivedResults);
    window.removeEventListener('mouseover', this.handleHoverTerm);
  }

  /**
   * Saves the payload of the given event to `results`.
   *
   * @param e The event object.
   */
  receivedResults(e: CustomEvent) {
    this.results = e.detail.results || [];
  }

  /**
   * Dispatches an `sfx::sayt_hover_autocomplete_term` event with the Sayt autocomplete term.
   *
   * @param event A MouseEvent that contains a Sayt autocomplete term.
   */
  dispatchAutocompleteResults() {
    const autocompleteDataReceivedEvent = new CustomEvent(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, {
      detail: [
        { title: '', items: [{ label: 'Cars' }, { label: 'Bikes' }] },
        { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
      ],
      bubbles: true
    });
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }

  /**
   * Dispatches an `sfx::sayt_hover_autocomplete_term` event with the Sayt autocomplete term.
   *
   * @param event A MouseEvent that contains a Sayt autocomplete term.
   */
  handleHoverTerm(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'LI') return;
    const term = target.innerText;
    const sentEvent = new CustomEvent(HOVER_AUTOCOMPLETE_TERM_EVENT, {
      detail: {
        query: term,
      }
    });
    window.dispatchEvent(sentEvent);
  }

  /**
   * Renders results data in a list format using the `sfx-list` custom
   * element.
   */
  render() {
    return html`
      <style>
        sfx-autocomplete {
          display: block;
        }
        sfx-autocomplete[hidden] {
          display: none;
        }
      </style>
      ${this.caption && this.results.length > 0
        ? html`
            <h3 class="sfx-header">${this.caption}</h3>
          `
        : ''}
      ${this.results.map(
        list =>
          html`
            <sfx-list caption="${list.title}" .items="${list.items}"></sfx-list>
          `
      )}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
