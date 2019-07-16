import { LitElement, customElement, html, property, css } from 'lit-element';

@customElement('sfx-search-box')
export class SearchBox extends LitElement {
  @property({ type: String, reflect: true, attribute: 'placeholder-text' }) placeholder = 'Type your search';
  @property({ type: String }) searchTerm = '';
  @property({ type: Boolean, reflect: true, attribute: 'search-button' }) searchButton = false;
  @property({ type: Boolean, reflect: true, attribute: 'clear-button' }) clearButton = false;

  // static styles = css`
  //   .btn_clear {
  //     color: blue;
  //   }
  //   p {
  //     color: red;
  //   }`;

  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
    console.log('in constructor')
  }

  createRenderRoot() {
    return this;
  }

  static get styles() {
    console.log('this in styles', this)
    return css`
    .btn_clear {
      color: blue;
    }
    p {
      color: red;
    }
    `
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('sfx::autocomplete_hover', this.updateText);
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
    console.log('in updateText')
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
      console.log('in handleKeydown')
      this.searchTerm = (<HTMLInputElement>this.querySelector('#searchInput')).value;
      if (this.searchTerm.length > 3) {
        this.emitAutocompleteRequestEvent(this.searchTerm);
      }
    }
    console.log('this.searchTerm', this.searchTerm)
  }

  clearSearch() {
    this.searchTerm = '';
    let inputValue = (<HTMLInputElement>this.querySelector('#searchInput')).value = '';
    this.emitSearchBoxClearedEvent();
  }

  clickExposed() {
    let searchBoxClickedEvent = new CustomEvent('sfx::searchbox_click_event')
    window.dispatchEvent(searchBoxClickedEvent);
  }

  hoverExposed() {
    let searchBoxHoveredEvent = new CustomEvent('sfx::searchbox_hover_event')
    window.dispatchEvent(searchBoxHoveredEvent);
  }

  render() {
    return html`
    <input type="text" @mouseenter="${this.hoverExposed}" @click="${this.clickExposed}" id="searchInput" placeholder=${this.placeholder} @keyup="${this.handleKeydown}"></input>
    ${this.clearButton ? html`<button class="btn_clear" @click=${this.clearSearch}>Clear</button>` : ''}
    ${this.searchButton ? html`<button class="btn_search" @click=${this.emitSearchEvent}>Search</button>` : ''}
    <p>Style test</p>
    `;
    }
  }
