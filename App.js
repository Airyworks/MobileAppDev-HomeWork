import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import Routers from './src/routers'
import Socket from './src/components/Socket'

const socket = new Socket()

export default () => (
  <Provider store={store}>
    <Routers />
  </Provider>
)
