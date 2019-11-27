/* eslint-disable import/prefer-default-export */

/**
 * A property decorator that will set the data initialization state in a class.
 * It will extend the property's setter to set the initialization state to true.
 * This expects that the property already has defined accessors and a default value.
 *
 * @param initProperty The name of the initialization property.
 */
export function dataInitializer(initProperty: string = '_initialized'): PropertyDecorator {
  return (target: object, propertyName: string): void => {
    const oldDescriptor = Object.getOwnPropertyDescriptor(target, propertyName);
    const instanceMap = new WeakMap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function decoratedSetter(newVal: any): void {
      oldDescriptor.set.call(this, newVal);
      if (instanceMap.get(this)) {
        this[initProperty] = true;
      } else {
        instanceMap.set(this, true);
      }
    }

    Object.defineProperty(target, propertyName, { ...oldDescriptor, set: decoratedSetter });
  };
}
