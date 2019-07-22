# SF-X Autocomplete Component

## Functionality

The component listens for an event, which is fired when the autocomplete data is received.
The component then populates a list with the received data.

## Customizations

Autocomplete allows for an optional title (string value), which populates inside an h3. View fourth Storybook story for demonstration of functionality.
All other customizations will be inherited from SAYT.

## Testing

The test suite for this component is contained in /packages/web-components/@sfx/autocomplete/test.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories to rerun the tests after any changes:

```sh
yarn tdd
```
