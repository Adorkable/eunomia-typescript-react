export class WebSocketError extends Error {
  constructor(
    private _connection: WebSocket | undefined,
    private _errorEvent: Event
  ) {
    super('Invalid identify message')
  }

  get connection(): WebSocket | undefined {
    return this._connection
  }

  get errorEvent(): Event {
    return this._errorEvent
  }
}
