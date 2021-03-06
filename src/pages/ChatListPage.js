import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Dimensions, ScrollView, FlatList, Alert } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import EmojiBackground from '../components/EmojiBackground'
import * as Actions from '../actions'
import socket from '../Socket'
import config from '../../config'

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    chatList: state.main.chatList,
    chats: state.chat.chats,
    account: state.main.account
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateChannel (channels) {
      return dispatch(Actions.updateChannelAction(channels))
    },
    openChat(chatname) {
      return dispatch(Actions.openChatAction(chatname)) 
    },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class ChatListPage extends React.Component {
    constructor (props) {
      super(props)
    }

    componentDidMount() {
      (() => {
        fetch(`http://${config.http.host}:${config.http.port}/channels`, {
          method: 'GET',
          credentials:'include'
        })
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            Alert.alert('Need login first.')
          }
        }).then(res => {
          if (res) {
            this.props.updateChannel(res)
          }
        })
        .catch(err => {
          // console.error(err)
        })
      })()
    }

    renderAvatar = (uri) => {
      return (
        <Avatar
          size="small"
          rounded
          source={{uri}}
          activeOpacity={0.7}
        />
      )
    }

    renderUnread = (chat) => {
      if (chat) {
        const unread = chat.history.filter(i => i.isRead === false)
        if (unread.length > 0) {
          return (
            <View
              style={styles.unread}
            />
          )
        }
      }
    }

    renderChat = (item) => {
      item = item.item
      // Alert.alert(typeof this.props.account)
      
      let name = ''
      let avatar = ''
      if (item.users.length <= 2) {
        for (let i = 0; i < item.users.length; i++) {
          if (item.users[i].id !== this.props.account.id) {
            name = item.users[i].name
            avatar = item.users[i].avatar
          }
        }
      } else {
        const nameArr = []
        for (let i = 0; i < item.users.length; i++) {
          nameArr.push(item.users[i].name)
          avatar = item.users[i].avatar
        }
        name = nameArr.join('、')
      }

      const chat = this.props.chats.find(i => i.name === item.name)

      return (
        <ListItem
          leftAvatar={this.renderAvatar(avatar)}
          title={name}
          subtitle={item.last}
          containerStyle={styles.listItem}
          rightIcon={this.renderUnread(chat)}
          onPress={() => {
            // Alert.alert(`go to chat ${l.name}`)
            this.props.openChat(item.name)
            RouterActions.chat()
          }}
        />
      )
    }


    render () {
      return (
        <EmojiBackground style={{flexDirection: 'column'}}>
          <View style={{height: height - 130}}>
            <FlatList
              data={this.props.chatList}
              renderItem={this.renderChat}
              keyExtractor={(item) => item.name}
              extraData={this.props.chats}
            />
          </View>
        </EmojiBackground>
      )
    }
  }
)

const styles = {
  title: {
    fontSize: 18,
    color: '#FFF'
  },
  button: {
    underlayColor: '#E7E7E780'
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomColor: 'rgba(150, 150, 150, 0.4)',
    borderBottomWidth: 1
  },
  unread: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#db0b24'
  }
}
