import React from 'react'
import { Input } from 'react-native-elements'


const window = Dimensions.get('window')
const inputWidth = window.width * 2 / 3
const inputHeight = 40

const Input = props => {
  let { width, height } = props
  width = width ? parseFloat(width) : inputWidth
  height = height ? parseFloat(height) : inputHeight

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
    <TextInput/>
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
    zIndex: 1
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10
  },
  emojiLine: {
    resizeMode: 'stretch',
    width: emojiWidth,
    height: emojiHeight,
    marginBottom: emojiPadding
  },
  emojiLineOffset: {
    transform: 'translateX(-20)'
  }
}

export default Input
