import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Th } from './table/index'

export default function CalendarNext(props) {
  CalendarNext.propTypes = {
    next: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
    handleNext: PropTypes.func.isRequired,
  }

  const handleNextClick = (calendar) => {
    const { handleNext } = props
    if (handleNext) {
      handleNext(calendar)
    }
  }

  const { next, calendar } = props
  const className = classNames({ next, available: next })
  const onClick = calendar
    ? () => {
        handleNextClick(calendar)
      }
    : () => {}
  const Span = next ? <span /> : null
  const nextProps = {
    className,
    onClick,
  }
  return <Th {...nextProps}>{Span}</Th>
}
