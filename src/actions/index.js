import { createAction } from 'redux-actions'

export const musicPlayAction = createAction('player-play')
export const musicPauseAction = createAction('player-pause')
export const nextTrackAction = createAction('player-next')
export const prevTrackAction = createAction('player-prev')
export const createPlaylistAction = createAction('player-playlist-create')
export const saveHistoryAction = createAction('player-history-save')
export const slideStartAction = createAction('player-slide-start')
export const slideCompleteAction = createAction('player-slide-complete')
export const setSlideTimeAction = createAction('player-set-slide-time')
export const audioEndAction = createAction('player-audio-end')
export const audioLoadAction = createAction('player-audio-load')
export const audioLoadStartAction = createAction('player-audio-load-start')
export const audioProgressAction = createAction('player-audio-progress')
export const changeModeAction = createAction('player-change-mode')
export const updateTrackAction = createAction('player-update-track')
export const updatePlaylistAction = createAction('player-update-playlist')
export const playerShowAction = createAction('player-show')
export const playerHideAction = createAction('player-hide')
export const updateUser = createAction('update-user')
