export class ConnectionClosedError extends Error {
  constructor() {
    super('Connection closed error')
  }
}
