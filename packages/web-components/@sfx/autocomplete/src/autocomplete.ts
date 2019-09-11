import { customElement, html, property, LitElement } from 'lit-element';
import '@sfx/ui';

// TODO: replace with @sfx/events import - added temporarily for import in storybook/common
// event descriptions to be contained in events repo
export const AUTOCOMPLETE_RECEIVED_RESULTS_EVENT = 'sfx::autocomplete_received_results';
export const HOVER_AUTOCOMPLETE_TERM_EVENT = 'sfx::sayt_hover_autocomplete_term';
export const AUTOCOMPLETE_REQUEST_RESULTS = 'sfx::autocomplete_fetch_data';

/**
 * The `sfx-autocomplete` component is responsible for displaying a list
 * of autocomplete terms upon receipt of the `sfx::autocomplete_received_results` event.
 * The component is also responsible for emitting events based on user input.
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
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, this.receivedResults);
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
   * @param event An event that contains a Sayt autocomplete term.
   */
  handleHoverTerm(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'li') return;
    const term = target.innerText;
    const sentEvent = new CustomEvent(HOVER_AUTOCOMPLETE_TERM_EVENT, {
      detail: {
        query: term,
      },
      bubbles: true,
    });
    this.dispatchEvent(sentEvent);
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
            <sfx-list caption="${list.title}" .items="${list.items}" @mouseover="${this.handleHoverTerm}"></sfx-list>
          `
      )}
    `;
  }

  createRenderRoot() {
    return this;
  }
}
