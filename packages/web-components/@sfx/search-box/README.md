# Sf-X Search Box Component

## Functionality

The component accepts text input and dispatches events based on input.

### Events

#### `sfx::searchbox_hover_event`

Dispatched when a user hovers over the search box.

#### `sfx::searchbox_click_event`

Dispatched when a user clicks anywhere within the search box input area.

#### `sfx::search_request`

Dispatched when a user clicks on the search button on hits `enter` within the search box. This event sends the search term value entered into the search box.

#### `sfx::search_box_cleared`

Dispatched when the value within the search box area is cleared. Occurs when a user clicks on the clear button, or when the final letter is removed from the search term.

#### `sfx::autocomplete_request`

Dispatched when the search term value within the search box contains more than 3 characters. This event sends the search term value entered into the search box.

## Customizations

The SF-X Search Box component allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.
Users of the component can add the following attributes to the custom element:
`clearbutton`: adds clear button
`searchbutton`: adds search button
`placeholdertext`: if populated with a string, will replace the default placeholder text in the input box.

## Testing

The test suite for this component is contained in /packages/web-components/@sfx/search-box/test.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```
