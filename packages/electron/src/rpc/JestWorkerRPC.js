/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {TestResult} from 'jest-hax-core/types';
import type {IPCTestData} from '../../types';
import runTest from 'jest-runner/build/runTest';

import {
  makeUniqWorkerId,
  buildFailureTestResult,
} from 'jest-hax-core/utils';

import {BrowserWindow, ipcMain} from 'electron';
import {getResolver} from '../utils/resolver';

const isMain = process.env.isMain === 'true';
let nextBrowserWindow;

const _runInNode = async (testData: IPCTestData): Promise<TestResult> => {
  try {
    return runTest(
      testData.path,
      testData.globalConfig,
      testData.config,
      getResolver(testData.config, testData.serialisableModuleMap),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return buildFailureTestResult(
      testData.path,
      error,
      testData.config,
      testData.globalConfig,
    );
  }
};

const _createBrowserWindow = () => {
  const showVar = process.env.JEST_ELECTRON_SHOW_WINDOW || ''
  const options = {
    show: !!showVar && showVar != 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  }
  if (showVar.includes('f')) {
    options.fullscreen = true
  }
  const win = new BrowserWindow(options);
  if (showVar.includes('d')) {
    win.webContents.openDevTools()
  }

  win.loadURL(`file://${require.resolve('../index.html')}`);
  return win;
}

const _getBrowserWindow = () => {
  const win = nextBrowserWindow || _createBrowserWindow();
  nextBrowserWindow = _createBrowserWindow();

  return win;
}

const _destroyBrowserWindow = () => {
  if (nextBrowserWindow && !nextBrowserWindow.isDestroyed()) {
    nextBrowserWindow.destroy()
  }
}

const _runInBrowserWindow = (testData: IPCTestData): Promise<TestResult> => {
  return new Promise(resolve => {
    const workerID = makeUniqWorkerId();
    const win = _getBrowserWindow();

    if (win.webContents.isLoading()) {
      win.webContents.on('did-finish-load', () => {
        win.webContents.send('run-test', testData, workerID);
      });
    } else {
      win.webContents.send('run-test', testData, workerID);
    }

    ipcMain.once(workerID, (event, testResult: TestResult) => {
      win.destroy();
      resolve(testResult);
    });
  }).catch(error => {
    const testResult = buildFailureTestResult(
      testData.path,
      error,
      testData.config,
      testData.globalConfig,
    );
    return testResult;
  });
};

const _runTest = (testData: IPCTestData): Promise<TestResult> => {
  testData.config.extraGlobals || (testData.config.extraGlobals = []);
  return isMain ? _runInNode(testData) : _runInBrowserWindow(testData);
};

module.exports = {
  runTest(testData: IPCTestData): Promise<TestResult> {
    return _runTest(testData);
  },
  shutDown(): Promise<any> {
    _destroyBrowserWindow();
    return Promise.resolve();
  },
};
