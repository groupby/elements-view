import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from './events';

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
  }

  /**
   * Sets up event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
      this.receivedResults
    );
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      AUTOCOMPLETE_RECEIVED_RESULTS_EVENT,
      this.receivedResults
    );
  }

  /**
   * Saves the payload of the given event to `results`.
   *
   * @param e The event object.
   */
  receivedResults(e: CustomEvent) {
    this.results = e.detail;
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
    const autocompleteDataReceivedEvent = new CustomEvent(
      'sfx::autocomplete_received_results',
      {
        detail: [
          { title: 'Brands', items: [{ label: 'Cats' }, { label: 'Dogs' }] },
          { title: '', items: [{ label: 'Cars' }, { label: 'Bikes' }] }
        ],
        bubbles: true
      }
    );
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }

  /**
   * Renders results data in a list format using the `sfx-list` custom
   * element.
   */
  render() {
    return html`
      ${this.caption && this.results.length > 0
        ? html`
            <h3>${this.caption}</h3>
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
}
