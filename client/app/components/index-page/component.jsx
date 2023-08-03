import React from 'react'
import PropTypes from 'prop-types'

const DATETIME = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

function renderTimestamp (timestamp) {
  if (timestamp) {
    const dateTime = new Date(timestamp)
    return (
      <p>{dateTime.toLocaleString('en-GB', DATETIME)}</p>
    )
  }

  return null
}

export default function IndexPage ({ timestamp, onClick }) {
  return (
    <section>
      <h1>
        Index Page
      </h1>
      {renderTimestamp(timestamp)}
      <button onClick={onClick}>
        Timestamp
      </button>
    </section>
  )
}

IndexPage.propTypes = {
  timestamp: PropTypes.instanceOf(Date),
  onClick: PropTypes.func.isRequired
}
