import { handleActions } from 'redux-actions'

export const initialState = {
  track: {
    id: 347230,
    name: '海阔天空',
    mp3Url: 'http://music.163.com/song/media/outer/url?id=347230.mp3',
    lyric: '',
    album: {
      id: 34209,
      name: '海阔天空',
      picUrl: 'http://p2.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg'
    },
    artist: {
      id: 11127,
      name: 'Beyond'
    }
  },
  playlist: [],
  // duration has been passed, millisecond
  currentTime: 0,
  // total duration of the track
  duration: 210,
  // playable duration (buffer in seconds)
  playable: 0,
  // 'repeat' | 'repeat-one' | 'shuffle' | 'serial'
  mode: 'repeat',
  isPlaying: false,
  history: [],
  isSliding: false
}

export default handleActions({
  'player-play' (state, { payload }) {
    // const { playlist, track, currentTime } = payload
    // return {
    //   ...state,
    //   playlist: playlist ? playlist : [ track ], 
    //   track,
    //   currentTime: currentTime ? currentTime : 0,
    //   isPlaying: true
    // }
    return {
      ...state,
      isPlaying: true
    }
  },
  'player-pause' (state) {
    return {
      ...state,
      isPlaying: false
    }
  },
  'player-next' () {},
  'player-prev' () {},
  'player-playlist-create' () {},
  'player-history-save' () {},
  'player-slide-start' (state) {
    return {
      ...state,
      isSliding: true
    }
  },
  'player-slide-complete' (state) {
    return {
      ...state,
      isSliding: false
    }
  },
  'player-set-slide-time' (state, {payload}) {
    return {
      ...state,
      currentTime: payload
    }
  },
  'player-audio-end' (state) {
    return {
      ...state,
      // isPlaying: false
    }
  },
  'player-audio-load' (state, {payload}) {
    return {
      ...state,
      duration: payload.duration,
      currentTime: payload.currentPosition
    }
  },
  'player-audio-load-start' (state) {
    // do nothing
    return {
      ...state
    }
  },
  'player-audio-progress' (state, {payload}) {
    return {
      ...state,
      currentTime: payload.currentTime
    }
  },
  'player-change-mode' (state, {payload}) {
    let mode = ''
    switch (payload) {
      case 'repeat':
        mode = 'repeat-one'
        break
      case 'repeat-one':
        mode = 'shuffle'
        break
      case 'shuffle':
        mode = 'serial'
        break
      case 'serial':
      default:
        mode = 'repeat'
    }
    return {
      ...state,
      mode
    }
  }
}, initialState)
