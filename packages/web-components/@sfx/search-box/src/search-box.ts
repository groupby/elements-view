import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import {
  SEARCHBOX_CLEAR,
  SEARCHBOX_CLICK,
  SEARCHBOX_INPUT,
  SEARCH_REQUEST,
  UPDATE_SEARCH_TERM,
  SearchRequestPayload,
  SearchboxClearPayload,
  SearchboxClickPayload,
  SearchboxInputPayload,
  UpdateSearchTermPayload,
} from '@sfx/events';

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

  /**
   * The name of the event group that this component belongs to.
   * This component will dispatch events with this group in their
   * payloads and will only react to events that contain this group.
   */
  @property({ type: String, reflect: true }) group: string = '';

  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
  }

  /**
   * Adds event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(UPDATE_SEARCH_TERM, this.updateText);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(UPDATE_SEARCH_TERM, this.updateText);
  }

  /**
   * Dispatches a search request event with the `value` property.
   * Invoked in response to user interactions: `enter` key or click on search button.
   */
  emitSearchEvent(): void {
    const searchboxRequestEvent = this.createCustomEvent<SearchRequestPayload>(SEARCH_REQUEST, {
      query: this.value,
      config: {
        area: this.area,
        collection: this.collection,
      },
    });
    this.dispatchEvent(searchboxRequestEvent);
  }

  /**
   * Dispatches a [[SEARCHBOX_CLEAR]] event notifying that the input box has
   * been cleared. Invoked in response to a click on the clear button.
   */
  emitSearchBoxClearClick(): void {
    const searchboxClearedEvent = this.createCustomEvent<SearchboxClearPayload>(SEARCHBOX_CLEAR);
    this.dispatchEvent(searchboxClearedEvent);
  }

  /**
   * Updates the contents of the search input box and the value property
   * with the payload of the given event.
   * Invoked in response to an update search term event.
   *
   * @param e The event object.
   */
  updateText(e: CustomEvent<UpdateSearchTermPayload>): void {
    const eventGroup = e.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.updateSearchTermValue(e.detail.term);
    }
  }

  /**
   * Dispatches [[SEARCHBOX_INPUT]] event, and updates the value
   * property with the payload of the given event.
   *
   * Invoked in response to a change to the contents of the searchbox.
   *
   * @param e The KeyboardEvent object.
   */
  handleInput(e: KeyboardEvent): void {
    const { value } = e.target as HTMLInputElement;
    const searchboxInputEvent = this.createCustomEvent<SearchboxInputPayload>(SEARCHBOX_INPUT, {
      term: (e.target as HTMLInputElement).value,
    });
    this.updateSearchTermValue(value);
    this.dispatchEvent(searchboxInputEvent);
  }

  /**
   * Invokes the emitSearchEvent function when a user presses enter and
   * the value property length is greater than 0.
   *
   * @param e The KeyboardEvent object.
   */
  handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.value.length > 0) {
      this.emitSearchEvent();
    }
  }

  /**
   * Updates the value property to the value passed to it.
   *
   * @param term The value pulled directly from the input box.
   */
  updateSearchTermValue(term: string): void {
    this.value = term;
  }

  /**
   * Sets value property and searchbox input value to an empty string and
   * invokes the emitSearchBoxClearedEvent function.
   * Invoked in response to click on `clear` button.
   */
  clearSearch(): void {
    this.value = '';
    this.emitSearchBoxClearClick();
  }

  /**
   * Dispatches a [[SEARCHBOX_CLICK]] event notifying that the search box input
   * bar has been clicked. Invoked in response to a user clicking inside of the
   * searchbox input.
   */
  clickExposed(): void {
    const searchBoxClickedEvent = this.createCustomEvent<SearchboxClickPayload>(SEARCHBOX_CLICK);
    this.dispatchEvent(searchBoxClickedEvent);
  }

  /**
   * Returns an event with a standard structure.
   *
   * @param type The type (or name) of the event to be emitted.
   * @param detail A payload to be sent with the event.
   */
  createCustomEvent<T>(type: string, detail?: T): CustomEvent<T> {
    return new CustomEvent<T>(type, {
      detail: {
        ...detail,
        group: this.group,
      },
      bubbles: true,
    });
  }

  render(): TemplateResult {
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

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
