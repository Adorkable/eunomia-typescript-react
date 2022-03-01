export * from './useClientConnection'
export * from './WebSocketError'

// export class Connection extends React.Component<ConnectionProps> {
//   componentDidMount() {

//     this.connection.onmessage = (packet: MessageEvent<any>) => {
//       if (!onMessage) {
//         return
//       }
//       try {
//         // TODO: fix
//         const workaround = packet as unknown
//         const message = processPacketIntoMessage(workaround as Packet)
//         onMessage(message)
//       } catch (error) {
//         if (error instanceof InvalidMessageException) {
//           console.log(
//             'Error: invalid message:',
//             error.type,
//             JSON.stringify(error.packet)
//           )
//         } else {
//           console.log('Error: parsing message:', error)
//         }
//       }
//     }
//   }

//   sendMessage(message: Message) {
//     if (!this.connection) {
//       throw new Error('Connection is not open')
//     }
//     sendMessage(this.connection, message)
//   }

//   render() {
//     return null
//   }
// }
