import { LitElement, customElement, html, property } from 'lit-element';
import { SEARCHBOX_EVENT, KEY_CODES } from './events';

/**
 * This entity is responsible for receiving user input and dispatching events
 * based on input.
 * The entity also listens for events, and updates data accordingly.
 */
@customElement('sfx-search-box')
export default class SearchBox extends LitElement {
  /**
   * Text used as placeholder in search box.
   */
  @property({ type: String })
  placeholder: string = 'Type your search';
  /**
   * Search term generated via user input.
   */
  @property({ type: String }) value: string = '';
  /**
   * Determines whether or not the search button is present.
   */
  @property({ type: Boolean, reflect: true })
  searchButton: boolean = false;
  /**
   * Determines whether or not the clear button is present.
   */
  @property({ type: Boolean, reflect: true })
  clearButton: boolean = false;

  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
  }

  /*
   * TODO To be removed with introduction of Base.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Adds event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER, this.updateText);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER, this.updateText);
  }

  /**
   * Dispatches a search request event with the `value` property or string passed in.
   * Invoked in response to user interactions: `enter` key or click on search button.
   */
  emitSearchEvent() {
    const searchboxRequestEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
      detail: this.value,
      bubbles: true
    });
    this.dispatchEvent(searchboxRequestEvent);
  }

  /**
   * Dispatches an autocomplete request event.
   * Invoked in response to user input: typed search term is greater than 3 characters.
   *
   * @param text A string of text inputed into input box.
   */
  emitAutocompleteRequestEvent(text: string) {
    const autocompleteRequestEvent = new CustomEvent(SEARCHBOX_EVENT.AUTOCOMPLETE_REQUEST, {
      detail: text,
      bubbles: true
    });
    window.dispatchEvent(autocompleteRequestEvent);
  }

  /**
   * Dispatches an event notifying that the input box has been cleared.
   * Invoked in response to user input: clear button, remove all text
   * using keypresses.
   */
  emitSearchBoxClearedEvent() {
    const searchboxClearedEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLEARED);
    window.dispatchEvent(searchboxClearedEvent);
  }

  /**
   * Updates the contents of the search input box with the payload of the given
   * event.
   * Invoked in response to an autocomplete hover event.
   *
   * @param e The event object.
   */
  updateText(e: CustomEvent) {
    this.getInputElement().value = e.detail;
    this.value = e.detail;
  }

  /**
   * Returns the searchbox input element
   */
  getInputElement(): HTMLInputElement {
    return this.querySelector('[data-sfx-ref=searchInput]') as HTMLInputElement;
  }

  /**
   * Dispatches an `sfx::on_search_box_change` event, and updates the value
   * property with the payload of the given event.
   *
   * Invoked in response to a change to the contents of the searchbox.
   *
   * @param e The KeyboardEvent object.
   */
  handleChange(e: KeyboardEvent) {
    this.updateValue((e.target as HTMLInputElement).value);
    this.dispatchEvent(
      new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CHANGE, {
        detail: (e.target as HTMLInputElement).value,
        bubbles: true
      })
    );
  }

  /**
   * Dispatches a `sfx::search_request` event with the payload of the given
   * event.
   *
   * Invoked in response to a keyup.
   *
   * @param e The KeyboardEvent object.
   */
  handleKeyup(e: KeyboardEvent) {
    console.log('in handleKeyup', e)
    if (e.code === 'Enter' && this.value.length > 0) {
      this.emitSearchEvent();
    }
  }

  /**
   * Updates the value property to the value passed to it.
   *
   * @param term The value pulled directly from the input box.
   */
  updateValue(term: string) {
    this.value = term;
  }

  /**
   * Sets value property and searchbox input value to an empty string.
   * Invoked in response to click on `clear` button, or removal of all text from input.
   */
  clearSearch() {
    this.getInputElement().value = '';
    this.value = '';
    this.emitSearchBoxClearedEvent();
  }

  /**
   * Dispatches an event notifying that the input bar has been clicked.
   * Invoked in response to a user clicking inside of the searchbox input.
   */
  clickExposed() {
    const searchBoxClickedEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLICK);
    window.dispatchEvent(searchBoxClickedEvent);
  }

  /**
   * Dispatches an event notifying that the input bar has been hovered.
   * Invoked in response to a user hovering inside of the searchbox input.
   */
  hoverExposed() {
    const searchBoxHoveredEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCHBOX_HOVER);
    window.dispatchEvent(searchBoxHoveredEvent);
  }

  // FIXME Move this to the Storybook tab once functionality has been merged into sfx-view.
  /*
   * --- TEMPORARY: setup for testing event listeners ---
   * Because Storybook is contained in an iframe, for testing purposes,
   * we are unable to dispatch events directly from the console.
   *
   * As an alternative - temporarily, we have a button to click to dispatch event.
   * Should be updated when/if functionality is avaiable via Storybook tab.
   * This event would be dispatched when a user hovers on autocomplete.
   */
  dispatchAutocompleteHover() {
    const autocompleteHover = new CustomEvent('sfx::autocomplete_hover', {
      detail: 'catfood',
      bubbles: true
    });
    window.dispatchEvent(autocompleteHover);
  }

  render() {
    return html`
    <input 
      type="text" 
      @mouseenter="${this.hoverExposed}" 
      @click="${this.clickExposed}" 
      data-sfx-ref="searchInput" 
      placeholder="${this.placeholder}" 
      @input="${this.handleChange}"
      @keyup="${this.handleKeyup}">
    </input>
    ${
      this.clearButton
        ? html`<button @click="${this.clearSearch}">Clear</button>`
        : ''
    }
    ${
      this.searchButton
        ? html`<button @click="${this.emitSearchEvent}">Search</button>`
        : ''
    }
      <button @click="${this.dispatchAutocompleteHover}">
        Click to dispatch autocomplete hover event
      </button>
    `;
  }
}
