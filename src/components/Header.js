import React from 'react'
import { Alert } from 'react-native'
import { Header } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'

const title = {
  '_chatlist': 'Chat List',
  '_friend': 'Friend List'
}

export default class MyHeader extends React.Component {
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
        centerComponent={{ text: title[RouterActions.currentScene], style: { color: '#222', fontSize: 18 } }}
        rightComponent={RouterActions.currentScene === '_friend' ? { icon: 'add', color: '#444' } : undefined}
        containerStyle={{paddingTop: 10, height: 60}}
      />
    )
  }
}