# GroupBy Elements Search Box Component

## Functionality

The component accepts text input and dispatches events based on input.

This component listens for and dispatches a number of events. These events are defined in the [`@groupby/elements-events`][elements-events] package.

### Received Events

#### `UPDATE_SEARCH_TERM`

This component listens for this event and updates the value property and input box value
with the search term from the event's payload.
Additionally, this event may trigger a search request if the payload contains a trigger.

### Dispatched Events

#### `SEARCHBOX_CLEAR`

Dispatched when a user clicks on the clear button.

#### `SEARCHBOX_CLICK`

Dispatched when a user clicks anywhere within the search box input area.

#### `SEARCHBOX_INPUT`

Dispatched when the value changes inside the search box input.

#### `SEARCH_REQUEST`

Dispatched when a user clicks on the search button or hits `enter` within the search box.
May also be dispatched when receiving an `UPDATE_SEARCH_TERM` event.

## Customizations

The GB Elements Search Box component allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.
Users of the component can add the following attributes to the custom element:
- `clearbutton`: adds clear button
- `searchbutton`: adds search button
- `placeholder`: if populated with a string, will replace the default placeholder text in the search box.
- `group`: Optional attribute to add this component to a grouping of related search components. The component will only act on events if they contain the same group name as the component.

## Testing

The test suite for this component is contained in the `test` directory. To run the tests, use the following commands:

- To run the unit tests once:
```sh
yarn test
```
- To run the unit tests and watch the `src` and `test` directories to rerun the tests after any changes:
```sh
yarn tdd
```

- To run the interaction tests once:
```sh
yarn test:interaction
```
- To run the interaction tests and watch the `src` and `test` directories to rerun the tests after any changes:
```sh
yarn tdd:interaction
```

- To run both the unit and interaction tests once:
```sh
yarn test:all
```

[elements-events]: https://github.com/groupby/elements-events
