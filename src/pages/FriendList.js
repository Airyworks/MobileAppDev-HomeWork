import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, ScrollView, Alert } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'

export default connect ()(
  class ChatPage extends React.Component {
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
      const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Tom Jerry',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Tom Jerry',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Tom Jerry',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        },
        {
          name: 'Tom Jerry',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
        }
      ]

      return (
        <ScrollView style={{ flexDirection: 'column'}}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={this.renderAvatar(l.avatar_url)}
                title={l.name}
                containerStyle={styles.listItem}
                onPress={() => {
                  // Alert.alert(`start chat ${l.name}`)
                  
                }}
              />
            ))
          }
        </ScrollView>
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
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomColor: 'rgba(150, 150, 150, 0.4)',
    borderBottomWidth: 1
  }
}
