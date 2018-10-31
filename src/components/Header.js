import React from 'react'
import { Header } from 'react-native-elements'

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
        centerComponent={{ text: 'Chat List', style: { color: '#222' } }}
        rightComponent={{ icon: 'add', color: '#444' }}
        containerStyle={{paddingTop: 10, height: 60}}
      />
    )
  }
}