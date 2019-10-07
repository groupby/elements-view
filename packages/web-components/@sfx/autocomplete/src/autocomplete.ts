import {
  customElement,
  html,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import * as shortid from 'shortid';
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
   * The index of the currently selected index. A negative index causes
   * selection to be cleared.
   */
  @property({ type: Number, reflect: true }) selectedIndex: number = -1;

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
   * The total number of items in all `result` groups.
   */
  get length(): number {
    return this.results.reduce((sum, resultGroup) => sum + resultGroup.items.length, 0);
  }

  get selectedId(): string {
    const selectedElement = this.querySelector('[aria-selected="true"]');

    return selectedElement ? selectedElement.id : '';
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
   * Incrememnts the `selectedIndex` property by 1.
   * If `selectedIndex` is out of bounds, its value will be set to `0`.
   * `selectedIndex` will be set to `0` if the last index is currently selected.
   */
  selectNext(): void {
    const normalizedSelectedIndex = Math.min(Math.max(-1, this.selectedIndex), this.length - 1);
    this.selectedIndex = (normalizedSelectedIndex + 1) % this.length;
  }

  /**
   * Decrements the `selectedIndex` property by 1.
   * If `selectedIndex` is out of bounds, its value will be set to the index of the last item.
   * `selectedIndex` will be set to the index of the last item if the first is currently selected.
   */
  selectPrevious(): void {
    const normalizedSelectedIndex = Math.min(Math.max(0, this.selectedIndex), this.length);
    this.selectedIndex = (normalizedSelectedIndex - 1 + this.length) % this.length;
  }

  /**
   * Renders a list of autocomplete items.
   */
  private listRender(list: AutocompleteResultGroup<AutocompleteSearchTermItem>): TemplateResult {
    const idString = `sfx-list-title-${shortid.generate()}`;
    const header = html`<h4 id="${idString}">${list.title}</h4>`;
    const searchTermItems = list.items.map((item) => html`<li>${item.label}</li>`);
    const searchTermList = html`<ul aria-labelledby="${ifDefined(this.caption ? idString : undefined)}">${searchTermItems}</ul>`;

    return html`
      ${this.caption ? header : ''}
      ${searchTermList}
    `;
  }

  /**
   * Renders results data in a list format using the `sfx-list` custom
   * element.
   */
  render(): TemplateResult {
    const caption = this.caption && this.results.length > 0
      ? html`<h3 class="sfx-header">${this.caption}</h3>`
      : '';
    const autocompleteLists = this.results.map((list) => this.listRender(list));

    return html`
      <style>
        sfx-autocomplete {
          display: block;
        }
        sfx-autocomplete[hidden] {
          display: none;
        }
        sfx-autocomplete > ul {
          list-style: none;
        }
      </style>
      ${caption}
      ${autocompleteLists}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
