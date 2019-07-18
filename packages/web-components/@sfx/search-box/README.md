# Search Box

## Functionality
The component accepts text input and dispatches events based on input.

### hover over search input
This dispatches the event 'sfx::searchbox_hover_event'. This event is available so that listeners can define a set behaviour on input hover.

### click on search input
This dispatched the event 'sfx::searchbox_click_event'. This event is available so that listeners can define a set behaviour on input area clicks.

### character input within the input box:
#### Enter
Dispatches the event 'sfx::search_request'. This event sends the input value to use for a search request.

### Backspace
If input value is greater than 1, removes one character from the searchTerm property.
If the input value is 1, dispatches the 'sfx::search_box_cleared' event. This event is available so that listeners can define a set behaviour on when the searchbox is cleared (e.g. remove the autocomplete modal).

### Text Character


## Customizations
