import * as Actions from '../actions'
import store from '../store'
import io from 'socket.io-client'
import config from '../../config'

const evs = [
  { ev: 'hi', action: Actions.WSHiAction },
  { ev: 'new-chat-res', action: Actions.WSNewChatResAction},
  { ev: 'pull-message', action: Actions.WSPullMessageAction},
  { ev: 'server-received', action: Actions.WSServerReceivedAction},
  { ev: 'forbidden', action: Actions.WSForbiddenAction},
  { ev: 'invalid-param', action: Actions.WSInvalidParamAction},
  { ev: 'token-missing', action: Actions.WSTokenMissingAction}
]

const acts = [
  { ev: 'hello' },
  { ev: 'new-chat' },
  { ev: 'client-received' },
  { ev: 'push-message' }
]
class Socket {
  constructor() {
    this.socket = io(`${config.socket.host}:${config.socket.port}`, {
      transports: ['websocket'],
      autoConnect: false
    })

    this.handlers = {
      'hi': [],
      'new-chat-res': [],
      'pull-message': [],
      'server-received': [],
      'forbidden': [],
      'invalid-param': [],
      'token-missing': [],
    }

    this.addListeners()
    // Socket.io automatically reconnect by default config
  }

  on(ev, fn) {
    if (!evs.find(i => i.ev === ev)) {
      throw new Error(`Undefined event: ${ev}`)
    }
    if (!this.handlers[ev].find(i => i === fn)) {
      this.handlers[ev].push(fn)
    }
  }

  open() {
    if(this.socket.disconnected) {
      const prom = new Promise((r, j) => {
        this.socket.once('connect', () => {
          r(this.socket)
        })
        this.socket.once('connect_error', () => {
          j(this.socket)
        })
      })
      this.socket.open()
      return prom
    }
    return Promise.resolve(this.socket)
  }

  close() {
    if (this.socket && this.socket.connected) {
      const prom = new Promise(r => {
        this.socket.once('disconnect', () => {
          r(this.socket)
        })
      })
      this.socket.close()
      return prom
    }
    return Promise.resolve(this.socket)
  }

  addListeners() {
    evs.forEach(i => {
      this.socket.on('connect', () => {
        this.socket.on(i.ev, data => {
          this.handlers[i.ev].forEach(fn => {
            fn(data)
          })
        })
      })
    })
  }

  hello({token}) {
    if (this.socket.connected) {
      this.socket.emit('hello', {token})
      return new Promise((r, j) => {
        this.socket.once('hi', (data) => {
          r(data)
        })
        this.socket.once('token-missing', () => {
          j(new Error('Error token'))
        })
        this.socket.once('invalid-param', () => {
          j(new Error('Error param'))
        })
      })
    } else {
      return Promise.reject(new Error('Socket not connected'))
    }
  }

  newChat({to}) {
    if (this.socket.connected) {
      this.socket.emit('new-chat', {to})
      return new Promise((r, j) => {
        this.socket.once('new-chat-res', (data) => {
          r({channel: data.channel})
        })
        this.socket.once('forbidden', () => {
          j(new Error('Error access'))
        })
        this.socket.once('invalid-param', () => {
          j(new Error('Error param'))
        })
      })
    } else {
      return Promise.reject(new Error('Socket not connected'))
    }
  }

  clientReceived({uuids}) {
    if (this.socket.connected) {
      return new Promise((r, j) => {
        this.socket.emit('client-received', {uuids}, () => {
          r()
        })
        this.socket.once('forbidden', () => {
          j(new Error('Error access'))
        })
        this.socket.once('invalid-param', () => {
          j(new Error('Error param'))
        })
      })
    } else {
      return Promise.reject(new Error('Socket not connected'))
    }
  }

  pushMessage({sequence, channel, content}) {
    if (this.socket.connected) {
      this.socket.emit('push-message', {sequence, channel, content})
      return new Promise((r, j) => {
        this.socket.once('server-received', (data) => {
          r({
            sequence: data.sequence,
            time: data.time,
            msgId: data.msgId
          })
        })
        this.socket.once('forbidden', () => {
          j(new Error('Error access'))
        })
        this.socket.once('invalid-param', () => {
          j(new Error('Error param'))
        })
      })
    } else {
      return Promise.reject(new Error('Socket not connected'))
    }
  }
}

export default new Socket()
