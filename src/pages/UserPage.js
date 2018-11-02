import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Alert } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import EmojiBackground from '../components/EmojiBackground'
import Button from '../components/Button'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'

const {width, height} = Dimensions.get('window')

function mapStateToProps (state) {
  return {
    account: state.main.account
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // play () { return dispatch(Actions.musicPlayAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class UserPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {}     // do not use redux because of simplifying
    }

    logout = () => {
      RouterActions.login()
    }

    render () {
      return (
        <EmojiBackground>
          <View>
            <ListItem
              containerStyle={styles.listItem}
              leftAvatar={{ source: { uri: this.props.account.avatar } }}
              title={this.props.account.name}
              subtitle={`user id: ${this.props.account.id}`}
            />
            <Button
              text="Logout"
              textStyle={styles.buttonText}
              containerStyle={styles.exitContainer}
              innerStyle={styles.exit}
              onPress={this.logout}
            ></Button>
          </View>
        </EmojiBackground>
      )
    }
  }
)

const styles = {
  listItem: {
    marginTop: 15
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomColor: 'rgba(150, 150, 150, 0.4)',
    borderBottomWidth: 1
  },
  exitContainer: {
    marginTop: 15
  },
  exit: {
    backgroundColor: '#db0b24'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  }
}
