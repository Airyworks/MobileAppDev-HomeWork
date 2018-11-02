import React from 'react'
import { AsyncStorage, View, Dimensions, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions as RouterActions } from 'react-native-router-flux'
import idGenerator from 'unique-id-generator'
import * as Actions from '../actions'
import SliderBar from '../components/SliderBar'
import EmojiBackground from '../components/EmojiBackground'
import md5 from 'md5'
import socket from '../Socket'

const { width, height } = Dimensions.get('window')
const headerHeight = 48

function mapStateToProps (state) {
  return {
    chatList: state.main.chatList,
    chats: state.main.chats
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateToken (payload) { return dispatch(Actions.updateToken(payload)) },
    updateChat (payload) { return dispatch(Actions.updateChat(payload)) },
    updateUser (payload) { return dispatch(Actions.updateUser(payload)) },
    updateChatList (payload) { return dispatch(Actions.updateChatList(payload)) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class LoginPage extends React.Component {
    constructor (props) {
      super(props)
      const { config } = props
      this.config = config
      this.state = {
        username: '',
        password: ''
      }
    }

    componentDidMount() {
      this.login()
    }

    login = () => {
      const params = {
        name: 'AAA',//this.state.username,
        pwd: md5('123456')//md5(this.state.password)
      }

      const body = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&')

      return fetch(`http://${this.config.http.host}:${this.config.http.port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        credentials:'include',
        body
      })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          Alert.alert('username and password mismatched.')
        }
      }).then(res => {
        if (res) {
          this.props.updateToken(res.token)
          this.reloadRedux(res.id)
          socket.open().then(() => {
            socket.hello({token: res.token}).then(data => {
              this.props.updateUser(data)
            })
            RouterActions.main()
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
    }

    reloadRedux = (id) => {
      // reload chat history & chat list

      AsyncStorage.getItem(`${id}`)
      .then((resStr) => {
        if (resStr) {
          const res = JSON.parse(resStr)
          this.props.updateChat(res.chats)
          this.props.updateChatList(res.chatList)
        }
      })
      .catch(err => {
        console.error(err)
      })

      // AsyncStorage.setItem(`${id}`, JSON.stringify({
      //   chats: this.props.chats,
      //   chatList: this.props.chatList
      // }))
      // .then(() => {
      //   Alert.alert('done')
      // })
      // .catch(err => {
      //   console.error(err)
      // })
    }

    renderLoginForm = () => {
      return(
        <View style={styles.view}>
          <Input
            containerStyle={styles.input}
            inputContainerStyle={styles.inputText}
            placeholder='username'
            onChangeText={(username) => this.setState({username})}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='#666'
              />
            }
          />
          <Input
            containerStyle={styles.input}
            inputContainerStyle={styles.inputText}
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='#666'
              />
            }
          />
          <Button
            containerStyle={[styles.button, {padding: 0}]}
            inputContainerStyle={[styles.button, {padding: 0}]}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTextStyle}
            title='login'
            loading={true}
            onPress={this.login}
          />
          {/* <Button style={styles.button} title="login"></Button> */}
        </View>
      )
    }

    render () {
      return (
        <EmojiBackground>
          {this.renderLoginForm()}
        </EmojiBackground>
      )
    }
  }
)

const styles = {title: {
  fontSize: 18,
    color: '#FFF'
  },
  view: {
    position: 'relative',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: width * 2 / 3,
    height: 50,
    marginBottom: 25
  },
  inputText: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.4)',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  button: {
    width: width * 2 / 3,
    height: 50,
    borderRadius: 25,
    marginBottom: 25,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  buttonStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    marginBottom: 25,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  buttonTextStyle: {
    color: '#555'
  }
}