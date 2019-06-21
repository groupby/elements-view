import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-sayt')
export class Sayt extends LitElement {
  @property({ type: String }) placeholder = 'Search';
  @property({ type: Object }) search: Search = { query: '', autocomplete: []};

  render() {
    return html`
      <input placeholder="${this.placeholder}" value="${this.search.query}"/>
      <ul>
        ${this.search.autocomplete.map(value => 
          `<li>${value}</li>`
        ).join('')}
      </ul>
    `;
  }
}

interface Search {
  query: String,
  autocomplete: String[]
}
