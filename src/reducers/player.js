import { handleActions } from 'redux-actions'

export const initialState = {
  track: null,
  playlist: [],
  // duration has been passed, millisecond
  currentTime: 0,
  // total duration of the track
  duration: 0,
  mode: '',
  isPlaying: false,
  history: [],
  uri: ''
}

export default handleActions({
  'player-play' (state, { payload }) {
    const { playlist, track, currentTime } = payload
    return {
      ...state,
      playlist: playlist ? playlist : [ track ], 
      track,
      currentTime: currentTime ? currentTime : 0,
      isPlaying: true
    }
  },
  'player-pause' () {},
  'player-next' () {},
  'player-prev' () {},
  'player-playlist-create' () {},
  'player-history-save' () {}
}, initialState)