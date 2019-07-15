/* istanbul ignore file */

export function makeSlot(name?: string) {
  const slot = document.createElement('slot');
  if (name) {
    slot.name = name;
  }
  return slot;
}

export function createChildrenObserver(root: any) {
  return new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let mutedNodes = Array.from(mutation.removedNodes)
      mutedNodes.forEach((node) => {
        if (node.nodeType !== Node.COMMENT_NODE) {
          root.appendChild(node);
        }
      });
    });
  });
}

/**
 * The above functions were pulled 
 * directly from https://github.com/Polymer/lit-element/issues/42#issuecomment-442894676.
 */
