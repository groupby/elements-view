import { LitElement, customElement, html, property } from 'lit-element';
// import ExampleBestBoxItem, { BoxItem } from './item';
import './item';

@customElement('example-best-box')
export class ExampleBestBox extends LitElement { // BaseComponent will replace LitElement
  @property({ type: Array }) items = [];

  render() {
    return html`
      ${
        this.items.map(item =>
          html`<example-best-box-item
            name="${item.name}" 
            price="${item.price}" 
            rating="${item.rating}"
            .dimensions="${item.dimensions}" 
          ></example-best-box-item>`
        )
      }
    `;
  }
}
