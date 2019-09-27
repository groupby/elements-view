# SF-X Search Box Component

## Functionality

The component accepts text input and dispatches events based on input.

### Events

#### `sfx::searchbox_clear`

Dispatched when a user clicks on the clear button.

#### `sfx::searchbox_click`

Dispatched when a user clicks anywhere within the search box input area.

#### `sfx::search_request`

Dispatched when a user clicks on the search button or hits `enter` within the search box. This event sends the search term value entered into the search box.

#### `sfx::searchbox_input`

Dispatched when the value changes inside the search box input.

#### `sfx::update_search_term`

This component listens for this event, whose payload is the search term, and updates the value property and input box value with the event's payload.

## Customizations

The SF-X Search Box component allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.
Users of the component can add the following attributes to the custom element:
- `clearbutton`: adds clear button
- `searchbutton`: adds search button
- `placeholder`: if populated with a string, will replace the default placeholder text in the search box.
- `group`: Optional attribute to add this component to a grouping of related search components.

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
