import { Scene, Router, Actions } from 'react-native-router-flux'
import * as React from 'react'
import { View } from 'react-native'

import Player from '../pages/PlayerPage'
import Playerlist from '../components/Playlist'

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='player' hideNavBar={true} component={Player} initial={true}/>
    <Scene key='playerlist' component={Playerlist}/>
  </Scene>
)

export default () => (
  <View style={{flex: 1}}>
    <Router scenes={scenes}/>
  </View>
)