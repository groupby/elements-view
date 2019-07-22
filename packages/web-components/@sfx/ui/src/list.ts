import { customElement, html, property } from 'lit-element';
import { Base } from '@sfx/base';

/**
 * Receives data to populate into a list.
 */
@customElement('sfx-list')
export default class List extends Base {
  /**
   * The text used in the header.
   */
  @property({ type: String, reflect: true }) sfxListTitle: string = '';
  /**
   * List data used to generate list.
   */
  @property({ type: Array }) items: Array<any> = [];

  render() {
    return html`
      ${this.sfxListTitle
        ? html`
            <h4 id="list_title_${this.sfxListTitle}">${this.sfxListTitle}</h4>
            <ul aria-labelledby="list_title_${this.sfxListTitle}">
              ${this.items.map(
                item =>
                  html`
                    <li>${item.label}</li>
                  `
              )}
            </ul>
          `
        : html`
            <ul>
              ${this.items.map(
                item =>
                  html`
                    <li>${item.label}</li>
                  `
              )}
            </ul>
          `}
    `;
  }
}
