import { Scene, Router, Actions } from 'react-native-router-flux'

import { Player, Playerlist } from '../components/'

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='player' component={Player}/>
    <Scene key='playerlist' component={Playerlist}/>
  </Scene>
)

export const Router = () => (
  <View>
    <Router scenes={scenes}/>
  </View>
)