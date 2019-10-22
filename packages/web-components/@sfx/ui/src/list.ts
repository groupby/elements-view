import {
  customElement,
  html,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
// eslint-disable-next-line import/no-unresolved
import { ifDefined } from 'lit-html/directives/if-defined';
import * as shortid from 'shortid';

/**
 * Receives data to populate into a list.
 */
@customElement('sfx-list')
export default class List extends LitElement {
  /**
   * The text used in the header.
   */
  @property({ type: String, reflect: true }) caption: string = '';

  /**
   * List data used to generate list.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property({ type: Array }) items: any[] = [];

  private randomStringId = shortid.generate();

  render(): TemplateResult {
    const idString = `sfx-list-title-${this.randomStringId}`;
    const header = html`<h4 id="${idString}">${this.caption}</h4>`;
    const searchTermItems = this.items.map((item) => html`<li>${item.label}</li>`);
    const searchTermList = html`<ul aria-labelledby="${ifDefined(this.caption ? idString : undefined)}">${searchTermItems}</ul>`;

    return html`
      <style>
        sfx-list > ul {
          list-style: none;
        }
      </style>
      ${this.caption ? header : ''}
      ${searchTermList}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
