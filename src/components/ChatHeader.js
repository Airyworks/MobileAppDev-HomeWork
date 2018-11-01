import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { Header } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'

function mapStateToProps (state) {
  return {
    account: state.main.account,
    chatList: state.main.chatList,
    openname: state.chat.openname
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // play () { return dispatch(Actions.musicPlayAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class ChatHeader extends React.Component {
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
      let title = 'Chat Page'
      for (chat of this.props.chatList) {
        // Alert.alert(JSON.stringify(this.props.chatList))
        // Alert.alert(chat.name + ' - ' + this.props.openname)
        if (chat.name === this.props.openname) {
          if (chat.users.length <= 2) {
            for (let i = 0; i < chat.users.length; i++) {
              if (chat.users[i].id !== this.props.account.id) {
                title = chat.users[i].name
              }
            }
          } else {
            const nameArr = []
            for (let i = 0; i < chat.users.length; i++) {
              nameArr.push(chat.users[i].name)
            }
            title = nameArr.join('、')
          }
        }
      }

      return (
        <Header
          placement="center"
          backgroundColor="#ccc"
          leftComponent={{ icon: 'arrow-back', color: '#444', onPress: RouterActions.chatlist }}
          centerComponent={{ text: title, style: { color: '#222', fontSize: 18 } }}
          containerStyle={{paddingTop: 10, height: 60}}
        />
      )
    }
  }
)