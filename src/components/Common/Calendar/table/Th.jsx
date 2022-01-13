import React from 'react'
import PropTypes from 'prop-types'

export default function Th(props) {
  const { className, onClick, style, children, colSpan, onMouseDown } = props
  Th.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    colSpan: PropTypes.number,
  }

  return (
    <th
      style={style}
      onClick={onClick}
      colSpan={colSpan}
      onMouseDown={onMouseDown}
      className={className}
    >
      {children}
    </th>
  )
}
