# GroupBy Elements View
GroupBy Elements View SDK containing pre-built web components for for creating e-commerce application interfaces.

## Installation
To clone this repo with submodules run:
```
git clone --recursive https://github.com/groupby/elements-view
```
or if the repo is already cloned and you want to install submodules only, run:
```
git submodule update --init
```

## Setup
Run the `./scripts/setup.sh` script to build all of the Elements-View packages.
```sh
  ./scripts/setup.sh
```

## Demoing

To demo all components and their interaction with the Logic Layer, open [`demo/demo.html`](demo/demo.html) in a browser. Note that Beacons functionality will only work if the demo is served with an HTTP server such as [`http-server`](https://www.npmjs.com/package/http-server).

## Commands
The following commands are run in the context of an individual package contained within the Elements-View monorepo. The individual Web component packages can be found within the [`packages/web-components/@groupby`](packages/web-components/@groupby) directory.

### Building packages
To build an individual package, run the following command:
```sh
yarn build
```

To build an individual package in response to changes within the `src` directory, run the following command:
```sh
yarn dev
```

### Testing
Tests are run with [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/) with the [Karma test runner](https://karma-runner.github.io/latest/index.html) in a browser environment. The following browsers are currently tested:

- Chrome

To run the tests for all web component packages together, run the following command:
```sh
yarn test
```

To run unit tests for a specific web component package, navigate to its directory and use one of the following commands based on the desired testing flow:

- To run the unit tests for a specific package once:
```sh
yarn test
```
- To run the unit tests for a specific package and watch the `src` and `test` directories to rerun the tests after any changes:
```sh
yarn tdd
```

- To run the interaction tests for a specific package once:
```sh
yarn test:interaction
```
- To run the interaction tests for a specific package and watch the `src` and `test` directories to rerun the tests after any changes:
```sh
yarn tdd:interaction
```

- To run both the unit and interaction tests for a specific package once:
```sh
yarn test:all
```

Test coverage is also provided using [Istanbul](https://github.com/istanbuljs/istanbuljs).

When starting a new component, create new `setup.ts` and `utils.ts` files in its new `tests` directory. These files will make the same files from the root `test-tools` directory available through imports and exports.

Ex.
- utils.ts
```js
export * from '../../../../../test-tools/utils';
```
- setup.ts
```js
import '../../../../../test-tools/setup';
```

Keywords from the testing frameworks can then be imported to your test files from `utils.ts`.

### Functional end-to-end testing

Functional tests are run with [Testcafe](https://devexpress.github.io/testcafe/), which run in each browser environment configured. The following browsers are currently tested:

- Chrome
- Firefox

To run the tests for all browsers together, run the following command in the root directory:
```sh
yarn test:functional:all
```

- To run the tests for Chrome only:
```sh
yarn test:functional:chrome
```

- To run the tests for Firefox only:
```sh
yarn test:functional:firefox
```

### Themes

Styled themes are available for components in the `./themes` folder. These can be viewed and developed by using Storybook and by running two active terminal processes:

```sh
yarn storybook
yarn dev:themes
```

These will run Storybook and watch the `./themes` directory for all changes to `.scss` files. Themes can be toggled in the `CSS Resources` addon tab.

## Linting
This project ships with an [ESLint](https://eslint.org/) configuration to enforce a consistent code style across `*.ts` files.

### Package-specific linting

The following commands are run in the context of an individual package contained within the Elements-View monorepo. The individual web component packages can be found within the [`packages/web-components/@groupby`](packages/web-components/@groupby) directory.

To lint files for an individual package, navigate to its directory and use one of the following commands.

- To lint the files under the `src` directory for an individual package:
```sh
yarn lint:scripts
```

- To lint the files under the `stories` directory for an individual package:
```sh
yarn lint:stories
```

- To lint the files under the `test` directory for an individual package:
```sh
yarn lint:tests
```

To run the automated lint fixes for an individual package, navigate to its directory and use one of the following commands.

- To run automated lint fixes on the files under the `src` directory for an individual package:
```sh
yarn lint:scripts:fix
```

- To run automated lint fixes on the files under the `stories` directory for an individual package:
```sh
yarn lint:stories:fix
```

- To run automated lint fixes on the files under the `test` directory for an individual package:
```sh
yarn lint:tests:fix
```

### Project-wide linting

To lint all the Elements-View packages at once, run the following commands at the root of the monorepo:

- To lint all files within each package's `src` and `stories` directories:
```sh
yarn lint:scripts
```

- To lint all files within each package's `test` directory:
```sh
yarn lint:tests
```

- To run automated lint fixes on all files within each package's `src` and `stories` directories:
```sh
yarn lint:script:fix
```

- To run automated lint fixes on all files within each package's `test` directory:
```sh
yarn lint:tests:fix
```

## Documentation
The following command will generate documentation for each module in the `packages` directory. It uses [TypeDoc](https://typedoc.org/) and outputs to the `docs` directory.
```sh
yarn docs
```

## Bundling
To bundle the Elements-View packages, run the following command at the root of the monorepo:
```sh
yarn bundle
```

The resulting bundles can be found within the `dist` directory at the root of the repo.

## Storybook

The command to run the storybook application is:
```
yarn storybook
```

To create a new story, in the component directory create a new directory called `stories/` and in that directory write the stories in `index.ts`.

```
/packages/web-components/@groupby/
|-- component
|   |-- src
|   |   |-- index.ts
|   |-- stories
|   |   |-- index.ts
```

Storybook reference links:
- [Writing Stories](https://storybook.js.org/docs/basics/writing-stories/)
- [Using Knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

\* One note about using knobs is that you have to use the **`text`** method for defining `array` or `object` properties for lit-element.
