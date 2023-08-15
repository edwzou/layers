export class AlreadyFollow extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'AlreadyFollow';
  }
}
