import {
  customElement,
  html,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
import {
  AUTOCOMPLETE_RESPONSE,
  AUTOCOMPLETE_ACTIVE_TERM,
  AutocompleteResponsePayload,
  AutocompleteResultGroup,
  AutocompleteActiveTermPayload,
  AutocompleteSearchTermItem,
} from '@sfx/events';

/**
 * The `sfx-autocomplete` component is responsible for displaying a list
 * of autocomplete terms upon receipt of the [[AUTOCOMPLETE_RESPONSE]] event.
 * The component is also responsible for emitting events based on user input.
 */
@customElement('sfx-autocomplete')
export default class Autocomplete extends LitElement {
  /**
   * Autocomplete request results.
   */
  @property({ type: Array }) results: AutocompleteResultGroup<AutocompleteSearchTermItem>[] = [];

  /**
   * The text to use in the header.
   */
  @property({ type: String, reflect: true }) caption: string = '';

  /**
   * The name of the event group that this component belongs to.
   * This component will dispatch events with this group in their
   * payloads and will only react to events that contain this group.
   */
  @property({ type: String, reflect: true }) group: string = '';

  /**
   * Constructs an instance of Autocomplete.
   * Binds receivedResults function to the class.
   */
  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
  }

  /**
   * Sets up event listeners.
   */
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
  }

  /**
   * Saves the payload of the given event to `results`.
   *
   * @param e The event object.
   */
  receivedResults(e: CustomEvent<AutocompleteResponsePayload>): void {
    const eventGroup = e.detail.group || '';
    const componentGroup = this.group || '';
    if (eventGroup === componentGroup) {
      this.results = e.detail.results || [];
    }
  }

  /**
   * Dispatches an [[AUTOCOMPLETE_ACTIVE_TERM]] event with the Sayt autocomplete term.
   *
   * @param event An event that contains a Sayt autocomplete term.
   */
  handleHoverTerm(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() !== 'li') return;
    const term = target.innerText;
    const sentEvent = new CustomEvent<AutocompleteActiveTermPayload>(AUTOCOMPLETE_ACTIVE_TERM, {
      detail: {
        query: term,
        group: this.group,
      },
      bubbles: true,
    });
    this.dispatchEvent(sentEvent);
  }

  /**
   * Renders results data in a list format using the `sfx-list` custom
   * element.
   */
  render(): TemplateResult {
    const caption = this.caption && this.results.length > 0 ? html`<h3 class="sfx-header">${this.caption}</h3>` : '';

    return html`
      <style>
        sfx-autocomplete {
          display: block;
        }
        sfx-autocomplete[hidden] {
          display: none;
        }
      </style>
      ${caption}
      ${this.results.map(
    (list) => html`
            <sfx-list caption="${list.title}" .items="${list.items}" @mouseover="${this.handleHoverTerm}"></sfx-list>
          `
  )}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
