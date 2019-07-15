# Prometheus UI

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

## TODOs

**Common**
* Tried to update eslint to the latest version, but it caused: `Error: Failed to load plugin 'vue' declared in 'package.json': Cannot find module 'eslint/lib/util/traverser'
Referenced from: package.json`
* Global error handling if something happens in the store or during API calls or in javascript
* Make the app responsive
* Only the left content should scroll, topbar and leftbar not

**Vault Creation**
* Vault validation must be easier, we have to try out how others solve the issue

**Claim Creation**
* Validate claim schema dynamic components too
