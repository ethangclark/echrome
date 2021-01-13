/**
 * ****************************************************
 * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!
 * ****************************************************
 * @flow
 * @generated ebdcfc26b51a59723f5c168f7f79dc45
 */

import typeof Methods from './JestWorkerRPC.js';
import RPCProcess from 'electrochrome-rpc/RPCProcess';

class JestWorkerRPCProcess extends RPCProcess<Methods> {
  initializeRemote(): Methods {
    return {
      runTest: (this.jsonRPCCall.bind(this, 'runTest'): any),
      shutDown: (this.jsonRPCCall.bind(this, 'shutDown'): any),
    };
  }
}
module.exports = JestWorkerRPCProcess;
