import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import Routers from './src/routers'

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routers />
    </PersistGate>
  </Provider>
)
