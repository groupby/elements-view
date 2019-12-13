# Changelog
All notable changes to this project will be documented in this file.
**Do not edit this file. It is automatically generated.**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2019-11-29

Package versions:

- `@groupby/elements-autocomplete`: 0.1.0
- `@groupby/elements-base`: 0.1.0
- `@groupby/elements-product`: 0.1.0
- `@groupby/elements-products`: 0.1.0
- `@groupby/elements-sayt`: 0.1.0
- `@groupby/elements-search-box`: 0.1.0

### Added
#### autocomplete
- SFX-152: Added the autocomplete component.
  - This component renders a list of autocomplete terms.
  - SFX-333: The component emits an event when an autocomplete term is hovered.

#### base
- SFX-152: Added the Base class.

#### product
- SFX-201: Created `gbe-product` and `gbe-product-variant` components.
  - These components render product tiles with or without variant options.

#### products
- SFX-200: Created the products wrapper.
  - This component renders a series of gbe-product components.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
  - SFX-354: `gbe-products` and `gbe-products-sayt` extend from `gbe-products-base`

#### sayt
- SFX-191: Added the `sayt` component.
  - This component renders `sayt` related components such as `gbe-autocomplete` and `gbe-products-sayt`.
  - SFX-333: It emits events for requesting products and autocomplete terms.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.

#### search-box
- SFX-151: Added the SearchBox component.
  - This component takes in search terms from user input and dispatches events accordingly.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
- SFX-148: Added interaction tests for the SearchBox component.
  - Introduced a suite of interaction tests for the SearchBox component.
  - Introduced new utils to support interaction tests.