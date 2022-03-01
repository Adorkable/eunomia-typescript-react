export class WebSocketError extends Error {
  constructor(
    private _connection: WebSocket | undefined,
    private _errorEvent: Event
  ) {
    super('WebSocket error')
  }

  get connection(): WebSocket | undefined {
    return this._connection
  }

  get errorEvent(): Event {
    return this._errorEvent
  }
}
