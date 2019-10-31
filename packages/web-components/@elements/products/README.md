# GB Elements Products Component

The Products component acts as a wrapper around a series of individual
`sfx-product` components. It uses a list of information about products
and passes each item to a single product for rendering.

There are three versions of the Products component:
- `sfx-products-base`
- `sfx-products-sayt`
- `sfx-products`

## sfx-products-base

### Functionality

The base component can be used to display product data directly through attributes; however, it does not listen to any events for product data.

**NOTE:** This component is not meant to be used directly, but is provided as an option to extend and create a custom Products component.

### Customization

#### Group

This optional attribute will add a Products component to a grouping of related components that communicate with each other. The component will only act on events if they contain the same group name as the component. It can be used in any of the Products components.

Ex.
```html
<sfx-products group="search-group-1"></sfx-products>
```

**NOTE:** This attribute is unnecessary if there is only one group and sayt pairing and one product search results grid on the webpage.

## sfx-products-sayt

### Functionality

The Sayt version of the Products component is used inside of a Sayt component. It is extended from the `sfx-products-base` component.

This component listens for and dispatches a number of events. These events are defined in the [`@elements/events`][sfx-events] package.

### Received Events

#### `SAYT_PRODUCTS_RESPONSE`

Upon receiving this event, the `sfx-products-sayt` component will populate the `products` property and render the data.

## sfx-products

### Functionality

The Search version of the Products component is used to display search results. It is extended from the `sfx-products-base` component.

This component listens for and dispatches a number of events. These events are defined in the [`@elements/events`][sfx-events] package.

### Received Events

#### `SEARCH_RESPONSE`

Upon receiving this event, the `sfx-products` component will populate the `products` property and render the data.

## Testing

The test suite for this package is contained in `/packages/web-components/@elements/products/test`.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

 ```sh
yarn test
```

- To run the tests on every change:

```sh
yarn tdd
```

[sfx-events]: https://github.com/groupby/sfx-events
