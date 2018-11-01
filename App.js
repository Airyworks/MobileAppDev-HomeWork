import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import Routers from './src/routers'

export default () => (
  <Provider store={store}>
    <Routers />
  </Provider>
)
