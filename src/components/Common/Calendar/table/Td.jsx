import React from 'react'
import PropTypes from 'prop-types'

export default function Td(props) {
  const { className, style, children } = props

  Td.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.array,
  }
  return (
    <td style={style} className={className}>
      {children}
    </td>
  )
}
