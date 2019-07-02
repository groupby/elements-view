import { LitElement, customElement, html, property } from 'lit-element';
import '@sfx/ui';

@customElement('sfx-autocomplete')
export class Autocomplete extends LitElement {
  @property({ type: Array }) results = [];

  render() {
    return html`
    ${this.results.map(list => 
      html`<sfx-list .title=${list.title === 'default' ? '' : list.title} .items=${list.items}></sfx-list> 
      `)}
    `;
  }
}

