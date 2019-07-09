import { LitElement, customElement, html, property } from 'lit-element';

@customElement('sfx-list')
export class List extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Array }) items = [];

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    ${this.title ? 
      html`<h4 id="list_title_${this.title}">${this.title}</h4>` : ''
    }
      <ul aria-labelledby="list_title_${this.title}">
        ${
          this.items.map(item => html`<li>${item.label}</li>`)
        }
      </ul>
    `;
  }
}
