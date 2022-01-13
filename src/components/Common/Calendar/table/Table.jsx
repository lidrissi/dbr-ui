import React from 'react'
import PropTypes from 'prop-types'

export default function Table(props) {
  const { className, style, children } = props
  Table.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.array,
  }
  return (
    <table style={style} className={className}>
      {children}
    </table>
  )
}
