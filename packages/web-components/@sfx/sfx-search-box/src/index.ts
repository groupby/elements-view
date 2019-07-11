import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  inputBox = document.querySelector('input');
  
  constructor() {
    super();
    console.log(this, 'this')
    // const searchInput = this.querySelector('#searchInput')
    // console.log('searchInput', searchInput)
    // console.log(document.querySelector('#searchInput'), 'input box')
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    const searchInput = this.querySelector('#searchInput')
    console.log('searchInput', searchInput)

  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  

  handleKeypress(e) {
    console.log('keypressed')
    this.searchTerm += e.key;
    console.log('event in keypress', e)
    console.log('search term', this.searchTerm)
  }

  clearSearch(e) {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = ''
  }

  render() {
    return html`
    <input type="text" id="searchInput" placeholder=${this.placeholder} @keypress="${this.handleKeypress}"></input>
    <button @click=${this.clearSearch}>Clear</button>
    <button>Search</button>
    `;
    }
  }
