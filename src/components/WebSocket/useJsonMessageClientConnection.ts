import { useCallback } from 'react'
import { JsonMessageParsingError } from './JsonMessageParsingError'
import { useClientConnection, DataType } from './useClientConnection'

interface Props<T> {
  url: string

  onOpen?: (connection: WebSocket | undefined, event: Event) => void
  onClose?: (connection: WebSocket | undefined, event: CloseEvent) => void

  binaryType?: BinaryType

  onMessage?: (connection: WebSocket | undefined, data: T) => void

  onError?: (connection: WebSocket | undefined, error: Error) => void

  unmountCloseMessage?: string
}

interface Result<T> {
  send: (data: T) => void
  readyState: () => number
  close: (code?: number, reason?: string) => void

  internal: {
    send: (data: DataType) => void
  }
}

export const useJsonMessageClientConnection = <T>({
  url,
  onOpen,
  onClose,

  onMessage,

  onError,

  unmountCloseMessage = 'Browsing away'
}: Props<T>): Result<T> => {
  // TODO: support binary json sending

  const onMessageDataText = useCallback(
    (connection: WebSocket | undefined, text: string) => {
      if (!onMessage) {
        return
      }
      try {
        const message = JSON.parse(text)
        onMessage(connection, message) // TODO: separate and handle with a different try/catch and error report
      } catch (error) {
        if (onError) {
          onError(
            connection,
            new JsonMessageParsingError(connection, error, text)
          )
        }
      }
    },
    [onMessage, onError]
  )

  const {
    send: connectionSend,
    close,
    readyState
  } = useClientConnection<T>({
    url,
    onOpen,
    onClose,
    onMessageDataText,
    onError,
    unmountCloseMessage
  })

  const send = useCallback((data: T) => {
    connectionSend(JSON.stringify(data))
  }, [])

  return {
    send,
    readyState,
    close,
    internal: {
      send: connectionSend
    }
  }
}
