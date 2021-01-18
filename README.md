## echrome
A custom test runner for Jest that runs tests inside an [electron](https://electronjs.org/) main or renderer process providing the following benefits:

- Main
  - all electron instance modules (ipc, app, etc)

- Renderer
  - full access to a browser environment without the need for jsdom or similar modules

Running your jest tests in the renderer process allows for e2e client/server testing in the same process. This allows for *very* fast e2e tests.

## Getting Started

*NOTE: requires `jest@>=24`*

1. Install echrome `yarn add echrome --dev`
2. Add one of these lines to your jest config (in `package.json` or inside your `jest.config.js` file), depending on the process you wish to test. If you wish to test them in parallel, see the tips section below.

    - Main process (only necessary for testing electron main processes, if you're into that)
    ```js
        {
          // ...
          runner: 'echrome/main',
          testEnvironment: 'node',
        }
    ```
    - Renderer Process
    ```js
        {
          // ...
          runner: 'echrome',
          testEnvironment: 'echrome/environment',
        }
    ```
3. run jest!

### Tips
- To run the main (or node) and renderer process tests in parallel, you can provide a config object to the `projects` array in a jest javascript config file like so:
```js
// jest.config.js
const common = require('./jest.common.config')

module.exports = {
  projects: [
    // node
    {
      ...common,
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/*.(spec|test).ts']
    },
    // electron 
    {
      ...common,
      runner: 'echrome/main',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/*.(spec|test).electron.ts']
    },
    // renderer process (e2e tests)
    {
      ...common,
      runner: 'echrome',
      testEnvironment: 'echrome/environment',
      testMatch: ['**/__tests__/**/*.(spec|test).tsx']
    }
  ]
}
```

## License

[MIT licensed](./LICENSE).
