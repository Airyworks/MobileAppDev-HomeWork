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

const { width, height } = Dimensions.get('window')
const headerHeight = 48

export default connect ()(
  class LoginPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = { }
    }

    renderLoginForm = () => {
      return(
        <View style={styles.view}>
          <Input
            containerStyle={styles.input}
            inputContainerStyle={styles.inputText}
            placeholder='username'
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
            onPress={() => {
              // user verify
              RouterActions.main()
              // RouterActions.friend()
              // RouterActions.header()
            }}
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