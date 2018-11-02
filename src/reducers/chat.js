import { handleActions } from 'redux-actions'

export const initialState = {
  openname: 'room.0',
  chats: []
}

export default handleActions({
  'open-chat' (state, {payload}) {
    if (payload !== '' && !state.chats.find(i => i.name === payload)) {
      const chats = Array.from(state.chats)
      chats.unshift({
        name: payload,
        history: []
      })
      return {
        ...state,
        openname: payload,
        chats
      }
    } else {
      return {
        ...state,
        openname: payload
      }
    }
  },
  'pull-message' (state, {payload}) {
    const {messages, userId} = payload
    const msgs = messages.map(i => ({
        uuid: i.uuids.find(x => x.user === userId).uuid,
        isRead: false,
        sender: i.sender,
        time: new Date(i.time).getTime(),
        content: i.content,
        channel: i.channel
      })
    )
    let chats = Array.from(state.chats)
    msgs.forEach(i => {
      const channel = i.channel
      if (!chats.find(v => v.name === channel)) {
        chats.push({
          name: channel,
          history: [i]
        })
      } else {
        chats.find(v => v.name === channel).history.push(i)
      }
    })
    return {
      ...state,
      chats
    }
  },
  'update-chat' (state, {payload}) {
    return {
      ...state,
      chats: payload
    }
  },
  'add-message' (state, {payload}) {
    const chats = Array.from(state.chats)
    if (!chats.find(i => i.name === payload.channel)) {
      chats.push({
        name: payload.channel,
        history: [payload]
      })
    } else {
      chats.find(i => i.name === payload.channel).history.push(payload)
    }
    return {
      ...state,
      chats
    }
  },
  'read-message' (state, {payload}) {
    const {channel, uuids} = payload
    const chats = Array.from(state.chats)
    const ch = chats.find(i => i.name === channel)
    if (ch) {
      ch.history = ch.history.map(i => {
        if (uuids.includes(i.uuid)) {
          i.isRead = true
        }
      })
    }
    return {
      ...state,
      chats
    }
  },
  /*
    Here are websocket events
  */
  'ws-hi' (state, {payload}) {
    return {
      ...state
    }
  },
  'ws-new-chat-res' (state, {payload}) {
    return {
      ...state
    }
  },
  'ws-pull-message' (state, {payload}) {
    return {
      ...state
    }
  },
  'ws-server-received' (state, {payload}) {
    return {
      ...state
    }
  },
  'ws-forbidden' (state) {
    return {
      ...state
    }
  },
  'ws-invalid-param' (state) {
    return {
      ...state
    }
  },
  'ws-token-missing' (state) {
    return {
      ...state
    }
  }
}, initialState)
