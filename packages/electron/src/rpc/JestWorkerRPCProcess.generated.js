/**
 * ****************************************************
 * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!
 * ****************************************************
 * @flow
 * @generated 8a82a1ed54b335ea7207cda8835af941
 */

import typeof Methods from './JestWorkerRPC.js';
import RPCProcess from 'jest-hax-rpc/RPCProcess';

class JestWorkerRPCProcess extends RPCProcess<Methods> {
  initializeRemote(): Methods {
    return {
      runTest: (this.jsonRPCCall.bind(this, 'runTest'): any),
      shutDown: (this.jsonRPCCall.bind(this, 'shutDown'): any),
    };
  }
}
module.exports = JestWorkerRPCProcess;
