import { handleActions } from 'redux-actions'

export const initialState = {
  token: '',
  account: {
    id: 0,
    name: '成龙',
    avatar: 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
  },
  friendList: [],
  chatList: [
    {
      "name": 'room.0',
      "users": [
        {
          id: 0,
          name: '成龙',
          avatar: 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
        },
        {
          id: 1,
          name: 'Winnie',
          avatar: 'https://user-images.githubusercontent.com/9587680/47803551-b903ae00-dd6d-11e8-8dd8-e0ea57fc32fb.jpg'
        }
      ],
      last: 'Duang!'
    },
    {
      "name": 'room.1',
      "users": [
        {
          id: 0,
          name: '成龙',
          avatar: 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
        },
        {
          id: 2,
          name: 'パチュリー・ノーレッジ',
          avatar: 'https://avatars3.githubusercontent.com/u/9587680'
        }
      ],
      last: '[红包]恭喜发财'
    }
  ]
}

export default handleActions({
  'update-user' (state, {payload}) {
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
  }
}, initialState)
