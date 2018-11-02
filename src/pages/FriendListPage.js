import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, ScrollView, Alert, FlatList } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import EmojiBackground from '../components/EmojiBackground'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'
import config from '../../config'
import socket from '../Socket';

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    userId: state.main.account,
    friendList: state.main.friendList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateFriends (friends) {
      return dispatch(Actions.updateFriendsAction(friends))
    },
    openChat(chatname) {
      return dispatch(Actions.openChatAction(chatname)) 
    },
    updateChannel(channel) {
      return dispatch(Actions.updateChannelAction(channel))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class FriendListPage extends React.Component {
    constructor (props) {
      super(props)
    }

    componentDidMount() {
      (() => {
        fetch(`http://${config.http.host}:${config.http.port}/friends`, {
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
            this.props.updateFriends(res)
          }
        })
        .catch(err => {
          console.error(err)
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

    renderFriend = (item) => {
      item = item.item
      return (
        <ListItem
          leftAvatar={this.renderAvatar(item.avatar)}
          title={item.name}
          containerStyle={styles.listItem}

          onPress={() => {
            this.props.openChat('')
            RouterActions.chat()
            socket.newChat({to: [{id: item.id}]}).then(({channel}) => {
              this.props.openChat(channel)
              this.props.updateChannel([{
                name: channel,
                users: [item, this.props.user]
              }])
            })
          }}
        />
      )
    }

    render () {

      return (
        // <ScrollView style={{ flexDirection: 'column'}}>
        //   {
        //     list.map((l, i) => (
        //       <ListItem
        //         key={i}
        //         leftAvatar={this.renderAvatar(l.avatar_url)}
        //         title={l.name}
        //         containerStyle={styles.listItem}
        //         onPress={() => {
        //           // Alert.alert(`start chat ${l.name}`)
                  
        //         }}
        //       />
        //     ))
        //   }
        // </ScrollView>
        <EmojiBackground>
          <View style={{height: height - 130}}>
            <FlatList
              data={this.props.friendList}
              renderItem={this.renderFriend}
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
