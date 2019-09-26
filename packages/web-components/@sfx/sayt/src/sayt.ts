import { LitElement, customElement, html, property, PropertyValues } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { debounce } from 'debounce';
import {
  AUTOCOMPLETE_ACTIVE_TERM,
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_RESPONSE,
  SAYT_HIDE,
  SAYT_SHOW,
  SAYT_PRODUCTS_REQUEST,
  SAYT_PRODUCTS_RESPONSE,
  SEARCHBOX_INPUT,
  AutocompleteActiveTermPayload,
  SearchboxInputPayload,
  WithGroup,
} from '@sfx/events';

/**
 * The `sfx-sayt` component is responsible for displaying and hiding the
 * `sfx-autocomplete` and `sfx-products` components.
 */
@customElement('sfx-sayt')
export default class Sayt extends LitElement {
  /**
   * Determines if the `sfx-autocomplete` component will be hidden or not.
   */
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;
  /**
   * Determines if the `sfx-products` component will be hidden or not.
   */
  @property({ type: Boolean, reflect: true }) hideProducts = false;
  /**
   * Determines the visibility of the `sayt` component.
   */
  @property({ type: Boolean, reflect: true }) visible = false;
  /**
   * Stores the ID of the relevant search element.
   */
  @property({ type: String, reflect: true }) searchbox = '';
  /**
   * The name of the event group that this component belongs to.
   * This component will dispatch events with this group in their
   * payloads and will only react to events that contain this group.
   */
  @property({ type: String, reflect: true }) group = '';
  /**
   * Customizes the text in the close button.
   */
  @property({ type: String, reflect: true }) closeText = 'Close';
  /**
   * Shows a button to allow for closing SAYT manually.
   */
  @property({ type: Boolean, reflect: true }) showCloseButton = false;
  /**
   * The minimum length of the search term required before a SAYT request will be made with it.
   */
  @property({ type: Number, reflect: true }) minSearchLength = 3;
  /**
   * The debounce delay in millilseconds.
   */
  @property({ type: Number, reflect: true }) debounce = 300;
  /**
   * The debouncedRequestSaytProducts method that will wrap the requestSaytProducts method in a debounce.
   */
  debouncedRequestSaytProducts: requestSaytType;
  /**
   * The debouncedRequestSaytAutocompleteTerms method that will wrap the requestSaytAutocompleteTerms method in a debounce.
   */
  debouncedRequestSaytAutocompleteTerms: requestSaytType;

  /**
   * Calls superclass constructor and bind methods.
   */
  constructor() {

    super();

    this.showSayt = this.showSayt.bind(this);
    this.hideSayt = this.hideSayt.bind(this);
    this.processClick = this.processClick.bind(this);
    this.processKeyEvent = this.processKeyEvent.bind(this);
    this.nodeInSearchbox = this.nodeInSearchbox.bind(this);
    this.hideCorrectSayt = this.hideCorrectSayt.bind(this);
    this.showCorrectSayt = this.showCorrectSayt.bind(this);
    this.isCorrectSayt = this.isCorrectSayt.bind(this);
    this.requestSayt = this.requestSayt.bind(this);
    this.processSearchboxInput = this.processSearchboxInput.bind(this);
    this.processSfxSearchboxChange = this.processSfxSearchboxChange.bind(this);
    this.setSearchboxListener = this.setSearchboxListener.bind(this);
    this.handleAutocompleteTermHover = this.handleAutocompleteTermHover.bind(this);
    this.getDebounce = this.getDebounce.bind(this);
    this.setDebounce = this.setDebounce.bind(this);

    this.setDebounce();
  }

  /**
   * Registers event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SAYT_SHOW, this.showCorrectSayt);
    window.addEventListener(AUTOCOMPLETE_RESPONSE, this.showCorrectSayt);
    window.addEventListener(SAYT_PRODUCTS_RESPONSE, this.showCorrectSayt);
    window.addEventListener(SAYT_HIDE, this.hideCorrectSayt);
    window.addEventListener(AUTOCOMPLETE_ACTIVE_TERM, this.handleAutocompleteTermHover);
    window.addEventListener('click', this.processClick);
    window.addEventListener('keydown', this.processKeyEvent);
    this.addEventListener(AUTOCOMPLETE_ACTIVE_TERM, this.handleAutocompleteTermHover);
    this.setSearchboxListener(this.searchbox, 'add');
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_SHOW, this.showCorrectSayt);
    window.removeEventListener(AUTOCOMPLETE_RESPONSE, this.showCorrectSayt);
    window.removeEventListener(SAYT_PRODUCTS_RESPONSE, this.showCorrectSayt);
    window.removeEventListener(SAYT_HIDE, this.hideCorrectSayt);
    window.removeEventListener(AUTOCOMPLETE_ACTIVE_TERM, this.handleAutocompleteTermHover);
    window.removeEventListener('click', this.processClick);
    window.removeEventListener('keydown', this.processKeyEvent);
    this.removeEventListener(AUTOCOMPLETE_ACTIVE_TERM, this.handleAutocompleteTermHover);
    this.setSearchboxListener(this.searchbox, 'remove');
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Update a component property when the property changes.
   *
   * @param changedProps A map of the all the changed properties.
   */
  updated(changedProps: PropertyValues) {
    if (changedProps.has('visible')) {
      this.hidden = !this.visible;
    }
    if (changedProps.has('searchbox')) {
      const oldSearchbox = changedProps.get('searchbox') as string;

      this.setSearchboxListener(oldSearchbox, 'remove');
      this.setSearchboxListener(this.searchbox, 'add');
    }
    if (changedProps.has('debounce')) {
      this.setDebounce();
    }
  }

  /**
   * Toggle the events being registered and unregisterd when the `searchbox` property changes.
   *
   * @param searchboxId A searchbox ID given to the searchbox.
   * @param action A string to indicate the type of eventListener(add or remove).
   */
  setSearchboxListener(searchboxId: string, action: 'add' | 'remove') {
    const setEventListener = `${action}EventListener` as 'addEventListener' | 'removeEventListener';
    if (searchboxId) {
      const searchbox = document.getElementById(searchboxId) as HTMLElement;
      if (searchbox) searchbox[setEventListener]('input', this.processSearchboxInput);
    } else {
      window[setEventListener](SEARCHBOX_INPUT, this.processSfxSearchboxChange);
    }
  }

  /**
   * Changes the `visible` property to `true`.
   */
  showSayt() {
    this.visible = true;
  }

  /**
   * Makes SAYT visible if the event refers to the correct SAYT component.
   * @see [[isCorrectSayt]]
   *
   * @param event An event that can contain a searchbox ID.
   */
  showCorrectSayt(event: CustomEvent<WithGroup>) {
    if (this.isCorrectSayt(event)) {
      this.showSayt();
    }
  }

  /**
   * Changes the `visible` property to `false`.
   */
  hideSayt() {
    this.visible = false;
  }

  /**
   * Hides SAYT if the event refers to the correct SAYT component.
   *
   * @param event An event that can contain a searchbox ID.
   */
  hideCorrectSayt(event: CustomEvent<WithGroup>) {
    if (this.isCorrectSayt(event)) {
      this.hideSayt();
    }
  }

  /**
   * Triggers requests for Sayt autocomplete terms and Sayt products
   * simultaneously using a query and group name.
   * They will only be called if the term is at least [[minSearchLength]] long.
   *
   * @param query The search term to use.
   */
  requestSayt(query: string) {
    if (query.length < this.minSearchLength) {
      this.hideSayt();
      return;
    }

    this.requestSaytAutocompleteTerms(query);
    this.requestSaytProducts(query);
  }

  /**
   * Debounces the function that is passed in the callback paramater.
   * Customizable delay based on debounceTime attribute on Sayt element.
   *
   * @param callback The function to debounce.
   */
  getDebounce<requestSaytType extends Function>(callback: requestSaytType): ReturnType<debounce> {
    return debounce(
      callback,
      this.debounce,
      false
    );
  }

  /**
   * Dispatches getDebounce for each of the methods to be debounced.
   * Is triggered once in constructor and when the debounce attribute is changed.
   */
  setDebounce() {
    this.debouncedRequestSaytAutocompleteTerms  = this.getDebounce(this.requestSaytAutocompleteTerms);
    this.debouncedRequestSaytProducts  = this.getDebounce(this.requestSaytProducts);
  }

  /**
   * Dispatches an event to request data. Intended for requesting
   * products or autocomplete terms.
   *
   * @param eventType The type of the event to be dispatched.
   * @param query The query term.
   */
  dispatchRequestEvent(eventType: string, query: string) {
    const requestEvent = new CustomEvent(eventType, {
      detail: { query, group: this.group },
      bubbles: true
    });
    this.dispatchEvent(requestEvent);
  }

  /**
   * Dispatches an [[AUTOCOMPLETE_REQUEST]] event with the provided data.
   *
   * @param query The search term to use.
   */
  requestSaytAutocompleteTerms(query: string) {
    this.dispatchRequestEvent(AUTOCOMPLETE_REQUEST, query);
  }

  /**
   * Dispatches a [[SAYT_PRODUCTS_REQUEST]] event with the provided data.
   *
   * @param query The search term to use.
   */
  requestSaytProducts(query: string) {
    this.dispatchRequestEvent(SAYT_PRODUCTS_REQUEST, query);
  }

  /**
   * Handles how the hover on Sayt autocomplete terms updates the sayt products.
   * Triggers a request of Sayt products using the query.
   *
   * @param event The hover event dispatched from autocomplete.
   */
  handleAutocompleteTermHover(event: CustomEvent<AutocompleteActiveTermPayload>) {
    if (this.isCorrectSayt(event)) {
      this.requestSaytProducts(event.detail.query);
    }
  }

  /**
   * Handles searchbox input events by passing the event's value to `requestSayt()`
   * in the case where a `searchbox` ID is passed to the Sayt component.
   * Can be used to not require listening for a specific SF-X event.
   *
   * @param event The searchbox input event dispatched from the searchbox.
   */
  processSearchboxInput(event: Event) {
    this.requestSayt((event.target as HTMLInputElement).value);
  }

  /**
   * Handles SF-X searchbox changes by passing the event's value to `requestSayt()`
   * if [[isCorrectSayt]] returns `true`.
   * Used when a `searchbox` ID is not passed to the Sayt component.
   *
   * @param event The [[SEARCHBOX_INPUT]] event dispatched from the searchbox.
   */
  processSfxSearchboxChange(event: CustomEvent<SearchboxInputPayload>) {
    if (this.isCorrectSayt(event)) {
      this.requestSayt(event.detail.term);
    }
  }

  /**
   * Determines whether an event refers to the correct SAYT. This is true if
   * the `group` in the event matches this component's group. If `group` is not defined
   * in the event, it will default to an empty string.
   *
   * @param event An event that contains a group name for comparison.
   */
  isCorrectSayt(event: CustomEvent<WithGroup>): boolean {
    const group = event.detail && event.detail.group || '';
    return group === this.group;
  }

  /**
   * Processes a click event in order to close SAYT under the right conditions.
   *
   * @param event The click event.
   */
  processClick(event: MouseEvent) {
    const target = event.target as Node;
    if (this.contains(target) || this.nodeInSearchbox(target)) return;
    this.hideSayt();
  }

  /**
   * Handles hiding SAYT on click of a close link/button (or other event).
   *
   * @param event An event with a default action to be prevented.
   */
  clickCloseSayt(event: Event) {
    event.preventDefault();
    this.hideSayt();
  }

  /**
   * Checks whether a given node is inside of SAYT's identified search box.
   *
   * @param node The node to check for containment.
   */
  nodeInSearchbox(node: Node): boolean {
    if (!this.searchbox) return false;
    const searchbox = document.getElementById(this.searchbox);
    return !!searchbox && searchbox.contains(node);
  }

  /**
   * Processes a keyboard event in order to close SAYT when certain keys are pressed.
   * Namely:
   *   - Escape
   *
   * @param event A keyboard event used for checking which key has been pressed.
   */
  processKeyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideSayt();
    }
  }

  /**
   * Returns a TemplateResult object for rendering in LitElement.
   */
  render() {
    return html`
      <style>
        sfx-sayt {
          display: block;
        }

        sfx-sayt[hidden] {
          display: none;
        }

        .sfx-sayt-container {
          display: flex;
        }
      </style>
      ${this.showCloseButton
        ? html`
            <button class="sfx-close" aria-label="Close" @click=${this.clickCloseSayt}>
              ${this.closeText}
            </button>
          `
        : ''}
      <div class="sfx-sayt-container">
        ${this.hideAutocomplete
          ? ''
          : html`
            <sfx-autocomplete group="${ifDefined(this.group)}">
            </sfx-autocomplete>`
        }
        ${this.hideProducts
          ? ''
          : html`
            <sfx-products-sayt group="${ifDefined(this.group)}">
            </sfx-products-sayt>`
        }
      </div>
    `;
  }
}

/**
 * The type of the callback expected to be passed to getDebounce.
 */
export interface requestSaytType extends debounce {
  (query: string, searchbox? : string) : void;
};

/**
 * The type of the debounce returned by getDebounce.
 */
export interface debounce {
  (...args: any) : any;
};
