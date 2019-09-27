import { customElement, html, property, LitElement } from 'lit-element';
import {
  AUTOCOMPLETE_RESPONSE,
  AUTOCOMPLETE_ACTIVE_TERM,
  AutocompleteResponsePayload,
  AutocompleteActiveTermPayload,
} from '@sfx/events';

/**
 * The `sfx-autocomplete` component is responsible for displaying a list
 * of autocomplete terms upon receipt of the [[AUTOCOMPLETE_RESPONSE]] event.
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
  }

  /**
   * Sets up event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
  }

  /**
   * Saves the payload of the given event to `results`.
   *
   * @param e The event object.
   */
  receivedResults(e: CustomEvent<AutocompleteResponsePayload>) {
    this.results = e.detail.results || [];
  }

  /**
   * Dispatches an [[AUTOCOMPLETE_ACTIVE_TERM]] event with the Sayt autocomplete term.
   *
   * @param event An event that contains a Sayt autocomplete term.
   */
  handleHoverTerm(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'li') return;
    const term = target.innerText;
    const sentEvent = new CustomEvent<AutocompleteActiveTermPayload>(AUTOCOMPLETE_ACTIVE_TERM, {
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
