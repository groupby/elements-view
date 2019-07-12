import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  
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

  emitAutocompleteRequestEvent(letters) {
    let autocompleteRequestEvent = new CustomEvent('sfx::autocomplete_request', { detail: letters, bubbles: true })
    window.dispatchEvent(autocompleteRequestEvent);
  }

  emitSearchBoxClearedEvent() {
    let searchboxxClearedEvent = new CustomEvent('sfx::search_box_cleared')
    window.dispatchEvent(searchboxxClearedEvent);
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

  updateText(e) {
    this.searchTerm = e.detail;
    (<HTMLInputElement>this.querySelector('#searchInput')).value = e.detail;
    console.log('in update text - e', e)
  }

  handleKeydown(e) {
    if (e.keyCode === 8) {
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.length-1);
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  clearSearch() {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = '';
    this.emitSearchBoxClearedEvent();
  }

  render() {
    return html`
    <input type="text" id="searchInput" placeholder=${this.placeholder} @keyup="${this.handleKeypress}" @keydown="${this.handleKeydown}"></input>
    <button @click=${this.clearSearch}>Clear</button>
    <button @click=${this.emitSearchEvent}>Search</button>
    `;
    }
  }
