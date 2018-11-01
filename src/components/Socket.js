import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import SocketIOClient from 'socket.io-client'


export default class Socket {
  constructor () {
    this.socket = SocketIOClient.connect('ws://103.1.152.97:3001', {
      transports: ['websocket']
    })

    const token = '329EF2787271D377'

    const evs = ['hi', 'new-chat-res', 'pull-message', 'server-received', 'forbidden', 'invalid-param','token-missing']
    evs.forEach(i => {
      this.socket.on(i, data => {
        Alert.alert(JSON.stringify(data))
      })
    })
    this.socket.emit('hello', { token })
  }
}
