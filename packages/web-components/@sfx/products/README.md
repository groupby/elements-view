# SF-X Products Component

## Functionality
The Products component acts as a wrapper around a series of individual
`sfx-product` components. It uses a list of information about products
and passes each item to a single product for rendering.

There are three versions of the Products component:
- `sfx-products-base`
- `sfx-products-sayt`
- `sfx-products`

### sfx-products-base
The base component can be used to display product data directly through attributes; however, it does not listen to any events for product data. It can be extended for event listening by adding an event listener for a desired event with the `setProductsFromEvent()` callback in the component's `connnectedCallback()`.

Ex.
```js
connectedCallback() {
  super.connectedCallback();

  window.addEventListener(EVENT_NAME, this.setProductsFromEvent);
}
```

*NOTE: This component is not meant to be used directly, but is provided as an option to extend and create a custom Products component.*

### sfx-products-sayt
The Sayt version of the Products component is used inside of a Sayt component. It listens for the `sfx::provide-products` event and will update its product grid with the event's payload.

### sfx-products
The Search version of the Products component is used to display search results. It listens for the `sfx::search_response` event and will update its product grid with the event's payload.

## Customization
### Group
This optional attribute will add a Products component to a grouping of related components that communicate with each other. It can be used on any of the Products components.

Ex.
```html
<sfx-products group="search-group-1"></sfx-products>
```

*NOTE: This attribute is unnecessary if there is only one group and sayt pairing and one product search results grid on the webpage.*

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
