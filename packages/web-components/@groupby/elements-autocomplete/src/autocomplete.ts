import {
  customElement,
  html,
  property,
  PropertyValues,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-unresolved
import { ifDefined } from 'lit-html/directives/if-defined';
import * as shortid from 'shortid';
import {
  AUTOCOMPLETE_RESPONSE,
  AUTOCOMPLETE_ACTIVE_TERM,
  CACHE_REQUEST,
  CACHE_RESPONSE_PREFIX,
  UPDATE_SEARCH_TERM,
  AutocompleteResponsePayload,
  AutocompleteResultGroup,
  AutocompleteActiveTermPayload,
  AutocompleteSearchTermItem,
  CacheRequestPayload,
  CacheResponsePayload,
  UpdateSearchTermPayload,
} from '@groupby/elements-events';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { Base } from '@groupby/elements-base';

/**
 * The `gbe-autocomplete` component is responsible for displaying a list
 * of autocomplete terms upon receipt of the [[AUTOCOMPLETE_RESPONSE]] event.
 * The component is also responsible for emitting events based on user input.
 */
@customElement('gbe-autocomplete')
export default class Autocomplete extends Base {
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
   * the selection to be cleared.
   */
  @property({ type: Number, reflect: true }) selectedIndex: number = -1;

  /**
   * A random string suitable for use in stable IDs related to this
   * component.
   */
  protected componentId = shortid.generate();

  /**
   * Constructs an instance of `Autocomplete`.
   * This constructor also binds various methods to this instance.
   */
  constructor() {
    super();
    this.receivedResults = this.receivedResults.bind(this);
    this.dispatchSelectedTerm = this.dispatchSelectedTerm.bind(this);
    this.getSelectedIndexSetter = this.getSelectedIndexSetter.bind(this);
    this.receiveInitialData = this.receiveInitialData.bind(this);
    this.sendUpdateSearchEvent = this.sendUpdateSearchEvent.bind(this);
  }

  /**
   * Sets up event listeners. Additionally requests initial data to populate
   * this component if cached data exists.
   */
  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
    window.addEventListener(this.initialDataResponseEventName, this.receiveInitialData);
    this.requestInitialData();

    const role = this.getAttribute('role');
    const roles = role ? role.split(' ') : [];
    if (!roles.includes('listbox')) {
      roles.unshift('listbox');
      this.setAttribute('role', roles.join(' '));
    }
  }

  /**
   * Requests initial data for this component.
   */
  requestInitialData(): void {
    const payload: CacheRequestPayload = {
      name: AUTOCOMPLETE_RESPONSE,
      group: this.group,
      returnEvent: this.initialDataResponseEventName,
    };
    this.dispatchElementsEvent<CacheRequestPayload>(CACHE_REQUEST, payload);
  }

  /**
   * A string intended to be used as the name of the return event in
   * cache requests for this component.
   */
  get initialDataResponseEventName(): string {
    return `${CACHE_RESPONSE_PREFIX}autocomplete-${this.componentId}`;
  }

  /**
   * Removes event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(AUTOCOMPLETE_RESPONSE, this.receivedResults);
    window.removeEventListener(this.initialDataResponseEventName, this.receiveInitialData);
  }

  /**
   * Reacts to changes to various properties.
   * The changes to the following properties are listened for:
   *
   * - `selectedIndex`
   *
   * @param changedProps A map of the all the changed properties.
   */
  updated(changedProps: PropertyValues): void {
    if (changedProps.has('selectedIndex')) {
      this.dispatchSelectedTerm();
    }
  }

  /**
   * The total number of items in all `result` groups.
   */
  get itemCount(): number {
    return this.results.reduce((sum, resultGroup) => sum + resultGroup.items.length, 0);
  }

  /**
   * Generates an ID for the item at the given index.
   *
   * @param index The index for which to generate the ID.
   * @returns A generated ID.
   */
  private generateItemId(index: number): string {
    return `gbe-autocomplete-${this.componentId}-item-${index}`;
  }

  /**
   * Returns the ID of the selected item. If no item is selected, the
   * empty string is returned.
   *
   * @return The ID of the selected item.
   */
  get selectedId(): string {
    return this.selectedIndex >= 0 && this.selectedIndex < this.itemCount
      ? this.generateItemId(this.selectedIndex)
      : '';
  }

  /**
   * Receives an event for populating initial data.
   * Intended to be used on mount of this component.
   *
   * @param event The event object.
   */
  receiveInitialData(event: CustomEvent<CacheResponsePayload>): void {
    const data = event.detail.data || {};
    this.results = data.results || [];
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
    if (this.selectedIndex < 0 || this.selectedIndex >= this.itemCount) return;

    const allItems = this.results
      .map((group) => group.items)
      .reduce((accItems, items) => [...accItems, ...items], []);
    const term = allItems[this.selectedIndex].label;

    const payload: AutocompleteActiveTermPayload = {
      query: term,
      group: this.group,
    };
    this.dispatchElementsEvent(AUTOCOMPLETE_ACTIVE_TERM, payload);
  }

  /**
   * Increments the `selectedIndex` property by 1.
   * If incrementing `selectedIndex` will cause it to be out of bounds,
   * its value will be set to `0` instead.
   * If there are no items, `selectedIndex` will be set to `-1`.
   */
  selectNext(): void {
    const normalizedSelectedIndex = Math.min(Math.max(-1, this.selectedIndex), this.itemCount - 1);
    const newIndex = (normalizedSelectedIndex + 1) % this.itemCount;
    this.selectedIndex = Number.isNaN(newIndex) ? -1 : newIndex;
  }

  /**
   * Decrements the `selectedIndex` property by 1.
   * If decrementing `selectedIndex` will cause it to be out of bounds,
   * its value will be set to the index of the last item instead.
   * If there are no items, `selectedIndex` will be set to `-1`.
   */
  selectPrevious(): void {
    const normalizedSelectedIndex = Math.min(Math.max(0, this.selectedIndex), this.itemCount);
    const newIndex = (normalizedSelectedIndex - 1 + this.itemCount) % this.itemCount;
    this.selectedIndex = Number.isNaN(newIndex) ? -1 : newIndex;
  }

  /**
   * Returns a callback that sets [[selectedIndex]] to the given index.
   *
   * @param index The index to set.
   * @returns A callback that sets [[selectedIndex]].
   */
  getSelectedIndexSetter(index: number): () => void {
    return () => {
      this.selectedIndex = index;
    };
  }

  /**
   * Emits an [[UPDATE_SEARCH_TERM]] event with an autocomplete term
   * and the trigger for submitting a search request.
   *
   * @param event A mouse click event on an autocomplete term.
   */
  sendUpdateSearchEvent(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const term = target.innerText;
    const payload: UpdateSearchTermPayload = {
      term,
      group: this.group,
      search: true,
    };

    this.dispatchElementsEvent(UPDATE_SEARCH_TERM, payload);
  }

  /**
   * Renders a list of autocomplete items.
   */
  private listRender(
    list: AutocompleteResultGroup<AutocompleteSearchTermItem>,
    listIndex: number,
    itemStartingIndex: number
  ): TemplateResult {
    const titleId = `gbe-autocomplete-${this.componentId}-title-${listIndex}`;
    const header = html`<h4 id="${titleId}">${list.title}</h4>`;
    const searchTermItems = list.items.map((item, index) => {
      const itemIndex = itemStartingIndex + index;
      const ariaSelected = this.selectedIndex === itemIndex;
      return html`
        <li
           id="${this.generateItemId(itemIndex)}"
           role="option"
           aria-selected="${ariaSelected}"
           @click="${this.sendUpdateSearchEvent}"
           @mouseenter="${this.getSelectedIndexSetter(itemIndex)}"
        >${item.label}</li>`;
    });
    const searchTermList = html`<ul role="group" aria-labelledby="${ifDefined(list.title ? titleId : undefined)}">${searchTermItems}</ul>`;

    return html`
      ${list.title ? header : ''}
      ${searchTermList}
    `;
  }

  /**
   * Renders results data in a list format.
   */
  render(): TemplateResult {
    const caption = this.caption && this.results.length > 0
      ? html`<h3 class="gbe-header">${this.caption}</h3>`
      : '';
    const startingIndices = this.results
      .map((list) => list.items.length)
      .map((length, index, lengths) => (lengths[index - 2] || 0) + (lengths[index - 1] || 0));
    const autocompleteLists = this.results.map((list, index) => this.listRender(list, index, startingIndices[index]));

    return html`
      <style>
        gbe-autocomplete {
          display: block;
        }
        gbe-autocomplete[hidden] {
          display: none;
        }
        gbe-autocomplete > ul {
          list-style: none;
        }
      </style>
      ${caption}
      ${autocompleteLists}
    `;
  }
}
