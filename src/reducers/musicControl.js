import { handleActions } from 'redux-actions'
import MusicControl from 'react-native-music-control'

export default handleActions({
  'player-play' (state) {
    MusicControl.updatePlayback({state: MusicControl.STATE_PLAYING})
    return {
      ...state
    }
  },
  'player-pause' (state) {
    MusicControl.updatePlayback({state: MusicControl.STATE_PAUSED})
    return {
      ...state
    }
  },
  'player-next' (state) {
    MusicControl.resetNowPlaying()
    return {
      ...state
    }
  },
  'player-prev' (state) {
    MusicControl.resetNowPlaying()
    return {
      ...state
    }
  }
}, {})