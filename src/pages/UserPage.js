import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, ScrollView, Alert, FlatList } from 'react-native'
import { Avatar, ListItem, Button } from 'react-native-elements'
import EmojiBackground from '../components/EmojiBackground'
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

    renderAvatar = (uri) => {
      return (
        <Avatar
          size="small"
          rounded
          source={{uri}}
          activeOpacity={0.7}
        />
      )
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
            <ListItem
              containerStyle={styles.exit}
              title={'Logout'}
            />
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
  exit: {
    marginTop: 15
  }
}
