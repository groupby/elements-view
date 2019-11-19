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
  return function(target: Record<string, any>, propertyName: string): void {
    console.log('initializer props', target, propertyName);
    const oldDescriptor = Object.getOwnPropertyDescriptor(target, 'results');
    function decoratedSetter(newVal: any): void {
      console.log('decoratedSetter');
      console.log('target results', this[propertyName]);
      console.log(`target ${initialized} value in setter`, this[initialized]);
      console.log('results new value in setter', newVal);
      oldDescriptor.set.call(this, newVal);
      this[initialized] = true;
    }

    Object.defineProperty(target, propertyName, { ...oldDescriptor, set: decoratedSetter });
  };
}
