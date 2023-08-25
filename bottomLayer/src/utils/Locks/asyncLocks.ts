export class AsyncLock {
  disable: () => void;
  promise: Promise<void>;
  constructor () {
    this.disable = () => {};
    this.promise = Promise.resolve();
  }

  enable (): void {
    const assignDisable = (resolve: () => void): void => {
      this.disable = resolve;
    };

    this.promise = new Promise<void>(assignDisable);
  }
}
