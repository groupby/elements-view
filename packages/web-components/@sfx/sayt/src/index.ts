/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-sayt')
export class Sayt extends LitElement {
  @property({ type: String }) placeholder = 'Search';
  @property({ type: String }) query = '';
  @property({ type: Array }) autocomplete = ['sample', 'strings'];

  capitalizePlaceholder(placeholder: string) {
    return placeholder.toUpperCase();
  }

  render() {
    return html`
      <input placeholder="${this.capitalizePlaceholder(this.placeholder)}" value="${this.query}"/>
      <ul>
        ${this.autocomplete.map(value => html`<li>${value}</li>`)}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

interface Search {
  query: String,
  autocomplete: String[]
}
