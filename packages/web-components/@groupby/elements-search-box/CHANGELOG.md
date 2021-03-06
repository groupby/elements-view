# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2019-12-23
### Added
- ELE-249: The methods `emitSearchEvent()` and `updateSearch()` now accept and pass along `origin` value in search requests.

## [0.1.0] - 2019-11-29
### Added
- SFX-151: Added the SearchBox component.
  - This component takes in search terms from user input and dispatches events accordingly.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
- SFX-148: Added interaction tests for the SearchBox component.
  - Introduced a suite of interaction tests for the SearchBox component.
  - Introduced new utils to support interaction tests.
  - Create interaction test specific commands and karma configurations.
