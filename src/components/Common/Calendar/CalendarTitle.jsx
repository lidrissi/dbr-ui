import React from 'react'
import PropTypes from 'prop-types'
import { Th } from './table/index'

export default function CalendarTitle(props) {
  CalendarTitle.propTypes = {
    calendar: PropTypes.object.isRequired,
    colSpan: PropTypes.number.isRequired,
    className: PropTypes.string,
  }

  const { calendar, colSpan, className } = props
  const titleProps = { colSpan, className }
  const label = calendar.format('MMM YYYY')
  return <Th {...titleProps}>{label}</Th>
}
