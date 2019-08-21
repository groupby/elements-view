import { LitElement, customElement, html, property, PropertyValues } from 'lit-element';
import { PRODUCTS_EVENT } from '@sfx/products';
import { SAYT_EVENT } from './events';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '../../autocomplete/src/events';
import { SEARCHBOX_EVENT } from '../../search-box/src/events';
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
  @property({ type: Number, reflect: true }) minsearchlength = 3;
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
    this.toggleSearchboxListener = this.toggleSearchboxListener.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SAYT_EVENT.SAYT_SHOW, this.showCorrectSayt);
    window.addEventListener(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, this.showCorrectSayt);
    window.addEventListener(PRODUCTS_EVENT, this.showCorrectSayt);
    window.addEventListener(SAYT_EVENT.SAYT_HIDE, this.hideCorrectSayt);
    window.addEventListener('click', this.processClick);
    window.addEventListener('keydown', this.processKeyEvent);
    if (this.searchbox) {
      this.toggleSearchboxListener('add', 'input', this.processSearchboxInput, this.searchbox);
    } else {
      this.toggleSearchboxListener('add', 'sfx::searchbox_change', this.processSfxSearchboxChange);
    }
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_EVENT.SAYT_SHOW, this.showCorrectSayt);
    window.removeEventListener(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, this.showCorrectSayt);
    window.removeEventListener(PRODUCTS_EVENT, this.showCorrectSayt);
    window.removeEventListener(SAYT_EVENT.SAYT_HIDE, this.hideCorrectSayt);
    window.removeEventListener('click', this.processClick);
    window.removeEventListener('keydown', this.processKeyEvent);

    if (this.searchbox) {
      this.toggleSearchboxListener('remove', 'input', this.processSearchboxInput, this.searchbox);
    } else {
      this.toggleSearchboxListener('remove', 'sfx::searchbox_change', this.processSfxSearchboxChange);
    }
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Update component `hidden` property when the `visible` property changes.
   *
   * @param changedProps A map of the all the change properties.
   */
  updated(changedProps: PropertyValues) {
    if (changedProps.has('visible')) {
      this.hidden = !this.visible;
    }
    if (changedProps.has('searchbox')) {
      const oldSearchbox = changedProps.get('searchbox') as string;
      if (oldSearchbox) {
        this.toggleSearchboxListener('remove', 'input', this.processSearchboxInput, oldSearchbox);
      } else {
        this.toggleSearchboxListener('remove', 'sfx::searchbox_change', this.processSfxSearchboxChange);
      }
      if (this.searchbox) {
        this.toggleSearchboxListener('add', 'input', this.processSearchboxInput, this.searchbox);
      } else {
        this.toggleSearchboxListener('add', 'sfx::searchbox_change', this.processSfxSearchboxChange);
      }
    }
  }

  /**
   * Toggle the events being registered and unregisterd when the `searchbox` property changes.
   *
   * @param toggle A string to indicate the type of eventListener(add or remove).
   * @param eventName The name of the eventListener to register or unregister.
   * @param eventCallback The name of the callback function triggered by the eventListener.
   * @param searchboxType The `oldSearchbox` or `this.searchbox`.
   */
  toggleSearchboxListener(toggle: string, eventName: string, eventCallback: any, searchboxType?: string) :void {
    if (searchboxType) {
      const searchbox :any = document.getElementById(searchboxType);
      if (searchbox) searchbox[`${toggle}EventListener`](eventName, eventCallback);
    } else {
      const globalWindow :any = window;
      globalWindow[`${toggle}EventListener`](eventName, eventCallback);
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
  showCorrectSayt(event: CustomEvent) {
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
  hideCorrectSayt(event: CustomEvent) {
    if (this.isCorrectSayt(event)) {
      this.hideSayt();
    }
  }

  /**
   * Dispatches an `sfx::autocomplete_fetch_data` event with the provided data.
   * The event will be dispatched if the term is at least [[minsearchlength]] long.
   *
   * @param event The searchbox change event dispatched from the searchbox.
   */
  requestSayt(query: string, searchbox: string) {
    if (query.length < this.minsearchlength) return;

    const requestSaytResults = new CustomEvent('sfx::autocomplete_fetch_data', {
      detail: { query, searchbox },
      bubbles: true,
    });
    window.dispatchEvent(requestSaytResults);
  }

  /**
   * Handles the searchbox input in the case where no searchbox ID is given, and
   * triggers the `requestSayt` function with the query and searchbox data.
   *
   * @param event The searchbox input event dispatched from the searchbox.
   */
  processSearchboxInput(event: Event) {
    this.requestSayt((event.target as HTMLInputElement).value, this.searchbox);
  }

  /**
   * Handles the SF-X searchbox changes in the case where a searchbox ID is given, and
   * triggers the `requestSayt` function with the query and specific searchbox ID.
   *
   * @param event The searchbox change event dispatched from the searchbox.
   */
  processSfxSearchboxChange(event: CustomEvent) {
    this.requestSayt(event.detail.value, event.detail.searchbox);
  }

  /**
   * Determines whether an event refers to the correct SAYT. This is true if
   * a matching `searchbox` ID is specified, if the event has no `searchbox`
   * ID specified, or if SAYT has no `searchbox` ID specified.
   *
   * @param event An event that can contain a searchbox ID for comparison.
   */
  isCorrectSayt(event: CustomEvent): boolean {
    const searchbox = event.detail && event.detail.searchbox;
    return !searchbox || !this.searchbox || searchbox === this.searchbox;
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
          <button
            class="sfx-close"
            aria-label="Close"
            @click=${this.clickCloseSayt}>
            ${this.closeText}
          </button>`
        : ''}
      <div class="sfx-sayt-container">
        ${this.hideAutocomplete
          ? ''
          : html`<sfx-autocomplete></sfx-autocomplete>`}
        ${this.hideProducts
          ? ''
          : html`<sfx-products></sfx-products>`}
      </div>
    `;
  }
}
