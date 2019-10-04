import {
  customElement,
  html,
  property,
  LitElement,
  TemplateResult,
} from 'lit-element';
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
    return html`
      <style>
        sfx-list > ul {
          list-style: none;
        }
      </style>
      ${this.caption
    ? html`
            <h4 id="sfx-list-title-${this.randomStringId}">${this.caption}</h4>
            <ul aria-labelledby="sfx-list-title-${this.randomStringId}">
              ${this.items.map(
    (item) => html`
                    <li>${item.label}</li>
                  `
  )}
            </ul>
          `
    : html`
            <ul>
              ${this.items.map(
    (item) => html`
                    <li>${item.label}</li>
                  `
  )}
            </ul>
          `}
    `;
  }

  createRenderRoot(): Element|ShadowRoot {
    return this;
  }
}
