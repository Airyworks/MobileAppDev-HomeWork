import React from 'react'
import { Header } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'

export default class ChatHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (props) {
    if (!props.isSliding) {
      this.setState({value: props.value})
    }
  }

  render () {

    return (
      <Header
        placement="left"
        backgroundColor="#ccc"
        leftComponent={{ icon: 'arrow-back', color: '#444', onPress: RouterActions.chatlist }}
        centerComponent={{ text: 'Winnie the Pooh', style: { color: '#222' } }}
        rightComponent={{ icon: 'add', color: '#444' }}
        containerStyle={{paddingTop: 10, height: 60}}
      />
    )
  }
}