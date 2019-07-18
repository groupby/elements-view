import { LitElement, customElement, html, property } from 'lit-element';
import { SEARCHBOX_EVENT } from './utils';

@customElement('sfx-search-box')
/**
 * This entity is responsible for receiving user input and dispatching events
 * based on input.
 * The entity also listens for events, and updates data accordingly.
 */
export default class SearchBox extends LitElement {
  /**
   * Text used as placeholder in search box.
   */
  @property({ type: String, reflect: true })
  placeholderText = 'Type your search';
  /**
   * Search term generated via user input.
   */
  @property({ type: String, reflect: true }) searchTerm = '';
  /**
   * Boolean to determine whether or not to display search button.
   */
  @property({ type: Boolean, reflect: true })
  searchButton = false;
  /**
   * Boolean to determine whether or not to display clear button.
   */
  @property({ type: Boolean, reflect: true })
  clearButton = false;

  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Adds event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
      this.updateText
    );
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      SEARCHBOX_EVENT.AUTOCOMPLETE_HOVER,
      this.updateText
    );
  }

  /**
   * Dispatches a search request event with the `searchTerm` property or string passed in.
   * Invoked in response to user interactions: `enter` key or click on search button.
   */
  emitSearchEvent(query?: String) {
    const term = query && typeof query === 'string' ? query : this.searchTerm;
    // const searchRequestEvent = new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
    //   detail: term,
    //   bubbles: true
    // });
    window.dispatchEvent(
      new CustomEvent(SEARCHBOX_EVENT.SEARCH_REQUEST, {
        detail: term,
        bubbles: true
      })
    );
    // window.dispatchEvent(searchRequestEvent);
  }

  /**
   * Dispatches an autocomplete request event.
   * Invoked in response to user input: typed search term is greater than 3 characters.
   *
   * @param letters A string of letters inputed into input box.
   */
  emitAutocompleteRequestEvent(letters: String) {
    const autocompleteRequestEvent = new CustomEvent(
      SEARCHBOX_EVENT.AUTOCOMPLETE_REQUEST,
      { detail: letters, bubbles: true }
    );
    window.dispatchEvent(autocompleteRequestEvent);
  }

  /**
   * Dispatches an event notifying that the input box has been cleared.
   * Invoked in response to user input: clear button, remove all letters
   * using keypresses.
   *
   * @param letters A string of letters inputed into input box.
   */
  emitSearchBoxClearedEvent() {
    const searchboxClearedEvent = new CustomEvent(
      SEARCHBOX_EVENT.SEARCHBOX_CLEARED
    );
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
    this.searchTerm = e.detail;
    let el = (<HTMLInputElement>this.querySelector('#searchInput')).value;
    el = e.detail;
  }

  /**
   * Receives user input from searchbox and calls appropriate function based
   * on the input value.
   *
   * ***should details be included? as to the specific responses to specific key presses?***
   *
   * Invoked in response to a keyup.
   *
   * @param e The event object.
   */
  handleKeypress(e: KeyboardEvent) {
    console.log('type', e.type)
    if (e.keyCode === 8) {
      if (this.searchTerm.length === 1) {
        this.emitSearchBoxClearedEvent();
      }
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.length - 1);
    } else if (e.keyCode === 13) {
      this.emitSearchEvent(this.searchTerm);
    } else {
      this.searchTerm = (<HTMLInputElement>(
        this.querySelector('#searchInput')
      )).value;
      if (this.searchTerm.length > 3) {
        this.emitAutocompleteRequestEvent(this.searchTerm);
      }
    }
  }

  /**
   * Sets searchTerm property and searchbox input value to an empty string.
   * Invoked in response to click on `clear` button, or removal of all text from input.
   */
  clearSearch() {
    this.searchTerm = '';
    let inputValue = ((<HTMLInputElement>(
      this.querySelector('#searchInput')
    )).value = '');
    this.emitSearchBoxClearedEvent();
  }

  /**
   * Dispatches an event notifying that the input bar has been clicked.
   * Invoked in response to a user clicking inside of the searchbox input.
   */
  clickExposed() {
    const searchBoxClickedEvent = new CustomEvent(
      SEARCHBOX_EVENT.SEARCHBOX_CLICK
    );
    window.dispatchEvent(searchBoxClickedEvent);
  }

  /**
   * Dispatches an event notifying that the input bar has been hovered.
   * Invoked in response to a user hovering inside of the searchbox input.
   */
  hoverExposed() {
    const searchBoxHoveredEvent = new CustomEvent(
      SEARCHBOX_EVENT.SEARCHBOX_HOVER
    );
    window.dispatchEvent(searchBoxHoveredEvent);
  }

  render() {
    return html`
    <input type="text" @mouseenter="${this.hoverExposed}" @click="${
      this.clickExposed
    }" id="searchInput" placeholder=${this.placeholderText} @keyup="${
      this.handleKeypress
    }"></input>
    ${
      this.clearButton
        ? html`
            <button class="btn_clear" @click=${this.clearSearch}>Clear</button>
          `
        : ''
    }
    ${
      this.searchButton
        ? html`
            <button class="btn_search" @click=${this.emitSearchEvent}>
              Search
            </button>
          `
        : ''
    }
    `;
  }
}
