import { customElement, html, property } from 'lit-element';
import '@sfx/ui';
import { Base } from '@sfx/base';

/**
 * The autocomplete component is responsible for listening for the sfx::autocomplete_received_results event.
 * Upon receipt of the event, the component populates a list with the data received.
 */

const autococompleteReceivedResults = 'sfx::autocomplete_received_results'

@customElement('sfx-autocomplete')
export default class Autocomplete extends Base {
  // FIXME Type properly
/**
 * results property. This array is populated with data received from the autocomplete event.
 * Once populated, it is iterated over to display the data in a user digestible format.
 */
  @property({ type: Array }) results:  any[] = [];
/**
 * optionalTitle property. This string is populated by the consumer of the custom element. If an optional title is provided,
 * it will be used to populate an h3 when there are autcomplete results to display. The h3 is used to title the list.
 */
  @property({ type: String, reflect: true }) optionalTitle: string = '';

/**
 * Constructs an instance of Autocomplete. 
 * It binds the receivedResults function.. 
 */
  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
  }

/**
 * The connectedCallback fires each time a custom element is appended into a document-connected element. 
 * MDN documentation: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
 * The Autocomplete connectedCallback calls the connected callback of the Base class.
 *  
 */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(autococompleteReceivedResults, this.receivedResults);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(autococompleteReceivedResults, this.receivedResults);
  }

  /**
   * Invoked in response to the 'sfx::autocomplete_received_results' event.
   * Updates the results property with the data received from the custom event.
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
   * As an alternative - temporary, we have a button to click to dispatch event.
   * Should be updated when/if functionality is avaiable via Storybook tab.
   * 
   */
  dispatchAutocompleteResults() {
    const autocompleteDataReceivedEvent = new CustomEvent('sfx::autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"","items":[{"label":"Cars"},{"label":"Bikes"}]}],
    bubbles: true });
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }

  /**
   * Uses lit-html to render the element template. 
   * 
   * see [[Autocomplete.... how to link to property? for optionTitle details
   * 
   * Passes the results data to the sfx-list custom element, and renders.
   */
  render() {
    return html`${this.optionalTitle && this.results.length > 0 ? html`<h3>${this.optionalTitle}</h3>` : ''}
      ${
      this.results.map(list => html`<sfx-list .title="${list.title}" .items="${list.items}"></sfx-list>`)
      }
      <button @click=${this.dispatchAutocompleteResults}>Click to dispatch event</button>`;
    }
  }
