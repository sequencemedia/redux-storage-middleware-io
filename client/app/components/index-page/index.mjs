import {
  connect
} from 'react-redux'

import {
  requestTimestamp
} from '#client/app/actions/timestamp'

import Component from './component.cjs'

const mergeStateToProps = ({ timestamp }) => ({ ...timestamp })

const mapDispatchToProps = (dispatch) => ({ onClick: () => dispatch(requestTimestamp()) })

const mergeProps = (props, dispatch) => ({
  ...props,
  ...dispatch
})

export default connect(mergeStateToProps, mapDispatchToProps, mergeProps)(Component)
