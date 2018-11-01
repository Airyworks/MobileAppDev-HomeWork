import { combineReducers } from 'redux'
import main from './main'
import chat from './chat'
import player from './player'

export default combineReducers({
  main,
  chat
})
