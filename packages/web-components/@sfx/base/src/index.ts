import { LitElement, customElement, html } from 'lit-element';

const makeSlot = (name?: string) => {
  const slot = document.createElement('slot');
  if (name) {
      slot.name = name;
  }
  return slot;
};
@customElement('sfx-base')
export default class Base extends LitElement {
  observer: any;

  constructor() {
    super();
    this.addSlots();
  }

  addSlots() {
    this.shadowRoot.appendChild(makeSlot('before'));
    this.shadowRoot.appendChild(makeSlot());
    this.shadowRoot.appendChild(makeSlot('after'));
    }

  connectedCallback() {
    super.connectedCallback();
    this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          let mutedNodes = Array.from(mutation.removedNodes)
            mutedNodes.forEach((node) => {
                if (node.nodeType !== Node.COMMENT_NODE) {
                    this.appendChild(node);
                }
            });
        });
    });

    this.observer.observe(this, {
        childList: true,
    });
}

firstUpdate() {
  this.observer.disconnect();
}

createRenderRoot() {
  this.attachShadow({mode: "open"});
  return this;
}

  render() {
    return html`
        <div slot="before">before</div>
        <div>main content</div>
        <div slot="after">after</div>
    `;
}
}
