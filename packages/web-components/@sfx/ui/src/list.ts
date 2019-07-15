import { customElement, html, property } from 'lit-element';
import { Base } from '@sfx/base';

@customElement('sfx-list')
export default class List extends Base {
  @property({ type: String }) title: string = '';
  @property({ type: Array }) items: Array<any> = [];

  render() {
    return html`
      ${ this.title ? html`<h4 id="list_title_${this.title}">${this.title}</h4>` : ''}
      ${ this.title ?
        html`<ul aria-labelledby="list_title_${this.title}">
          ${ this.items.map(item => html`<li>${item.label}</li>
            </ul>`)}` :
        html`<ul>
          ${ this.items.map(item => html`<li>${item.label}</li>`)} `}
            </ul>
      `;
    }
  }
