/**
 * Action Types
 */
export const REQUEST_TIMESTAMP = 'REQUEST_TIMESTAMP'
export const REQUEST_TIMESTAMP_SUCCEEDED = 'REQUEST_TIMESTAMP_SUCCEEDED'
export const REQUEST_TIMESTAMP_FAILED = 'REQUEST_TIMESTAMP_FAILED'

/**
 * Action Creators
 */
export function requestTimestamp () {
  return {
    type: REQUEST_TIMESTAMP
  }
}

export function requestTimestampSucceeded (timestamp) {
  return {
    type: REQUEST_TIMESTAMP_SUCCEEDED,
    timestamp
  }
}

export function requestTimestampFailed (error) {
  return {
    type: REQUEST_TIMESTAMP_FAILED,
    error
  }
}
