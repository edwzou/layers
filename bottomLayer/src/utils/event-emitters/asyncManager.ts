import { EventEmitter } from 'node:events';

export class AsyncManager extends EventEmitter {
  calls: number;
  failures: string[];
  result: number = 0;
  constructor(calls: number) {
    super();
    this.calls = calls;
    this.failures = [];
  }

  // All async calls are complete
  allComplete() {
    this.emit('proceed', 'All Queries Were Completed', this.result);
  }

  // One query completed
  complete(call: string) {
    this.calls--;
    this.emit('Async Call Completed', call);
    if (this.calls === 0) {
      this.allComplete();
    }
  }

  // One async call failed and the failure is predicted
  failure(failure: string, call: string) {
    this.calls--;
    this.result--;
    console.log('Async Call Failed. \nCall: ' + call + '\nFailure: ' + failure);
    this.failures.push(failure);
    this.emit('Async Call Failure Caught', call, failure);
    if (this.calls === 0) {
      this.allComplete();
    }
  }
}
