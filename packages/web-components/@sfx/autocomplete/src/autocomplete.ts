import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';
import {
  AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
  HOVER_AUTOCOMPLETE_TERM_EVENT,
} from './events';

/**
 * Listens for the `sfx::autocomplete_received_results` event and
 * populates a list with the data received.
 */
@customElement('sfx-autocomplete')
export default class Autocomplete extends Base {
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

  // FIXME Move this to the Storybook tab once functionality has been merged into sfx-view.
  /*
   * --- TEMPORARY: setup for testing event listeners ---
   * Because Storybook is contained in an iframe, for testing purposes,
   * we are unable to dispatch events directly from the console.
   *
   * As an alternative - temporarily, we have a button to click to dispatch event.
   * Should be updated when/if functionality is avaiable via Storybook tab.
   *
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
   * Dispatches an `sfx::sayt_hover_autocomplete_term` event with the sayt autocomplete term.
   *
   * @param event A MouseEvent that contains a sayt autocomplete <li> elements text term.
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
        ? html`<h3 class="sfx-header">${this.caption}</h3>`
        : ''}
      ${this.results.map(
        list =>
          html`
            <sfx-list caption="${list.title}" .items="${list.items}"></sfx-list>
          `
      )}
    `;
  }
}
