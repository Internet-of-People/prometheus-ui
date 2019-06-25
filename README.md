# Prometheus UI

## Table of Contents

1. [Project setup](#project-setup)
    1. [Dev Stylesheets](#dev-stylesheets)
    2. [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    3. [Compiles and minifies for production](#compiles-and-minifies-for-production)
    4. [Run your tests](#run-your-tests)
    5. [Lint and fix files](#lint-and-fix-files)
2. [Vuejs Guidelines](#vuejs-guidelines)

## Project setup

```bash
yarn install
```

### Dev Stylesheets

```bash
cd src/assets/css/
compass watch --poll
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lint and fix files

```bash
yarn run lint
```

## Vuejs Guidelines

[Styling Guide](https://vuejs.org/v2/style-guide/)

## Notes

* Tried to update eslint to the latest version, but it caused: `Error: Failed to load plugin 'vue' declared in 'package.json': Cannot find module 'eslint/lib/util/traverser'
Referenced from: package.json`
* Error handling if something happens in the store or during API calls
* Loading logic maybe