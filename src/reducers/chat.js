import { handleActions } from 'redux-actions'

export const initialState = {
  openname: 'room.0',
  chats: [
    {
      name: 'room.0',
      users: [ 2, 1 ],
      history: [
        {
          "uuid": 'abc',
          "sender": 0,
          "channel": 'def',
          "content": '你好',
          "time": new Date('2018-10-31 18:00:20').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": '你好，亲爱的！',
          "time": new Date('2018-10-31 18:01:01').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 0,
          "channel": 'def',
          "content": '最近和日本的生意谈的怎么样了？',
          "time": new Date('2018-10-31 18:03:45').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": '很顺利，还送了他们两只熊猫。',
          "time": new Date('2018-10-31 18:05:37').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 0,
          "channel": 'def',
          "content": '那是真的牛皮',
          "time": new Date('2018-10-31 18:07:21').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": '最近感觉头上越来越凉了',
          "time": new Date('2018-10-31 18:10:53').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 0,
          "channel": 'def',
          "content": '霸王洗发水，我用了大概一个月左右，感觉还不错，后来我在拍的时候也要求他们不要加特技，因为我要让观众看到，我用完之后是这个样子，你们用完之后也会是这个样子！',
          "time": new Date('2018-10-31 18:12:24').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:44').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:45').getTime()
        },
        {
          "uuid": 'abc',
          "sender": 1,
          "channel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:46').getTime()
        }
      ]
    }
  ]
}

export default handleActions({
  'open-chat' (state, {payload}) {
    if (payload !== '' && !state.chats.find(i => i.name === payload)) {
      const chats = Array.from(state.chats)
      chats.unshift({
        name: payload,
        history: [],
        users: [state.main.account]
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
    const userId = state.main.account.id
    const msgs = payload.map(i => ({
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
          history: [i],
          users: [state.main.account, i.sender]
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
