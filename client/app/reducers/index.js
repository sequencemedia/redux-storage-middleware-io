import {
  combineReducers
} from 'redux'

import reduxStorage from 'redux-storage-middleware/lib/reducer'
import timestamp from './timestamp'

export default combineReducers({
  reduxStorage,
  timestamp
})
