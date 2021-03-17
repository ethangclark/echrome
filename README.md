## echrome

A fork of https://github.com/facebook-atom/jest-electron-runner that's specifically designed for running full-stack web app integration tests inside an [electron](https://electronjs.org/) renderer process providing the following benefits:

- full access to a browser environment without the need for jsdom or similar modules
- ability to run, `await`, and `jest.mock()` server-side AND client-side modules in the SAME test!
- (bonus) ability to `jest` test electron apps, if you're into that

## Getting Started

*NOTE: requires `jest@>=26.6.3`*

1. Install echrome `yarn add echrome --dev`
2. Add one of these lines to your jest config (in `package.json` or inside your `jest.config.js` file), depending on the process you wish to test. If you wish to test them in parallel, see the tips section below.

    ```js
        {
          // ...
          runner: 'echrome',
          testEnvironment: 'echrome/environment',
        }
    ```
    - (or, for Electron main process testing)
    ```js
        {
          // ...
          runner: 'echrome/main',
          testEnvironment: 'node',
        }
    ```

3. run jest!

### Debugging
Example debug script:
```
"test:debug": "ELECTRON_ENABLE_LOGGING=true ECHROME_DEBUG=true yarn jest --runInBand",
```
`ELECTRON_ENABLE_LOGGING` turns on electron logging. `ECHROME_DEBUG` turns off headless mode in the echrome electron app so you can see what's going on, opens the developer tools, and maximizes the app. If you have `debugger` statements, execution will pause on those statements. `--runInBand` is necessary to force the tests to execute in serial.

If you're doing electron main process testing, run `require('electron').remote.getCurrentWindow()` to get the window object, and call `.show(), .openDevTools(), .maximize()`, or whatever else you want on it during debugging.

### Tips
- To run "normal" jest tests and echrome tests in parallel, you can provide config objects to the `projects` array in a jest javascript config file like so:

```js
// jest.config.js
const common = { ... }

module.exports = {
  projects: [
    {
      ...common,
      runner: 'echrome',
      testEnvironment: 'echrome/environment',
      testMatch: ['**/*.spec.jsx'],
    },
    {
      ...common,
      testEnvironment: 'node',
      testMatch: ['**/*.test.js'],
    },
  ]
}
```

## License

[MIT licensed](./LICENSE).
