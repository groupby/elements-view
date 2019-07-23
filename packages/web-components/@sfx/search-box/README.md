# SF-X Search Box Component

## Functionality

The component accepts text input and dispatches events based on input.

### Events

#### `sfx::searchbox_clear_click`

Dispatched when a user clicks on the clear button.

#### `sfx::searchbox_click_event`

Dispatched when a user clicks anywhere within the search box input area.

#### `sfx::searchbox_hover_event`

Dispatched when a user hovers over the search box.

#### `sfx::search_request`

Dispatched when a user clicks on the search button or hits `enter` within the search box. This event sends the search term value entered into the search box.

#### `sfx::on_searchbox_change`

Dispatched when the value changes inside the search box input.

#### `sfx::update_search_term`

Fired with a term as the payload. This component listens for that event and updates the value property and input box value with the payload.

## Customizations

The SF-X Search Box component allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.
Users of the component can add the following attributes to the custom element:
`clearbutton`: adds clear button
`searchbutton`: adds search button
`placeholder`: if populated with a string, will replace the default placeholder text in the search box.

## Testing

The test suite for this component is contained in the `test` directory. To run the tests, navigate to this folder and use the following command:

```sh
yarn test
```
