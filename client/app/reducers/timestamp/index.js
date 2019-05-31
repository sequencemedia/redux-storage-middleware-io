import {
  REQUEST_TIMESTAMP,
  REQUEST_TIMESTAMP_SUCCEEDED,
  REQUEST_TIMESTAMP_FAILED
} from 'redux-storage-middleware-io/client/app/actions/timestamp'

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
    default:

      return state
  }
}
