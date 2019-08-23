import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';

// TODO: replace with @sfx/events import - added temporarily for import in storybook/common
export const AUTOCOMPLETE_RECEIVED_RESULTS_EVENT = 'sfx::autocomplete_received_results';

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
    this.results = e.detail.results;
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
}
