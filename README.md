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
* Top Create New ID button loader
* Left Bar logo and breadcrumb/title must be aligned
* Only the left content should scroll, topbar and leftbar not
* **IMPORTANT** When a vault is created, app initialization must be done (App.vue/beforeCreate)
* **IMPORTANT** Wallets, devices does not lead to a real page
* Remove app.scss from every component, it's only needed in the App.vue

**Vault Creation**
* Vault validation must be easier, we have to try out how others solve the issue

**DID List View**
* We need more compact cards
* **IMPORTANT** Remove how much claim/key it has

**Single DID View**
* Client side auto image resizing to 64k max
* Validate alias field
* A little bit more userfriendly design

**Claim Creation**
* Validate claim schema dynamic components too

**Single Claim View**
* **IMPORTANT** At least have a TODO page for it