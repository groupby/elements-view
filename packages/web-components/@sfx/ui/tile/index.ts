import { LitElement, customElement, property, html } from 'lit-element';

@customElement('sfx-tile')
export class Tile extends LitElement {
  render() {
    return html`
      <div class="sfx-tile">
        <slot></slot>
      </div>
    `;
  }
}
