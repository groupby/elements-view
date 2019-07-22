# Sf-X Search Box Component

## Functionality

The component accepts text input and dispatches events based on input.

### Input types

#### `Hover` over search box

Dispatches the event `sfx::searchbox_hover_event`. This event is available so that listeners can define a set behaviour on search box hover.

#### `Click` on search box

Dispatches the event `sfx::searchbox_click_event`. This event is available so that listeners can define a set behaviour on search box area clicks.

#### Character input within the search box:

#### Enter

Dispatches the event `sfx::search_request`. This event sends the value to use for the search request.

#### Backspace

If the searchTerm property has more than one character, one character is removed from the searchTerm property.
If the searchTerm property has one character, the `sfx::search_box_cleared` event is dispatched and the final letter is removed from the searchTerm property. The `sfx::search_box_cleared` event is available so that listeners can define a set behaviour when the search box is cleared.

#### Text Character

Search term property is updated on every text character inputed.
If the searchTerm property has more than 3 characters, the `sfx::autocomplete_request` event is dispatched.

## Customizations

The SF-X Search Box component allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.
Users of the component can add the following attributes to the custom element:
`clearbutton` <- adds clear button
`searchbutton` <- adds search button
`placeholdertext` <- if populated with a string, will replace the default placeholder text in the input box.

## Testing

The test suite for this component is contained in /packages/web-components/@sfx/search-box/test.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories to rerun the tests after any changes:

```sh
yarn tdd
``
```
