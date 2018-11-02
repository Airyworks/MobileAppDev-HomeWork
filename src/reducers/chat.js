import { handleActions } from 'redux-actions'

export const initialState = {
  openname: 'room.0',
  chats: []
}

export default handleActions({
  'get-chat' (state, {payload}) {
    return {
      ...state,
      isPlaying: true
    }
  },
  'update-chat' (state, {payload}) {
    return {
      ...state,
      chats: payload
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
