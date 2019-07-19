# Search Box

## Functionality

The component accepts text input and dispatches events based on input.

### Input types:

#### `Hover` over search input

This dispatches the event 'sfx::searchbox_hover_event'. This event is available so that listeners can define a set behaviour on input hover.

#### `Click` on search input

This dispatched the event 'sfx::searchbox_click_event'. This event is available so that listeners can define a set behaviour on input area clicks.

#### Character input within the input box:

#### Enter

Dispatches the event 'sfx::search_request'. This event sends the value to use for the search request.

#### Backspace

If the searchTerm property has more than one character, removes one character from the searchTerm property.
If the searchTerm property has one character, dispatches the 'sfx::search_box_cleared' event and clears the final letter. This event is available so that listeners can define a set behaviour on when the searchbox is cleared (e.g. remove the autocomplete modal).

#### Text Character

Search term property is updated on every text character inputed.
If search term has greater than 3 characters, the 'sfx::autocomplete_request' event is dispatched.

## Customizations

Searchbox allows for optional inclusion of a clear button and a search button. Placeholder text within the search box is also customizable.

## Testing

The test suite for this component is contained in /packages/web-components/@sfx/autocomplete/test.
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
