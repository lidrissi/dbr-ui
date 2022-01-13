import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Th } from './table/index'

export default function CalendarPrev(props) {
  CalendarPrev.propTypes = {
    prev: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
    handlePrev: PropTypes.func,
  }

  const handlePrevClick = (calendar) => {
    const { handlePrev } = props
    if (handlePrev) {
      handlePrev(calendar)
    }
  }

  const { calendar, prev } = props
  const className = classNames({ prev, available: prev })
  const onClick = calendar
    ? () => {
        handlePrevClick(calendar)
      }
    : () => {}
  const Span = prev ? <span /> : null
  const prevProps = {
    className,
    onClick,
  }
  return <Th {...prevProps}>{Span}</Th>
}
