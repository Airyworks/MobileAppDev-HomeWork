import { handleActions } from 'redux-actions'

export const initialState = {
  token: '',
  account: {
    id: 0,
    name: '成龙',
    avatar: 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
  },
  friendList: [],
  chatList: []
}

export default handleActions({
  'update-token' (state, {payload}) {
    return {
      ...state,
      token: payload
    }
  },
  'update-friends' (state, {payload}) {
    return {
      ...state,
      friendList: payload
    }
  },
  'update-channel' (state, {payload}) {
    const chats = Array.from(state.chatList)
    payload.forEach(ch => {
      if (!chats.find(i => i.name === ch.name)) {
        chats.push({
          name: ch.name,
          users: ch.users,
          last: ''
        })
      } else {
        chats.find(i => i.name === ch.name).users = ch.users
      }
    })
    return {
      ...state,
      chatList: chats
    }
  },
  'friend-list' (state) {
    return {
      ...state,
      isPlaying: true
    }
  },
  'update-chat-list' (state, {payload}) {
    return {
      ...state,
      chatList: payload
    }
  }
}, initialState)
