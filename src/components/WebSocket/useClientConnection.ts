import { useCallback, useEffect, useRef, useState } from 'react'
import { ConnectionClosedError } from './ConnectionClosedError'
import { WebSocketError } from './WebSocketError'

// TODO: support protocols and extensions

export type DataType = string | ArrayBufferLike | Blob | ArrayBufferView
interface Props<T = DataType> {
  url: string

  onOpen?: (connection: WebSocket | undefined, event: Event) => void
  onClose?: (connection: WebSocket | undefined, event: CloseEvent) => void

  binaryType?: BinaryType

  onMessage?: (
    connection: WebSocket | undefined,
    message: MessageEvent<T>
  ) => void

  onMessageData?: (connection: WebSocket | undefined, data: T) => void

  onMessageDataText?: (connection: WebSocket | undefined, text: string) => void
  onMessageDataArrayBuffer?: (
    connection: WebSocket | undefined,
    arrayBuffer: ArrayBuffer
  ) => void
  onMessageDataBlob?: (connection: WebSocket | undefined, blob: Blob) => void

  onError?: (connection: WebSocket | undefined, error: Error) => void

  unmountCloseMessage?: string
}

interface Result {
  send: (data: DataType) => void
  readyState: () => number
  close: (code?: number, reason?: string) => void
}

export const useClientConnection = <T = DataType>({
  url,

  binaryType = 'arraybuffer',

  onOpen,
  onClose,

  onMessage,

  onMessageData,

  onMessageDataText,
  onMessageDataArrayBuffer,
  onMessageDataBlob,

  onError,

  unmountCloseMessage = 'Browsing away'
}: Props<T>): Result => {
  const connection = useRef<WebSocket | undefined>(undefined)
  const [connectionCreated, setConnectionCreated] = useState(false)

  const onopen = useCallback(
    (event: Event) => {
      if (!onOpen) {
        return
      }
      onOpen(connection.current, event)
    },
    [onOpen]
  )

  const onclose = useCallback(
    (event: CloseEvent) => {
      if (!onClose) {
        return
      }
      onClose(connection.current, event)
    },
    [onClose]
  )

  const onmessageBasic = useCallback(
    (event: MessageEvent<T>) => {
      if (!onMessage) {
        return
      }
      onMessage(connection.current, event)
    },
    [onMessage]
  )

  const onmessageData = useCallback(
    (event: MessageEvent<T>) => {
      if (!onMessageData) {
        return
      }
      onMessageData(connection.current, event.data)
    },
    [onMessageData]
  )

  const onmessageDataText = useCallback(
    (event: MessageEvent<T>) => {
      if (!onMessageDataText) {
        return
      }
      if (typeof event.data !== 'string') {
        return
      }
      onMessageDataText(connection.current, event.data)
    },
    [onMessageDataText]
  )

  const onmessageDataArrayBuffer = useCallback(
    (event: MessageEvent<T>) => {
      if (!onMessageDataArrayBuffer) {
        return
      }
      if (!(event.data instanceof ArrayBuffer)) {
        return
      }
      onMessageDataArrayBuffer(connection.current, event.data)
    },
    [onMessageDataArrayBuffer]
  )

  const onmessageDataBlob = useCallback(
    (event: MessageEvent<T>) => {
      if (!onMessageDataBlob) {
        return
      }
      if (!(event.data instanceof Blob)) {
        return
      }
      onMessageDataBlob(connection.current, event.data)
    },
    [onMessageDataBlob]
  )

  const onmessage = useCallback(
    (event: MessageEvent<T>) => {
      onmessageBasic(event)
      onmessageData(event)
      onmessageDataText(event)
      onmessageDataArrayBuffer(event)
      onmessageDataBlob(event)
    },
    [onmessageBasic, onmessageData]
  )

  const onerror = useCallback(
    (errorEvent: Event) => {
      if (!onError) {
        return
      }
      onError(
        connection.current,
        new WebSocketError(connection.current, errorEvent)
      )
    },
    [onError]
  )

  const send = useCallback((data: DataType) => {
    if (!connection.current) {
      throw new ConnectionClosedError()
    }
    connection.current.send(data)
  }, [])

  const readyState = useCallback(() => {
    if (!connection.current) {
      return WebSocket.CLOSED
    }
    return connection.current.readyState
  }, [])

  const close = useCallback((code?: number, reason?: string) => {
    if (!connection.current) {
      throw new ConnectionClosedError()
    }
    connection.current.close(code, reason)
  }, [])

  useEffect(() => {
    const result = new WebSocket(url)

    result.binaryType = binaryType

    connection.current = result

    setConnectionCreated(true)

    return () => {
      if (!result || result.readyState === WebSocket.CLOSED) {
        return
      }
      result.close(1000, unmountCloseMessage)

      setConnectionCreated(false)
    }
  }, [url, binaryType, setConnectionCreated, unmountCloseMessage])

  useEffect(() => {
    if (!connection.current) {
      return
    }
    connection.current.onopen = onopen
  }, [connectionCreated, onopen])

  useEffect(() => {
    if (!connection.current) {
      return
    }
    connection.current.onclose = onclose
  }, [connectionCreated, onclose])

  useEffect(() => {
    if (!connection.current) {
      return
    }
    connection.current.onmessage = onmessage
  }, [connectionCreated, onmessage])

  useEffect(() => {
    if (!connection.current) {
      return
    }
    connection.current.onerror = onerror
  }, [connectionCreated, onerror])

  return { send, readyState, close }
}
