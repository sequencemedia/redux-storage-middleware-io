import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const IndexPage = ({ timestamp, onClick }) => (
  <section>
    <h1>
      Index Page
    </h1>
    {do {
      if (timestamp) {
        <p>{moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
      }
    }}
    <button onClick={onClick}>
      Timestamp
    </button>
  </section>
)

IndexPage.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired
}

export default IndexPage
