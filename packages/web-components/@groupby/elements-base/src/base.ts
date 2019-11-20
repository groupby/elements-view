import {
  LitElement,
} from 'lit-element';

/**
 * A base component for all GB Elements components to extend. It is based on LitElement.
 */
export default abstract class Base extends LitElement {
  /**
   * Determines whether or not the component has received its initial set of data.
   */
  protected _initialized: boolean = false;

  createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  dispatchElementsEvent<T>(eventName: string, payload?: T): boolean {
    const eventToDispatch = new CustomEvent<T>(eventName, { detail: payload, bubbles: true });
    return this.dispatchEvent(eventToDispatch);
  }
}

export function dataInitializer(initialized: string): PropertyDecorator {
  // eslint-disable-next-line func-names
  return function(target: object, propertyName: string): void {
    const oldDescriptor = Object.getOwnPropertyDescriptor(target, 'results');
    const instanceMap = new WeakMap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function decoratedSetter(newVal: any): void {
      oldDescriptor.set.call(this, newVal);
      if (instanceMap.get(this)) {
        this[initialized] = true;
      } else {
        instanceMap.set(this, true);
      }
    }

    Object.defineProperty(target, propertyName, { ...oldDescriptor, set: decoratedSetter });
  };
}
