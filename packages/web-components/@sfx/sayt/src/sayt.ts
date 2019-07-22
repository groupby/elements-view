import { LitElement, customElement, html, property } from 'lit-element';
// import { Base } from '@sfx/base';
import '@sfx/autocomplete';
import { SAYT_EVENT } from './events';

/**
 * The `sfx-sayt` component is responsible for displaying and hiding the
 * `sfx-autocomplete` and `sfx-products` components.
 */
@customElement('sfx-sayt')
// TODO: look into the Base class so this class can extend it again. The
// issue that we're seeing is related to changing properties and having
// the DOM update accurately in response to those property changes.
export default class Sayt extends LitElement {
  /**
   * Determines if the `sfx-autocomplete` component will be hidden or not.
   */
  @property({ type: Boolean, reflect: true }) hideAutocomplete = false;
  /**
   * Determines the visibility of the `sayt` component.
   */
  @property({ type: Boolean, reflect: true }) show = false;

  constructor() {
    super();
    this.handleVisibilityEvent = this.handleVisibilityEvent.bind(this);
  }

  /**
   * Register event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SAYT_EVENT.SAYT_SHOW, this.handleVisibilityEvent);
    window.addEventListener(SAYT_EVENT.SAYT_HIDE, this.handleVisibilityEvent);
  }

  /**
   * Remove event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_EVENT.SAYT_SHOW, this.handleVisibilityEvent);
    window.removeEventListener(SAYT_EVENT.SAYT_HIDE, this.handleVisibilityEvent);
  }

  // TODO: Remove createRenderRoot once Base class is extended.
  createRenderRoot() {
    return this;
  }

  /**
   * Update component `hidden` property when the `show` property changes.
   * @param changedProps A map of the all the change properties.
   */
  updated(changedProps: Map<string, any>) {
    if (changedProps.has('show')) {
      this.hidden = !this.show;
    }
  }

  /**
   * Method to handle the visibility events associated with the `sayt`
   * component
   * @param e The custom event received from sayt-visibility-related
   * events.
   */
  handleVisibilityEvent(e: CustomEvent) {
    switch(e.type) {
      case SAYT_EVENT.SAYT_SHOW:
        this.show = true;
        break;
      case SAYT_EVENT.SAYT_HIDE:
        this.show = false;
        break;
    }
  }

  render() {
    return html`
      ${
        this.hideAutocomplete ? '' : html`<sfx-autocomplete></sfx-autocomplete>`
      }
    `;
  }
}
