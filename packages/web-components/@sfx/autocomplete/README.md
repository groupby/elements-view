# SF-X Autocomplete Component

## Functionality

The Autocomplete component displays search terms related to a query term. It also dispatches events whenever these search terms are interacted with.

This component listens for and dispatches a number of events. These events are defined in the [`@sfx/events`][sfx-events] package.

### Recieved Events

#### `AUTOCOMPLETE_RESPONSE`

Upon receiving this event, the `sfx-autocomplete` component will populate its `results` property with search terms.

### Dispatched Events

#### `AUTOCOMPLETE_ACTIVE_TERM`

This event is dispatched when one of the search terms inside of the `sfx-autocomplete` component is put in the active state or hovered on.

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

[sfx-events]: https://github.com/groupby/sfx-events
