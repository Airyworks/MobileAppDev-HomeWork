import { combineReducers } from 'redux'
import player from './player'
import musicControl from './musicControl'

export default combineReducers({
  player, musicControl
})