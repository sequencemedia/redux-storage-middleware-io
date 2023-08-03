import React from 'react'
import {
  hydrateRoot
} from 'react-dom/client'
import {
  Provider
} from 'react-redux'

import reduxStorageInitialState from 'redux-storage-middleware/initial-state'

import IndexPage from './app/components/index-page/index.mjs'

import {
  configureStore
} from './app/store/index.mjs'

const state = JSON.parse(document.getElementById('initial-state').textContent || '{}')

const initialState = ({ timestamp: { timestamp }, ...state }) => ({
  ...state,
  timestamp: {
    timestamp: new Date(timestamp)
  }
})

const store = configureStore({
  ...initialState(state),
  reduxStorage: reduxStorageInitialState()
})

Object
  .entries(reduxStorageInitialState())
  .forEach(([key, value]) => {
    console.group(key)
    console.table(value)
    console.groupEnd()
  })

function App () {
  return (
    <Provider store={store}>
      <IndexPage />
    </Provider>
  )
}

const app = document.getElementById('app')

hydrateRoot(
  app,
  <App />
)
