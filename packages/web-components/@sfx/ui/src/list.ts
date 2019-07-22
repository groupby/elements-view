import { customElement, html, property } from 'lit-element';
import { Base } from '@sfx/base';
import * as shortid from 'shortid';

/**
 * Receives data to populate into a list.
 */
@customElement('sfx-list')
export default class List extends Base {
  /**
   * The text used in the header.
   */
  @property({ type: String, reflect: true }) caption: string = '';
  /**
   * List data used to generate list.
   */
  @property({ type: Array }) items: any[] = [];

  private randomStringId = shortid.generate();

  render() {
    return html`
      ${this.caption
        ? html`
            <h4 id="sfx-list-title-${this.randomStringId}">${this.caption}</h4>
            <ul aria-labelledby="sfx-list-title-${this.randomStringId}">
              ${this.items.map(item => html`<li>${item.label}</li>`)}
            </ul>
          `
        : html`
            <ul>
              ${this.items.map(item => html`<li>${item.label}</li>`)}
            </ul>
          `}
    `;
  }
}
