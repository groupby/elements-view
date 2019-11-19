# GroupBy Elements Autocomplete Component

## Functionality

The Autocomplete component displays search terms related to a query term. It also dispatches events whenever these search terms are interacted with.

### Term Selection

At most one term is selected at any given time.
When a term is selected, the `aria-selected` property for the item is set to `true`.

The `selectedIndex` property determines which item is selected;
this value is the 0-based index of the selected item relative to the first item of the entire results.
This property can be set to change the selection.
If the value is outside the range of results (including negative values), no item will be selected.

The read-only `selectedId` property contains the DOM ID of the currently selected item.

The selection can be changed in one of three ways:

* Hovering over a term.
  Hovering over a term will change the selection immediately.
* Using `selectNext()` and `selectPrevious()`.
  These methods will select the next and previous items in the list respectively.
  If the selection falls off one end, it will wrap around to the other end.
* Setting the `selectedIndex` property.
  The item at the index given by `selectedIndex` will be selected.
  If there is no item at that index (i.e. if `selectedIndex` is negative or if
  it is past the end of the list), no items will be selected.

### Recieved Events

This component listens for a number of events. These events are defined in the [`@groupby/elements-events`][elements-events] package.

#### `AUTOCOMPLETE_RESPONSE`

Upon receiving this event, the `gbe-autocomplete` component will populate its `results` property with search terms.

### Dispatched Events

This component dispatches a number of events. These events are defined in the [`@groupby/elements-events`][elements-events] package.

#### `AUTOCOMPLETE_ACTIVE_TERM`

This event is dispatched when one of the search terms inside of the `gbe-autocomplete` component is put in the active state or hovered on.

#### `UPDATE_SEARCH_TERM`

This event is dispatched when one of the search terms inside of the `gbe-autocomplete` component is clicked, or selected via pressing `enter`.
It will contain a flag for emitting a new search.

## Customizations

- `caption`: Optional attribute to create and populate an `<h3>` tag at the top of the Autocomplete component.
- `group`: Optional attribute to add the `sayt` component to a grouping of related search components. The component will only act on events if they contain the same group name as the component.

## Testing

The test suite for this component is contained in the `test` directory.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories to rerun the tests after any changes:

```sh
yarn tdd
```

[elements-events]: https://github.com/groupby/elements-events
