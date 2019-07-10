import { customElement, html, property } from 'lit-element';
import Base from '@sfx/base';

@customElement('sfx-list')
export class List extends Base {
  @property({ type: String }) title = '';
  @property({ type: Array }) items = [];

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
