import React from 'react'
import { Animated, View, Dimensions, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions as RouterActions } from 'react-native-router-flux'
import idGenerator from 'unique-id-generator'
import * as Actions from '../actions'
import SliderBar from '../components/SliderBar'
import EmojiBackground from '../components/EmojiBackground'
import md5 from 'md5'
import socket from '../components/Socket'

const { width, height } = Dimensions.get('window')
const headerHeight = 48

export default connect ()(
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

    componentDidMount(){
      // Alert.alert(`http://${this.config.http.host}:${this.config.http.port}/login`)
      // const obj = {
      //   name: 'AAA',
      //   pwd: md5('123456')
      // }
      // const body = Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData())

      // return fetch(`http://${this.config.http.host}:${this.config.http.port}/login`, {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      //   },
      //   body
      // })
      // .then(response => {
      //   console.warn(response)
      // })
    }

    login = () => {
      return RouterActions.main()
      fetch(`https://${this.config.http.host}:${this.config.http.port}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: {
          name: 'AAA',
          pwd: md5('123456')
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(JSON.stringify(responseJson))
      })
      .catch((err) => {
        console.error(JSON.stringify(err))
      })
      // Alert.alert(`http://${this.config.http.host}:${this.config.http.port}/login`)
      // if (this.state.username && this.state.password) {
        // fetch(`http://${this.config.http.host}:${this.config.http.port}/login`, {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   body: {
        //     name: this.state.username,
        //     pwd: this.state.password
        //   },
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //   Alert.alert(JSON.stringify(responseJson))
        // })
        // .catch((err) => {
        //   Alert.alert(JSON.stringify(err))
        // })
      // }
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