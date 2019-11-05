# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- SFX-191: Added the `sayt` component.
  - This component renders `sayt` related components such as `gbe-autocomplete` and `gbe-products-sayt`.
  - SFX-333: It emits events for requesting products and autocomplete terms.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
  - SFX-380: With a paired searchbox, the autocomplete selection can be changed using the Up and Down arrow keys.
