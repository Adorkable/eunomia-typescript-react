import React, { useCallback, useState } from 'react'

import { Meta } from '@storybook/react'

import { useClientConnection } from './useClientConnection'

import { Server } from 'mock-socket'

export default {
  title: 'WebSocket/useClientConnection'
} as Meta

interface Props {
  sendStringToServer: string
  sendStringToClient: string
}

let server: Server | null = null

export const Default = ({ sendStringToServer, sendStringToClient }: Props) => {
  const [clientReceivedMessage, setClientReceivedMessage] = useState('')
  const [serverReceivedMessage, setServerReceivedMessage] = useState('')

  const url = 'ws://localhost:3050'

  const serverOnMessage = useCallback(
    (data: string | Blob | ArrayBuffer | ArrayBufferView) => {
      const update =
        typeof data === 'string'
          ? `string: '${data}'`
          : data instanceof ArrayBuffer
          ? `ArrayBuffer: ${data.byteLength} bytes`
          : `${typeof data}`
      setServerReceivedMessage(update)
    },
    [setServerReceivedMessage]
  )

  if (!server) {
    try {
      server = new Server(url)

      server.on('connection', (socket) => {
        socket.on('message', serverOnMessage)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const { send: clientSend } = useClientConnection({
    url,
    onMessageDataText: (_, data: string) => {
      setClientReceivedMessage(`string: '${data}'`)
    }
  })

  return (
    <>
      <div>Client Received: {clientReceivedMessage}</div>
      <div>Server Received: {serverReceivedMessage}</div>
      <br />
      <button
        onClick={() => {
          clientSend(sendStringToServer)
        }}
      >
        Send String to Server
      </button>

      <button
        onClick={() => {
          if (!server) {
            throw new Error('Server not initialized')
          }
          server.emit('message', sendStringToClient)
        }}
      >
        Send String to Client
      </button>
    </>
  )
}
Default.args = {
  sendStringToServer: 'Hello from client',
  sendStringToClient: 'Hello from server'
}
