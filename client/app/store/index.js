import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'

import createStorageMapMiddleware from 'redux-storage-middleware/lib/storage-map'
import storageMiddleware from 'redux-storage-middleware/lib/storage'
import createSagaMiddleware from 'redux-saga'

import reducers from 'redux-storage-middleware-io/client/app/reducers'
import sagas from 'redux-storage-middleware-io/client/app/sagas'

const log = () => (next) => (action) => {
  const {
    type,
    ...data
  } = action

  console.group(type)
  console.table(data)

  next(action)

  console.groupEnd()
}

export const configureStore = (initialState) => {
  /*
   *  Create the Storage Map middleware
   */
  const storageMapMiddleware = createStorageMapMiddleware([
    {
      type: 'REQUEST_TIMESTAMP',
      meta: {
        type: 'REQUEST_TIMESTAMP_FAILED',
        cacheFor: 1000 * 60 * 60 * 24 + 1000 * 60 + 60
      }
    },

    {
      type: 'REQUEST_TIMESTAMP',
      meta: {
        type: 'REQUEST_TIMESTAMP_SUCCEEDED',
        cacheFor: 1000 * 60 * 60 * 24 + 1000 * 60 + 60
      }
    }
  ])

  /*
   *  Create the Saga middleware
   */
  const sagaMiddleware = createSagaMiddleware()

  /*
   *  Mount the Store and the Saga middleware
   */
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        log,
        storageMapMiddleware,
        storageMiddleware,
        sagaMiddleware
      )
    )
  )

  /*
   *  Run the Sagas
   */
  sagaMiddleware.run(sagas)

  return store
}
