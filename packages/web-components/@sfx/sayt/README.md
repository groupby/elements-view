# SF-X SAYT (Search As You Type) Component

## Functionality

The `sayt` component acts as a wrapper around the `sfx-autocomplete` and
`sfx-products` components and acts to show and hide all of these components
in response to interactions with the `sfx-search-box` component.

### Received Events

#### `sfx::sayt_show`

Upon receiving this event, the `sayt` component will remove the `hidden`
attribute from itself and display its child elements.

#### `sfx::sayt_hide`

Upon receiving this event, the `sayt` component will apply the `hidden`
attribute to itself and hide its child elements.

## Customization

The SF-X Sayt component allows for the option to not display its children
components. Users of the component can add the following attributes for
particular customizations:

- `hideAutocomplete`: Prevents the `sfx-autocomplete` component from rendering.
- `hideProducts`: Prevents the `sfx-products` component from rendering.
- `showCloseButton`: Displays the close button.
- `closeText`: Allows for the modification of the text used on the close button.

## Testing

The test suite for this component is contained in `/packages/web-components/@sfx/sayt/test`.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```
