import { LitElement, customElement, css, html, property } from 'lit-element';

@customElement('sfx-list')
export default class List extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Array }) items = [];
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${
        this.title ? html`<h4 class="list-title" id="list_title_${this.title}">${this.title}</h4>` : ''
      }
      <ul aria-labelledby="list_title_${this.title}">
        ${
          this.items.map(item => html`<li>${item.label}</li>`)
        }
      </ul>
    `;
  }
}
