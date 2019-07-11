# Autocomplete

## Functionality
The component listens for an event, which is fired when the autocomplete data is received. 
The component then populates a list with the received data.

## Customizations
Customizations will be inherited from SAYT.

## Testing
The test suite for this component is contained in /packages/web-components/@sfx/autocomplete/test.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests for a specific package once:
```sh
yarn test
```
- To run the tests for a specific package and watch the `src` and `test` directories to rerun the tests after any changes:
```sh
yarn tdd
```
