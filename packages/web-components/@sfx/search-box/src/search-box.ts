import { customElement, html, property, PropertyValues } from 'lit-element';
import { Base } from '@sfx/base';
import { SEARCHBOX_EVENT } from './events';

/**
 * This entity is responsible for receiving user input and dispatching events
 * based on input.
 * The entity also listens for events, and updates data accordingly.
 */
@customElement('sfx-search-box')
export default class SearchBox extends Base {
  /**
   * Text used as placeholder in search box.
   */
  @property({ type: String }) placeholder: string = 'Type your search';
  /**
   * Search term generated via user input.
   */
  @property({ type: String }) value: string = '';
  /**
   * Determines whether or not the search button is present.
   */
  @property({ type: Boolean, reflect: true }) searchButton: boolean = false;
  /**
   * Determines whether or not the clear button is present.
   */
  @property({ type: Boolean, reflect: true }) clearButton: boolean = false;
  /**
   * Determines the area used for search.
   */
  @property({ type: String, reflect: true }) area: string = '';
  /**
   * Determines the collection used for search.
   */
  @property({ type: String, reflect: true }) collection: string = '';

  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
  }

  /**
   * Adds event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(SEARCHBOX_EVENT.UPDATE_SEARCH_TERM, this.updateText);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(SEARCHBOX_EVENT.UPDATE_SEARCH_TERM, this.updateText);
  }

  /**
   * Dispatches a search request event with the `value` property.
   * Invoked in response to user interactions: `enter` key or click on search button.
   */
  emitSearchEvent() {
    const searchboxRequestEvent = this.createCustomEvent<SearchRequestPayload>(SEARCHBOX_EVENT.SEARCH_REQUEST, {
      value: this.value,
      config: {
        area: this.area,
        collection: this.collection,
      },
    });
    this.dispatchEvent(searchboxRequestEvent);
  }

  /**
   * Dispatches an event notifying that the input box has been cleared.
   * Invoked in response to a click on the clear button.
   */
  emitSearchBoxClearClick() {
    const searchboxClearedEvent = this.createCustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLEAR_CLICK);
    this.dispatchEvent(searchboxClearedEvent);
  }

  /**
   * Updates the contents of the search input box and the value property
   * with the payload of the given event.
   * Invoked in response to an update search term event.
   *
   * @param e The event object.
   */
  updateText(e: CustomEvent) {
    this.updateSearchTermValue(e.detail);
  }

  /**
   * Dispatches an `sfx::on_search_box_change` event, and updates the value
   * property with the payload of the given event.
   *
   * Invoked in response to a change to the contents of the searchbox.
   *
   * @param e The KeyboardEvent object.
   */
  handleInput(e: KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.updateSearchTermValue(value);
    this.dispatchEvent(this.createCustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CHANGE, { value }));
  }

  /**
   * Invokes the emitSearchEvent function when a user presses enter and
   * the value property length is greater than 0.
   *
   * @param e The KeyboardEvent object.
   */
  handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.value.length > 0) {
      this.emitSearchEvent();
    }
  }

  /**
   * Updates the value property to the value passed to it.
   *
   * @param term The value pulled directly from the input box.
   */
  updateSearchTermValue(term: string) {
    this.value = term;
  }

  /**
   * Sets value property and searchbox input value to an empty string and
   * invokes the emitSearchBoxClearedEvent function.
   * Invoked in response to click on `clear` button.
   */
  clearSearch() {
    this.value = '';
    this.emitSearchBoxClearClick();
  }

  /**
   * Dispatches an event notifying that the search box input bar has been clicked.
   * Invoked in response to a user clicking inside of the searchbox input.
   */
  clickExposed() {
    const searchBoxClickedEvent = this.createCustomEvent(SEARCHBOX_EVENT.SEARCHBOX_CLICK);
    this.dispatchEvent(searchBoxClickedEvent);
  }

  /**
   * Returns an event with a standard structure.
   *
   * @param type The type (or name) of the event to be emitted.
   * @param detail A payload to be sent with the event.
   */
  createCustomEvent<T>(type: string, detail?: T): CustomEvent<T> {
    return new CustomEvent(type, {
      detail: {
        ...detail,
        searchbox: this.id
      },
      bubbles: true
    });
  }

  render() {
    return html`
      <style>
        sfx-search-box {
          display: inline-flex;
        }
        sfx-search-box[hidden] {
          display: none;
        }
        sfx-search-box > input {
          flex-grow: 1;
        }
      </style>
      <input
        aria-label="Search"
        class="sfx-input"
        type="text"
        placeholder="${this.placeholder}"
        .value="${this.value}"
        @input="${this.handleInput}"
        @click="${this.clickExposed}"
        @keydown="${this.handleKeydown}"
      />
      ${this.clearButton
        ? html`
            <button class="sfx-clear" @click="${this.clearSearch}">Clear</button>
          `
        : ''}
      ${this.searchButton
        ? html`
            <button class="sfx-submit" @click="${this.emitSearchEvent}">Search</button>
          `
        : ''}
    `;
  }
}

/**
 * The type of the search request event payload. The payload is the
 * search term.
 */
export interface SearchRequestPayload {
  value: string;
  // NOTE: type `any` is being used here in place of SearchRequest, which
  // comes from api-javascript (or @sfx/search-plugin).
  searchbox?: string;
  config?: Partial<any>;
}
