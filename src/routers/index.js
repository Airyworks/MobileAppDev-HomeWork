import { Scene, Router, Actions } from 'react-native-router-flux'
import * as React from 'react'
import { View } from 'react-native'

import Player from '../pages/PlayerPage'
import Playerlist from '../pages/PlaylistPage'

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='player' hideNavBar={true} component={Player}/>
    <Scene key='playerlist' hideNavBar={true} component={Playerlist} initial={true}/>
  </Scene>
)

export default () => (
  <View style={{flex: 1}}>
    <Router scenes={scenes}/>
    <Player />
  </View>
)