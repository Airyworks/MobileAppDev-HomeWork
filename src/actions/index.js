import { createAction } from 'redux-actions'

export const musicPlayAction = createAction('player-play')
export const musicPauseAction = createAction('player-pause')
export const nextTrackAction = createAction('player-next')
export const prevTrackAction = createAction('player-prev')
export const createPlaylistAction = createAction('player-playlist-create')
export const saveHistoryAction = createAction('player-history-save')