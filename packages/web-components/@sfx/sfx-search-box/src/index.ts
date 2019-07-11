import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  inputBox = document.querySelector('input');
  
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

  emitSearchEvent(term) {
    console.log(term);
  }

  handleKeypress(e) {
    if (e.keyCode === 13) {
      this.emitSearchEvent(this.searchTerm)
    } else {
      this.searchTerm += e.key;
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  handleKeydown(e) {
    if (e.keyCode === 8) {
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.length-1);
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  clearSearch(e) {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = ''
  }

  render() {
    return html`
    <input type="text" id="searchInput" placeholder=${this.placeholder} @keypress="${this.handleKeypress}" @keydown="${this.handleKeydown}"></input>
    <button @click=${this.clearSearch}>Clear</button>
    <button>Search</button>
    `;
    }
  }
