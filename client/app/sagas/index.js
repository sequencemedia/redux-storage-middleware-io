import {
  call,
  put,
  takeLatest,
  all
} from 'redux-saga/effects'

import {
  REQUEST_TIMESTAMP,
  requestTimestampSucceeded,
  requestTimestampFailed
} from 'redux-storage-middleware-io/client/app/actions/timestamp'

import * as api from 'redux-storage-middleware-io/client/api/timestamp'

function * timestamp () {
  try {
    const { timestamp } = yield call(api.requestTimestamp)
    yield put(requestTimestampSucceeded(timestamp))
  } catch ({ message = 'No error message defined' }) {
    yield put(requestTimestampFailed({ message }))
  }
}

export function * watchTimestamp () {
  yield takeLatest(REQUEST_TIMESTAMP, timestamp)
}

export default function * rootSaga () {
  yield all([
    watchTimestamp()
  ])
}
