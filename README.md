# Prometheus UI

This repository contains the UI code of the Prometheus desktop application. The UI is implemented
with [VueJS](https://vuejs.org/) and [Bootstrap VUE](https://bootstrap-vue.js.org/).

## Table of Contents <!-- omit in toc -->

- [Background](#Background)
- [Install](#Install)
  - [Prerequisites](#Prerequisites)
  - [Development Environment](#Development-Environment)
- [Maintainers](#Maintainers)
- [Contributing](#Contributing)
- [License](#License)
- [TODOs](#TODOs)


## Background

This application is one of the user-installable applications's UI that give access to
the [IoP Stack](https://iop.global/the-iop-stack/)™.

## Install

### Prerequisites

You need the latest [Yarn](https://yarnpkg.com/en/) to be installed.

```sh
$ yarn --version
1.17.3
```

### Development Environment

```sh
# install the dependencies
yarn install
```

```sh
# compiles and hot-reloads for development
yarn run serve
```

```sh
# lints and fixes files
yarn run lint
```

```sh
# run your end-to-end tests
yarn run test:e2e
```

```sh
# run your unit tests
yarn run test:unit
```

## Maintainers

* [@mudlee](https://github.com/mudlee)
* [@wigy_opensource_developer](https://github.com/wigy_opensource_developer)
* [@dalekatwork](https://github.com/dalekatwork)

## Contributing

PRs that are inline with our goals to the core Prometheus user experience are
more than welcome. To avoid losing precious time you spend on coding, you could
open an issue first and discuss what you are up to before forking and sending us
a PR.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[GPL-3.0 or later](https://spdx.org/licenses/GPL-3.0-or-later)
© 2019 Decentralized Society Foundation, PA


## TODOs

**Common**
* Tried to update eslint to the latest version, but it caused: `Error: Failed to load plugin 'vue' declared in 'package.json': Cannot find module 'eslint/lib/util/traverser'
Referenced from: package.json`
* Global error handling if something happens in the store or during API calls or in Javascript
* Make the app fully responsive
* Only the left content should scroll, topbar and leftbar should not
* Fix potential security vulnerabilities indicated by Github

**Vault Creation**
* Vault validation must be easier, we have to try out how others solved this issue

**Claim Creation**
* Validate claim schema's dynamic components during claim creation
