import { Scene, Router, Actions, Tabs } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as React from 'react'
import { View } from 'react-native'

import socket from '../Socket'
import Login from '../pages/LoginPage'
import Header from '../components/Header'
import ChatHeader from '../components/ChatHeader'
import FriendList from '../pages/FriendListPage'
import ChatList from '../pages/ChatListPage'
import Chat from '../pages/ChatPage'
import config from '../../config'

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='login' hideNavBar component={Login} config={config} initial/>
    <Tabs key="main" navBar={Header}>
      <Scene key='chatlist'
            tabBarLabel='chat'
            icon={ () => (
              <Icon
                name='comments'
                size={24}
                color='#666'
              />
            )}
            hideNavBar
            component={ChatList}/>
      <Scene key='friend'
            tabBarLabel='friends'
            icon={ () => (
              <Icon
                name='users'
                size={24}
                color='#666'
              />
            )}
            hideNavBar
            component={FriendList}
            />
    </Tabs>
    <Scene key='chat' navBar={ChatHeader} component={Chat}/>
  </Scene>
)

export default () => (
  <View style={{flex: 1}}>
    <Router scenes={scenes}/>
  </View>
)