/**
 * ****************************************************
 * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!
 * ****************************************************
 * @flow
 * @generated 5e4d8a326923b414a02a3a15edee68ce
 */

import typeof Methods from './JestWorkerRPC.js';
import RPCProcess from 'echrome-rpc/RPCProcess';

class JestWorkerRPCProcess extends RPCProcess<Methods> {
  initializeRemote(): Methods {
    return {
      runTest: (this.jsonRPCCall.bind(this, 'runTest'): any),
      shutDown: (this.jsonRPCCall.bind(this, 'shutDown'): any),
    };
  }
}
module.exports = JestWorkerRPCProcess;
