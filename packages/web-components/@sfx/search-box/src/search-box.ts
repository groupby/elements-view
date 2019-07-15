import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  @property({ type: Boolean, reflect: true, attribute: 'search-button' }) searchButton = false;
  @property({ type: Boolean, reflect: true, attribute: 'clear-button' }) clearButton = false;
  
  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('sfx::autocomplete_hover', this.updateText)
    console.log(this.searchButton, 'this.searchButton')
    console.log(this.clearButton, 'this.clearButton')
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('sfx::autocomplete_hover', this.updateText);
  }

  emitSearchEvent() {
    let searchRequestEvent = new CustomEvent('sfx::search_request', { detail: this.searchTerm, bubbles: true })
    window.dispatchEvent(searchRequestEvent);
    this.clearSearch();
  }

  emitAutocompleteRequestEvent(letters: String) {
    let autocompleteRequestEvent = new CustomEvent('sfx::autocomplete_request', { detail: letters, bubbles: true })
    window.dispatchEvent(autocompleteRequestEvent);
  }

  emitSearchBoxClearedEvent() {
    let searchboxxClearedEvent = new CustomEvent('sfx::search_box_cleared')
    window.dispatchEvent(searchboxxClearedEvent);
  }

  updateText(e) {
    this.searchTerm = e.detail;
    let el = (<HTMLInputElement>this.querySelector('#searchInput')).value;
    el = e.detail;
  }

  handleKeydown(e) {
    if (e.keyCode === 8) {
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.length-1);
    }
    else if (e.keyCode === 13) {
      this.emitSearchEvent();
    } else {
      this.searchTerm = (<HTMLInputElement>this.querySelector('#searchInput')).value;
      this.emitAutocompleteRequestEvent(this.searchTerm)
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  clearSearch() {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = '';
    this.emitSearchBoxClearedEvent();
  }

  clickExposed() {
    let searchBoxClickedEvent = new CustomEvent('sfx::search_click_event')
    window.dispatchEvent(searchBoxClickedEvent);
  }

  hoverExposed() {
    let searchBoxHoveredEvent = new CustomEvent('sfx::search_hover_event')
    window.dispatchEvent(searchBoxHoveredEvent);
  }

  render() {
    return html`
    <input type="text" @mouseenter="${this.hoverExposed}" @click="${this.clickExposed}" id="searchInput" placeholder=${this.placeholder} @keyup="${this.handleKeydown}"></input>
    ${this.clearButton ? html`<button @click=${this.clearSearch}>Clear</button>` : ''}
    ${this.searchButton ? html`<button @click=${this.emitSearchEvent}>Search</button>` : ''}
    `;
    }
  }
