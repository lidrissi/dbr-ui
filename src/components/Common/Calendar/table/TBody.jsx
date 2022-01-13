import React from 'react'
import PropTypes from 'prop-types'

export default function TBody(props) {
  const { className, style, children } = props

  TBody.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.any,
  }
  return (
    <tbody style={style} className={className}>
      {children}
    </tbody>
  )
}
