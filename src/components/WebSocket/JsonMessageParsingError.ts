export class JsonMessageParsingError extends Error {
  constructor(
    private _connection: WebSocket | undefined,
    private _error: unknown,
    private _text: string
  ) {
    super('Json message parsing error')
  }

  get connection(): WebSocket | undefined {
    return this._connection
  }

  get error(): unknown {
    return this._error
  }

  get text(): string {
    return this._text
  }
}
