import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Dimensions, ScrollView, FlatList, Alert } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import EmojiBackground from '../components/EmojiBackground'
import * as Actions from '../actions'

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    chatList: state.main.chatList,
    account: state.main.account
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // play () { return dispatch(Actions.musicPlayAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class ChatListPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {}     // do not use redux because of simplifying
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
        for (let i = 0; i < chat.users.length; i++) {
          nameArr.push(item.users[i].name)
          avatar = item.users[i].avatar
        }
        name = nameArr.join('、')
      }

      return (
        <ListItem
          leftAvatar={this.renderAvatar(avatar)}
          title={name}
          subtitle={item.last}
          containerStyle={styles.listItem}
          onPress={() => {
            // Alert.alert(`go to chat ${l.name}`)
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
  }
}
