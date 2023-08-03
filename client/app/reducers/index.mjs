import {
  combineReducers
} from 'redux'

import reduxStorage from 'redux-storage-middleware/reducer'
import timestamp from './timestamp/index.mjs'

export default combineReducers({
  reduxStorage,
  timestamp
})
