/* istanbul ignore file */

export function makeSlot(name?: string) {
  const slot = document.createElement('slot');
  if (name) {
      slot.name = name;
  }
  return slot;
}

export function createChildrenObserver() {
  return new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let mutedNodes = Array.from(mutation.removedNodes)
        mutedNodes.forEach((node) => {
            if (node.nodeType !== Node.COMMENT_NODE) {
                this.appendChild(node);
            }
        });
    });
});
}
