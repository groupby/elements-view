import { LitElement } from 'lit-element';

export default class Base extends LitElement {
  protected slots: Slot[];

  createRenderRoot() {
    const slots: Slot[] = [];

    this.childNodes.forEach((node: any) => {
      const { slot, outerHTML } = node;

      if ( slot && outerHTML ) {
        slots.push({ slot, outerHTML });
      }
    });

    this.slots = slots;

    return this;
  }

  firstUpdated() {
    this.slots.forEach(slot => {
      try {
        const newNode = document.createRange().createContextualFragment(slot.outerHTML);
        const oldNode = this.querySelector(`slot[name="${slot.slot}"]`);
        if (oldNode) {
          this.replaceChild(newNode, oldNode);
        } else {
          throw new Error(`No slot with the name ${slot.slot}`);
        }
      } catch (err) {
        console.log(err);
      }
    }); 
  }
}

export interface Slot {
  slot: string;
  outerHTML: string;
}
