import { customElement, html, property } from 'lit-element';
import { Base } from '@sfx/base';

@customElement('sfx-list')
export default class List extends Base {
  @property({ type: String, reflect: true }) sfxListTitle: string = '';
  @property({ type: Array }) items: Array<any> = [];

  render() {
    return html`
      ${ this.sfxListTitle ? html`<h4 id="list_title_${this.sfxListTitle}">${this.sfxListTitle}</h4>` : ''}
      ${ this.sfxListTitle ?
        html`<ul aria-labelledby="list_title_${this.sfxListTitle}">
          ${ this.items.map(item => html`<li>${item.label}</li></ul>`)}` :
        html`<ul>
          ${ this.items.map(item => html`<li>${item.label}</li></ul>`)}`
        }
      `;
    }
  }
