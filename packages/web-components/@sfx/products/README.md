# SF-X Products Component

## Functionality
The `sfx-products` component acts as a wrapper around a series of individual
`sfx-product` components. It uses a list of information about products
and passes each item to a single product for rendering.

### Received Events

#### `sfx::provide-products`
Upon receiving this event, the `sfx-products` component will accept
the passed products data and update/add/remove any child product tiles.

## Customization
This component does not have any customization attributes.

## Testing
The test suite for this component is contained in `/packages/web-components/@sfx/products/test`.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

 ```sh
yarn test
```

- To run the tests on every change:

```sh
yarn tdd
```
