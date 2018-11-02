import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Animated, FlatList, AsyncStorage, Alert, Keyboard } from 'react-native'
import { Avatar, ListItem, Icon, Input } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import EmojiBackground from '../components/EmojiBackground'
import Bubble from '../components/Bubble'
import * as Actions from '../actions'
import socket from '../Socket'

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    account: state.main.account,
    friendList: state.main.friendList,
    openname: state.chat.openname,
    chats: state.chat.chats,
    chatList: state.main.chatList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addMessage (message) { return dispatch(Actions.AddMessageAction(message)) },
    readMessage (channel, uuids) {
      return dispatch(Actions.ReadMessageAction({channel, uuids}))
    }
  }
}

let sequence = 1

export default connect (mapStateToProps, mapDispatchToProps)(
  class ChatPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        selfUserId: 0,
        historyHeight: new Animated.Value(height - 140),
        input: '',
        useless: 1
      }
    }

    componentDidMount () {
      const self = this
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {this._keyboardDidShow(e, self)})
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {this._keyboardDidHide(e, self)})

      // change a useless state
      this.setState({useless: 0})
    }
  
    componentWillUnmount () {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }

    componentWillUpdate (nextProps) {
      const chat = nextProps.chats.find(i => i.name === nextProps.openname)
      if (!chat) {
        return
      }
      const unreads = chat.history.filter(j => j.isRead === false)
      if (unreads.length > 0) {
        nextProps.readMessage(nextProps.openname, unreads.map(i => i.uuid))
        AsyncStorage.setItem(`${this.props.account.id}`, JSON.stringify({
          chats: this.props.chats,
          chatList: this.props.chatList
        }))
        .catch(err => {
          console.error(err)
        })
      }
    }

    // shouldComponentUpdate (nextProps) {
    //   const chats = nextProps.chats.find(i => i.name === nextProps.openname)
    //   if (!chats) {
    //     return true
    //   }
    //   const unreads = chats.history.filter(j => j.isRead === false)
    //   if (unreads.length > 0) {
    //     nextProps.readMessage(nextProps.openname, unreads.map(i => i.uuid))
    //     return false
    //   } else {
    //     return true
    //   }
    // }

    _keyboardDidShow (e, self) {
      // Alert.alert(e.endCoordinates.height.toString())
      Animated.timing(
        self.state.historyHeight,
        {
          toValue: height - 140 - e.endCoordinates.height,
          duration: 200
        }
      ).start()
    }
  
    _keyboardDidHide (e, self) {
      Animated.timing(
        self.state.historyHeight,
        {
          toValue: height - 140,
          duration: 200
        }
      ).start()
    }

    renderBubble = (item) => {
      item = item.item

      return(
        <Bubble
          right={item.sender.id === this.props.account.id}
          text={item.content}
          avatar={item.sender.avatar}
        />
      )
    }

    send = () => {
      const msg = this.state.input
      const channel = this.props.openname
      const self = this.props.account
      if (msg === '') {
        return
      }
      socket.pushMessage({
        sequence: sequence++,
        channel,
        content: msg
      }).then(data => {
        this.setState({input: ''})

        this.props.addMessage({
          uuid: Math.ceil(new Date(data.time).getTime() / 1000),
          isRead: true,
          sender: self,
          time: new Date(data.time).getTime(),
          content: msg,
          channel: channel
        })

        AsyncStorage.setItem(`${this.props.account.id}`, JSON.stringify({
          chats: this.props.chats,
          chatList: this.props.chatList
        }))
        .catch(err => {
          console.error(err)
        })
      }).catch(_ => {
        Alert.alert(`Network error`, 'please resend message')
      })
    }

    renderSendBtn = () => {
      return (
        <Icon
          name="call-made"
          color="#00b973"
          // reverse
          underlayColor="#FFF"
          size={24}
          iconStyle={{}}
          containerStyle={{marginRight: 8}}
          onPress={this.send}
        />
      )
    }

    renderInput = () => {
      return (
        <View>
          <Input
            onChangeText={t => this.setState({input: t})}
            value={this.state.input}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            rightIcon={this.renderSendBtn}  
          />
        </View>
      )
    }

    render () {
      let openchat = {
        name: '',
        history: []
      }
      for (let chat of this.props.chats) {
        if (chat.name === this.props.openname) {
          openchat = chat
        }
      }

      openchat.history.sort((a, b) => a.time - b.time)

      return (
        <EmojiBackground>
          <Animated.View style={{height: this.state.historyHeight}}>
            <FlatList
              data={openchat.history.reverse()}
              renderItem={this.renderBubble}
              keyExtractor={item => item.time.toString()}
              inverted={true}
              extraData={this.props.chats}
            />
          </Animated.View>
          {this.renderInput()}
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
  containerStyle: {
    backgroundColor: '#fff',
    width,
    padding: 5
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4
  }
}
