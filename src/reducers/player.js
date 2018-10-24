import { handleActions } from 'redux-actions'
import shuffle from 'shuffle-array'

export const initialState = {
  track: {
    id: 0,
    name: '',
    mp3Url: undefined,
    lyric: '',
    isLocal: false,
    al: {
      id: 0,
      name: '',
      picUrl: undefined
    },
    ar: [{
      id: 0,
      name: ''
    }]
  },
  playlist: [],
  realPlaylist: undefined, // a generation funciton
  nextTrack: {
    track: undefined,
    isPrev: false
  },
  // duration has been passed, millisecond
  currentTime: 0,
  // total duration of the track
  duration: 0,
  // playable duration (buffer in seconds)
  playable: 0,
  // 'repeat' | 'repeat-one' | 'shuffle' | 'serial'
  mode: 'repeat',
  isPlaying: false,
  history: [],
  offset: 0,
  isSliding: false
}

function* genRealList (mode, list, track) {
  switch (mode) {
    case 'repeat':
      let i = 0
      while (true) {
        yield list[i++]
        if (i >= list.length) {
          i = 0
        }
      }
      break
    case 'repeat-one':
      while (true) {
        yield track
      }
      break
    case 'shuffle':
      while (true) {
        const rand = shuffle(list, {copy: true})
        for (let i = 0; i < rand.length; i++) {
          yield rand[i]
        }
      }
      break
    case 'serial':
    default:
      for (let i = 0; i < list.length; i++) {
        yield list[i]
      }
  }
}

function findItem (arr, index) {
  if (index >= 0) return arr[index]
  else if (index === -1) return arr.slice(-1)[0]
  else return arr.slice(index, index + 1)[0]
}

export default handleActions({
  'player-play' (state) {
    return {
      ...state,
      isPlaying: true
    }
  },
  'player-update-track' (state, {payload}) {
    let next
    let saveToHistory = true
    if (!payload) {
      next = state.nextTrack.track
      saveToHistory = !state.nextTrack.isPrev
    } else {
      next = payload
    }
    let history = state.history
    if (history.length === 0 || saveToHistory) {
      history.push(next)
    }
    return {
      ...state,
      track: next,
      isPlaying: true,
      nextTrack: {
        track: undefined,
        isPrev: false
      },
      history
    }
  },
  'player-update-playlist' (state, {payload}) {
    return {
      ...state,
      playlist: payload,
      realPlaylist: genRealList(state.mode, payload, payload[0] || initialState.track)
    }
  },
  'player-pause' (state) {
    return {
      ...state,
      isPlaying: false
    }
  },
  'player-next' (state) {
    // console.warn(state.offset, state.history.map(i=>i.name))
    // check if has been moved previously
    if (state.offset >= 1) {
      const offset = state.offset - 1
      return {
        ...state,
        offset,
        nextTrack: {
          track: findItem(state.history, - offset - 1),
          isPrev: false
        }
      }
    }
    // call generated func and if is done set isPlaying false
    if (state.realPlaylist) {
      const nextTrack = state.realPlaylist.next()
      if (!nextTrack.done) {
        return {
          ...state,
          nextTrack: {
            track: nextTrack.value,
            isPrev: false
          }
        }
      }
    }
    return {
      ...state,
      isPlaying: false
    }
  },
  'player-prev' (state) {
    // console.warn(state.offset, state.history.map(i=>i.name))
    const history = state.history
    if (history.length <= 1) {
      return {
        ...state,
        nextTrack: state.track
      }
    } else {
      const track = findItem(history, - state.offset -2)
      return {
        ...state,
        nextTrack: {
          track,
          isPrev: true
        },
        offset: state.offset + 1
      }
    }
  },
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
    // do nothing
    return {
      ...state
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
      mode,
      realPlaylist: genRealList(mode, state.playlist, state.track)
    }
  }
}, initialState)
