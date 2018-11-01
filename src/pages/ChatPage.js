import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Dimensions, Animated, FlatList, ScrollView, Alert, Keyboard } from 'react-native'
import { Avatar, ListItem, Input } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import EmojiBackground from '../components/emoji-background'
import Bubble from '../components/Bubble'
import * as Actions from '../actions'

const {width, height} = Dimensions.get('window')

export default connect ()(
  class ChatPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        selfUserId: 0,
        historyHeight: new Animated.Value(height - 140)
      }
    }

    componentDidMount () {
      const self = this
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {this._keyboardDidShow(e, self)})
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {this._keyboardDidHide(e, self)})
    }
  
    componentWillUnmount () {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow (e, self) {
      // Alert.alert(e.endCoordinates.height.toString())
      Animated.timing(
        self.state.historyHeight,
        {
          toValue: height - 140 - e.endCoordinates.height,
          duration: 200
        }
      ).start()
    }
  
    _keyboardDidHide (e, self) {
      Animated.timing(
        self.state.historyHeight,
        {
          toValue: height - 140,
          duration: 200
        }
      ).start()
    }

    renderBubble = (item) => {
      item = item.item

      return(
        <Bubble
          right={item.from === this.state.selfUserId}
          text={item.content}
          avatar={
            item.from === this.state.selfUserId
            ? 'https://user-images.githubusercontent.com/9587680/47803553-b99c4480-dd6d-11e8-8299-de4ddd091e1a.png'
            : 'https://user-images.githubusercontent.com/9587680/47803551-b903ae00-dd6d-11e8-8dd8-e0ea57fc32fb.jpg'
          }
        />
      )
    }

    renderInput = () => {
      return (
        <View>
          <Input
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}/>
        </View>
      )
    }

    render () {

      const history = [
        {
          "uuid": 'abc',
          "from": 0,
          "toChannel": 'def',
          "content": '你好',
          "time": new Date('2018-10-31 18:00:20').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": '你好，亲爱的！',
          "time": new Date('2018-10-31 18:01:01').getTime()
        },
        {
          "uuid": 'abc',
          "from": 0,
          "toChannel": 'def',
          "content": '最近和日本的生意谈的怎么样了，有没有问他们要一些特产动作片？',
          "time": new Date('2018-10-31 18:03:45').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": '很顺利，还送了他们两只熊猫。动作片是什么特产，请注意你的言辞。',
          "time": new Date('2018-10-31 18:05:37').getTime()
        },
        {
          "uuid": 'abc',
          "from": 0,
          "toChannel": 'def',
          "content": '那是真的牛皮',
          "time": new Date('2018-10-31 18:07:21').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": '最近感觉头上越来越凉了',
          "time": new Date('2018-10-31 18:10:53').getTime()
        },
        {
          "uuid": 'abc',
          "from": 0,
          "toChannel": 'def',
          "content": '霸王洗发水，我用了大概一个月左右，感觉还不错，后来我在拍的时候也要求他们不要加特技，因为我要让观众看到，我用完之后是这个样子，你们用完之后也会是这个样子！',
          "time": new Date('2018-10-31 18:12:24').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:44').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:45').getTime()
        },
        {
          "uuid": 'abc',
          "from": 1,
          "toChannel": 'def',
          "content": 'Duang!',
          "time": new Date('2018-10-31 18:15:46').getTime()
        }
      ]

      return (
        <EmojiBackground>
          <Animated.View style={{height: this.state.historyHeight}}>
            <FlatList
              data={history}
              renderItem={this.renderBubble}
              keyExtractor={item => item.time.toString()}
            />
          </Animated.View>
          {this.renderInput()}
        </EmojiBackground>
      )
    }
  }
)

const styles = {
  title: {
    fontSize: 18,
    color: '#FFF'
  },
  button: {
    underlayColor: '#E7E7E780'
  },
  containerStyle: {
    backgroundColor: '#fff',
    width,
    padding: 5
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4
  }
}
