import React from 'react'
import { View, TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const Button = props => {
  let { text, containerStyle, innerStyle, textStyle, onPress } = props


  return (
    <View
      style={StyleSheet.flatten([
        styles.view,
        innerStyle,
        containerStyle
      ])}
    >
      <TouchableHighlight
        onPress={onPress}
        underlayColor={'#eee'}
        style={StyleSheet.flatten([
          styles.highlight,
          innerStyle
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.text,
            textStyle
          ])}
        >{text}</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  view: {
    width,
    height: 50
    // backgroundColor: '#fff'
  },
  highlight: {
    height: 50,
    backgroundColor: '#ddd'
  },
  text: {
    textAlign: 'center',
    color: '#555',
    fontSize: 18,
    lineHeight: 50
  }
}

export default Button
