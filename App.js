import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'

import Player from './src/components/Player'

export default () => (
  <Provider store={store}>
    <Player></Player>
  </Provider>
)
