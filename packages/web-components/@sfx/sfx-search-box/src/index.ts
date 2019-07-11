import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  emitSearchEvent() {
    let searchRequestEvent = new CustomEvent('search_request', { detail: this.searchTerm, bubbles: true })
    window.dispatchEvent(searchRequestEvent);
    this.clearSearch();
  }

  emitAutocompleteRequestEvent(letters) {
    let autocompleteRequestEvent = new CustomEvent('autocomplete_request', { detail: letters, bubbles: true })
    window.dispatchEvent(autocompleteRequestEvent);
  }

  handleKeypress(e) {
    console.log((<HTMLInputElement>this.querySelector('#searchInput')).value, 'inputValue')
    if (e.keyCode === 13) {
      this.emitSearchEvent();
    } else {
      this.searchTerm = (<HTMLInputElement>this.querySelector('#searchInput')).value;
      this.emitAutocompleteRequestEvent(this.searchTerm)
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  handleKeydown(e) {
    if (e.keyCode === 8) {
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.length-1);
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  clearSearch() {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = ''
  }

  render() {
    return html`
    <input type="text" id="searchInput" placeholder=${this.placeholder} @keyup="${this.handleKeypress}" @keydown="${this.handleKeydown}"></input>
    <button @click=${this.clearSearch}>Clear</button>
    <button @click=${this.emitSearchEvent}>Search</button>
    `;
    }
  }
