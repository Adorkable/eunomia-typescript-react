import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { WebSocketError } from './WebSocketError'

interface Props<T = any> {
  url: string

  onOpen?: (connection: WebSocket | undefined, event: Event) => void
  onClose?: (connection: WebSocket | undefined, event: CloseEvent) => void

  binaryType?: BinaryType

  onMessage?: (
    connection: WebSocket | undefined,
    message: MessageEvent<any>
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

export type Result = RefObject<WebSocket | undefined>

export const useClientConnection = <T = any>({
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
    (event: MessageEvent<any>) => {
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

  useEffect(() => {
    const result = new WebSocket(url)

    result.binaryType = binaryType

    result.onopen = onopen
    result.onclose = onclose
    result.onmessage = onmessage
    result.onerror = onerror

    connection.current = result

    return () => {
      if (!result || result.readyState === WebSocket.CLOSED) {
        return
      }
      result.close(1000, unmountCloseMessage)
    }
  }, [
    url,
    binaryType,
    onopen,
    onclose,
    onmessage,
    onerror,
    unmountCloseMessage
  ])

  return connection
}
