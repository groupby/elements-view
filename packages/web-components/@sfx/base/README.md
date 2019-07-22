# SF-X Base

## Functionality

This class extends [LitElement](https://lit-element.polymer-project.org/) and is the class that all components will extend.
Any shared functionality should be contained within this class.

### Slots

A POC of slot functionality is contained within this class.
This functionality allows for components to insert slots into the light dom.
The method utilized does make use of the shadow-dom, however, the slots are rendered in the context of the custom element.
The current default adds slotted content after the content contained within the custom element, but within the custom element itself.

## Testing

The test suite for this component is contained in the `test` directory.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories for changes:

```sh
yarn tdd
```
