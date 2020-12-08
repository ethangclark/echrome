/**
 * ****************************************************
 * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!
 * ****************************************************
 * @flow
 * @generated 11d8b11683d7e5c43d148cecdb2e6a18
 */

import typeof Methods from './NuclideE2ERPC.js';
import RPCProcess from 'jest-hax-rpc/RPCProcess';

class NuclideE2ERPCProcess extends RPCProcess<Methods> {
  initializeRemote(): Methods {
    return {
      runTest: (this.jsonRPCCall.bind(this, 'runTest'): any),
      shutDown: (this.jsonRPCCall.bind(this, 'shutDown'): any),
    };
  }
}
module.exports = NuclideE2ERPCProcess;
