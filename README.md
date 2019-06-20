# SFX View
SFX View SDK containing pre-built web components for for creating e-commerce application interfaces.

## Installation
To clone this repo with submodules run:
```
git clone --recursive https://github.com/groupby/sfx-view
```
or if the repo is already cloned and you want to install submodules only, run:
```
git submodule update --init
```

## Setup
Run the `./scripts/setup.sh` script to build all of the SFX-View packages.
```sh
  ./scripts/setup.sh
```

## Commands
The following commands are run in the context of an individual package contained within the SFX-View monorepo. The individual Web component packages can be found within the [`packages/web-components/@sfx`](packages/web-components/@sfx) directory.

### Building packages
To build an individual package, run the following command:
```sh
yarn build
```

To build an individual package in response to changes within the `src` directory, run the following command:
```sh
yarn dev
```
##Documentation
The following command will generate documentation for each module in packages/sfx using typeDoc. This will update the index file in the docs folder.
```sh
yarn docs
```

## Bundling
To bundle the SFX-View packages, run the following command at the root of the monorepo:
```sh
yarn bundle
```

The resulting bundles can be found within the `dist` directory at the root of the repo.
