import React from 'react'
import { View, Dimensions, Text, Image } from 'react-native'
import { Avatar } from 'react-native-elements'

const {width, height} = Dimensions.get('window')
const emojiWidth = 1350
const emojiHeight = 40
const emojiPadding = 15

const arrowLeft = require('./assets/bubble-arrow-left.png')
const arrowRight = require('./assets/bubble-arrow-right.png')

const Bubble = props => {
  let { text, right, avatar } = props

  return (
    <View style={[
      styles.view,
      {
        flexDirection: right ? 'row-reverse' : 'row'
      }
    ]}>
      <Avatar
        containerStyle={right ? styles.avatarRight : styles.avatarLeft}
        size="medium"
        source={{uri: avatar}}
        activeOpacity={0.7}
      />
      <View style={[
          styles.common,
          right ? styles.right : styles.left
        ]}>
        <Text style={styles.text}>{text}</Text>
        <Image
          source={
            right ? arrowRight : arrowLeft
          }
          style={[
            styles.arrowCommon,
            right ? styles.arrowRight : styles.arrowLeft
          ]}/>
      </View>
    </View>
  )
}

const styles = {
  view: {
    marginTop: 15
  },
  avatarLeft: {
    marginLeft: 15,
    marginRight: 20
  },
  avatarRight: {
    marginLeft: 20,
    marginRight: 15
  },
  common: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    position: 'relative'
  },
  right: {
    borderColor: '#6fb44d',
    backgroundColor: '#a0e75a'
  },
  left: {
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    maxWidth: width - 200
  },
  arrowCommon: {
    position: 'absolute',
    top: -4
  },
  arrowRight: {
    right: -11
  },
  arrowLeft: {
    left: -12
  }
}

export default Bubble
