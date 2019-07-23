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

  constructor() {
    super();
    this.handleVisibilityEvent = this.handleVisibilityEvent.bind(this);
  }

  /**
   * Registers event listeners.
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener(SAYT_EVENT.SAYT_SHOW, this.handleVisibilityEvent);
    window.addEventListener(SAYT_EVENT.SAYT_HIDE, this.handleVisibilityEvent);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(SAYT_EVENT.SAYT_SHOW, this.handleVisibilityEvent);
    window.removeEventListener(SAYT_EVENT.SAYT_HIDE, this.handleVisibilityEvent);
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
   * Handles sayt visibility events.
   *
   * @param e The custom event received from sayt-visibility-related
   * events.
   */
  handleVisibilityEvent(e: CustomEvent) {
      switch (e.type) {
      case SAYT_EVENT.SAYT_SHOW:
        this.visible = true;
        break;
      case SAYT_EVENT.SAYT_HIDE:
        this.visible = false;
        break;
    }
  }

  render() {
    return html`
      ${ this.hideAutocomplete ? '' : html`<sfx-autocomplete></sfx-autocomplete>` }
    `;
  }
}
