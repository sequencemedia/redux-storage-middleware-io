import {
  STORAGE_FETCH,
  STORAGE_STORE,
  STORAGE_WRITE
} from 'redux-storage-middleware/actions'

import {
  REQUEST_TIMESTAMP,
  REQUEST_TIMESTAMP_SUCCEEDED,
  REQUEST_TIMESTAMP_FAILED
} from '#client/app/actions/timestamp'

export default function timestampReducer (state = { timestamp: new Date() }, { type, ...action } = {}) {
  switch (type) {
    case REQUEST_TIMESTAMP:

      return { ...state, ...action }
    case REQUEST_TIMESTAMP_SUCCEEDED:
    {
      const {
        timestamp
      } = action

      return { ...state, ...action, timestamp: new Date(timestamp) }
    }
    case REQUEST_TIMESTAMP_FAILED:

      return { ...state, ...action }
    case STORAGE_WRITE:
    {
      const {
        data: {
          type: TYPE,
          ...ACTION
        } = {}
      } = action

      switch (TYPE) {
        case REQUEST_TIMESTAMP:

          return { ...state, ...ACTION }
        default:

          return state
      }
    }

    case STORAGE_FETCH:
    {
      const {
        data: {
          type: TYPE,
          ...ACTION
        } = {}
      } = action

      switch (TYPE) {
        case REQUEST_TIMESTAMP:

          return { ...state, ...ACTION }
        case REQUEST_TIMESTAMP_SUCCEEDED:
        {
          const {
            timestamp
          } = ACTION

          return { ...state, ...ACTION, timestamp: new Date(timestamp) }
        }
        case REQUEST_TIMESTAMP_FAILED:

          return { ...state, ...ACTION }
        default:

          return state
      }
    }

    case STORAGE_STORE:
    {
      const {
        data: {
          type: TYPE,
          ...ACTION
        } = {}
      } = action

      switch (TYPE) {
        case REQUEST_TIMESTAMP:

          return { ...state, ...ACTION }
        case REQUEST_TIMESTAMP_SUCCEEDED:
        {
          const {
            timestamp
          } = ACTION

          return { ...state, ...ACTION, timestamp: new Date(timestamp) }
        }
        case REQUEST_TIMESTAMP_FAILED:

          return { ...state, ...ACTION }
        default:

          return state
      }
    }
    default:

      return state
  }
}
