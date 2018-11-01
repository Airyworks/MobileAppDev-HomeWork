import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Dimensions, Animated, FlatList, ScrollView, Alert, Keyboard } from 'react-native'
import { Avatar, ListItem, Input } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import EmojiBackground from '../components/EmojiBackground'
import Bubble from '../components/Bubble'
import * as Actions from '../actions'

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    account: state.main.account,
    friendList: state.main.friendList,
    openname: state.chat.openname,
    chats: state.chat.chats
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // play () { return dispatch(Actions.musicPlayAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class ChatPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        selfUserId: 0,
        historyHeight: new Animated.Value(height - 140)
      }
    }

    componentDidMount () {
      const self = this
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {this._keyboardDidShow(e, self)})
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {this._keyboardDidHide(e, self)})
    }
  
    componentWillUnmount () {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }

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

    getFriendById = (id) => {
      if (this.props.account.id === id) return this.props.account
      for (let friend of this.props.friendList) {
        if (friend.id === id) {
          return friend
        }
      }
      return null
    }

    renderBubble = (item) => {
      item = item.item
      const friend = this.getFriendById(item.from)

      return(
        <Bubble
          right={item.from === this.props.account.id}
          text={item.content}
          avatar={friend.avatar}
        />
      )
    }

    renderInput = () => {
      return (
        <View>
          <Input
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}/>
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

      return (
        <EmojiBackground>
          {/* <Animated.ScrollView style={{ height: this.state.historyHeight }}>
            {
            openchat.history.map((l, i) => {
              const friend = this.getFriendById(l.from)
              return (
                <Bubble
                  key={i}
                  right={l.from === this.props.account.id}
                  text={l.content}
                  avatar={friend.avatar}
                />
              )
            })
            }
          </Animated.ScrollView> */}
          <Animated.View style={{height: this.state.historyHeight}}>
            <FlatList
              data={openchat.history.reverse()}
              renderItem={this.renderBubble}
              keyExtractor={item => item.time.toString()}
              inverted={true}
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
