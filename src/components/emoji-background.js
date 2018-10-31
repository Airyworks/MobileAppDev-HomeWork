import React from 'react'
import { View, Dimensions, Image, StyleSheet } from 'react-native'

const window = Dimensions.get('window')
const emojiWidth = 1350
const emojiHeight = 40
const emojiPadding = 15

const EmojiBackground = props => {
  let { width, height, children, style } = props
  width = width ? parseFloat(width) : window.width
  height = height ? parseFloat(height) : window.height

  const emojiLine = require('./assets/emoji-line.jpg')
  
  const emojiBg = []
  for (let i = 0; i <= height / (emojiHeight + emojiPadding); i++) {
    const emojiStyle = [styles.emojiLine]
    if (i % 2 === 0) {
      emojiStyle.push(styles.emojiLineOffset)
    }
    emojiBg.push(
      <Image
        key={i}
        style={emojiStyle}
        source={emojiLine}></Image>
    )
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.view,
        {
          width, height
        },
        style
      ])}
    >
      <View style={styles.backgroundContainer}>
        {emojiBg}
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  )
}

const styles = {
  view: {
    position: 'relative',
    backgroundColor: '#fff'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10
  },
  emojiLine: {
    resizeMode: 'stretch',
    width: emojiWidth,
    height: emojiHeight,
    marginBottom: emojiPadding
  },
  emojiLineOffset: {
    transform: [
      {translateX: -24}
    ]
  }
}

export default EmojiBackground
