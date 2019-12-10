# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] [minor]
### Fixed
- ELE-249: Fixed error where `requestUpdateSearchTerm()` would error if no term is selected.

### Added
- ELE-249: Passed an `origin` of 'sayt' when triggering an update of the search term.

## [0.1.0] - 2019-11-29
### Added
- SFX-152: Added the autocomplete component.
  - This component renders a list of autocomplete terms.
  - SFX-333: The component emits an event when an autocomplete term is hovered.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
