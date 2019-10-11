import {
  customElement,
  html,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-unresolved
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
   * A random string suitable for use in stable IDs related to this
   * component.
   */
  protected componentId = shortid.generate();

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

    const role = this.getAttribute('role');
    const roles = role ? role.split(' ') : [];
    if (!roles.includes('listbox')) {
      roles.push('listbox');
      this.setAttribute('role', roles.join(' '));
    }
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

  /**
   * Generates an ID for the item at the given index.
   *
   * @param index The index for which to generate the ID.
   * @returns A generated ID.
   */
  private generateItemId(index: number): string {
    return `sfx-autocomplete-${this.componentId}-item-${index}`;
  }

  /**
   * Returns the ID of the selected item. If no item is selected, the
   * empty string is returned.
   *
   * @return The ID of the selected item.
   */
  get selectedId(): string {
    return this.selectedIndex >= 0 && this.selectedIndex < this.length
      ? this.generateItemId(this.selectedIndex)
      : '';
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
   * Dispatches an [[AUTOCOMPLETE_ACTIVE_TERM]] event with the selected term.
   */
  dispatchSelectedTerm(): void {
    if (this.selectedIndex < 0 || this.selectedIndex >= this.length) return;

    const allItems = this.results
      .map((group) => group.items)
      .reduce((accItems, items) => [...accItems, ...items], []);
    const term = allItems[this.selectedIndex].label;

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
   * Returns a callback that sets [[selectedIndex]] to the given index.
   *
   * @param index The index to set.
   * @returns A callback that sets [[selectedIndex]].
   */
  getTermHoverHandler(index: number): () => void {
    return () => {
      this.selectedIndex = index;
    };
  }

  /**
   * Renders a list of autocomplete items.
   */
  private listRender(
    list: AutocompleteResultGroup<AutocompleteSearchTermItem>,
    listIndex: number,
    itemStartingIndex: number
  ): TemplateResult {
    const titleId = `sfx-autocomplete-${this.componentId}-title-${listIndex}`;
    const header = html`<h4 id="${titleId}">${list.title}</h4>`;
    const searchTermItems = list.items.map((item, index) => {
      const itemIndex = itemStartingIndex + index;
      const ariaSelected = this.selectedIndex === itemIndex ? 'true' : undefined;
      return html`
        <li
           id="${this.generateItemId(itemIndex)}"
           role="option"
           aria-selected="${ifDefined(ariaSelected)}"
           @mouseenter="${this.getTermHoverHandler(index)}"
        >${item.label}</li>`;
    });
    const searchTermList = html`<ul aria-labelledby="${ifDefined(this.caption ? titleId : undefined)}">${searchTermItems}</ul>`;

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
    const startingIndices = this.results
      .map((list) => list.items.length)
      .map((length, index, lengths) => (lengths[index - 2] || 0) + (lengths[index - 1] || 0));
    const autocompleteLists = this.results.map((list, index) => this.listRender(list, index, startingIndices[index]));

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
