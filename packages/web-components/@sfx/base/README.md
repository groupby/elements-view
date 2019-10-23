# SF-X Base

## Functionality

This class extends [LitElement](https://lit-element.polymer-project.org/) and is the class that all components will extend.
Any shared functionality should be contained within this class.

#### Dispatching Events

This class contains a generic dispatch event function, `dispatchSfxEvent`. The `dispatchSfxEvent` function constructs a CustomEvent with properties that are common across the SF-X components. This function can be used across all components that extend Base to dispatch events.

#### Rendering the Light DOM

All components that extend this component, will be rendered in the Light DOM.

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
