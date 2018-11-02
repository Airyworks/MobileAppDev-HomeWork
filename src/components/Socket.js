import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { connect as socketConnect } from 'socket.io-client'


function mapStateToProps (state) {
  return {
    token: state.main.token
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // play () { return dispatch(Actions.musicPlayAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class Socket extends React.Component {
    constructor (props) {
      super(props)

      this.socket = socketConnect('ws://103.1.152.97:3001', {
        transports: ['websocket']
      })

      const evs = ['hi', 'new-chat-res', 'pull-message', 'server-received', 'forbidden', 'invalid-param','token-missing']
      evs.forEach(i => {
        this.socket.on(i, data => {
          Alert.alert(JSON.stringify(data))
        })
      })

      if (this.props.token) {
        Alert.alert(this.props.token)
        this.socket.emit('hello', { token: this.props.token })
      }
    }

    render() {
      return (
        <View></View>
      )
    }
  }
)
