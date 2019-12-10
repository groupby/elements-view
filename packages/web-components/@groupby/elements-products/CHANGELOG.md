# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2019-11-29
### Added
- SFX-200: Created the products wrapper.
  - This component renders a series of gbe-product components.
  - SFX-248: The `@groupby/elements-events` package is used for event names and payload interfaces.
  - SFX-354: `gbe-products` and `gbe-products-sayt` extend from `gbe-products-base`
    and listen on Search and SAYT-related events respectively.
