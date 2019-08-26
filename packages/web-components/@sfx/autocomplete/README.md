# SF-X Autocomplete Component

## Functionality

The component listens for an event, which is fired when the autocomplete data is received.
The component then populates a list with the received data.

## Customizations

Autocomplete allows for an optional title, which populates inside an `<h3>` tag. The title text is populated via the `caption` attribute.

## Testing

The test suite for this component is contained in the `test` directory.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories to rerun the tests after any changes:

```sh
yarn tdd
```
