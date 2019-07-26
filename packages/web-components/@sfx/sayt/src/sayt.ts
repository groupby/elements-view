import { LitElement, customElement, html, property, PropertyValues } from 'lit-element';
import { SAYT_EVENT } from './events';

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
   * Determines the visibility of the `sayt` component.
   */
  @property({ type: Boolean, reflect: true }) visible = false;
  /**
   * Stores the ID of the relevant search element.
   */
  @property({ type: String, reflect: true }) searchbar;

  constructor() {
    super();
    this.showSayt = this.showSayt.bind(this);
    this.hideSayt = this.hideSayt.bind(this);
    this.processClick = this.processClick.bind(this);
    this.nodeInSearchBar = this.nodeInSearchBar.bind(this);
    this.processKeyPress = this.processKeyPress.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SAYT_EVENT.SAYT_SHOW, this.showSayt);
    window.addEventListener(SAYT_EVENT.SAYT_HIDE, this.hideSayt);
    window.addEventListener('click', this.processClick);
    window.addEventListener('keypress', this.processKeyPress);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_EVENT.SAYT_SHOW, this.showSayt);
    window.removeEventListener(SAYT_EVENT.SAYT_HIDE, this.hideSayt);
    window.removeEventListener('click', this.processClick);
    window.removeEventListener('keypress', this.processKeyPress);
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
  }

  /**
   * Changes the `visible` property to `true`.
   */
  showSayt() {
    this.visible = true;
  }

  /**
   * Changes the `visible` property to `false`.
   */
  hideSayt() {
    this.visible = false;
  }

  /**
   * Processes a click event in order to determine whether or not to close SAYT.
   * 
   * @param event The click event.
   */
  processClick(event: Event) {
    const target = event.target as Node;
    if (this.contains(target) || this.nodeInSearchBar(target)) return;
    this.hideSayt();
  }

  nodeInSearchBar(node) {
    const searchBar = document.querySelector(this.searchbar);
    return !!searchBar && searchBar.contains(node);
  }

  processKeyPress(event: KeyboardEvent) {
    // @TODO Refactor escape out keycode 
    if (event.keyCode === 27) { // escape
      this.hideSayt();
    }
  }

  render() {
    return html`
      ${ this.hideAutocomplete ? '' : html`<sfx-autocomplete></sfx-autocomplete>` }
    `;
  }
}
