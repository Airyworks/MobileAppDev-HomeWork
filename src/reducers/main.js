import { handleActions } from 'redux-actions'

export const initialState = {
  token: '',
  account: {
    id: 0,
    name: '成龙',
    avatar: 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
  },
  friendList: [
    {
      id: 1,
      name: 'Winnie',
      avatar: 'https://user-images.githubusercontent.com/9587680/47803551-b903ae00-dd6d-11e8-8dd8-e0ea57fc32fb.jpg'
    },
    {
      id: 2,
      name: 'パチュリー・ノーレッジ',
      avatar: 'https://avatars3.githubusercontent.com/u/9587680'
    },
    {
      id: 3,
      name: '奥巴马',
      avatar: 'https://user-images.githubusercontent.com/9587680/47837461-0e2fd600-dde7-11e8-82e8-7b6c20f6cc69.png'
    },
    {
      id: 4,
      name: '特朗普',
      avatar: 'https://user-images.githubusercontent.com/9587680/47837462-0e2fd600-dde7-11e8-8ff9-57c6c459f541.png'
    },
    {
      id: 5,
      name: '古天乐',
      avatar: 'https://user-images.githubusercontent.com/9587680/47837463-0e2fd600-dde7-11e8-8a18-aaee98b4ba17.png'
    },
    {
      id: 6,
      name: '张家辉',
      avatar: 'https://user-images.githubusercontent.com/9587680/47837465-0ec86c80-dde7-11e8-902b-af84d642d2ef.png'
    }
  ],
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
  'update-token' (state, {payload}) {
    return {
      ...state,
      token: payload
    }
  },
  'friend-list' (state) {
    return {
      ...state,
      isPlaying: true
    }
  }
}, initialState)
