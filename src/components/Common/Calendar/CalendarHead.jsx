import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { THead, Tr, Th } from './table/index'
import CalendarNext from './CalendarNext'
import CalendarPrev from './CalendarPrev'
import CalendarTitle from './CalendarTitle'

export default function CalendarHeader(props) {
  CalendarHeader.propTypes = {
    showISOWeekNumbers: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    locale: PropTypes.object.isRequired,
    showNext: PropTypes.bool,
    showPrev: PropTypes.bool,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    calendar: PropTypes.any,
    showDropdowns: PropTypes.bool,
    handleSelected: PropTypes.func,
  }

  const nextDate = (calendar) => calendar.add(1, 'month')
  const prevDate = (calendar) => calendar.subtract(1, 'month')

  const { showNext, calendar, handleNext, showPrev, handlePrev } = props
  const createNextProps = useCallback(() => {
    return {
      next: showNext,
      calendar: nextDate(calendar),
      handleNext,
    }
  })

  const createPrevProps = useCallback(() => {
    return {
      prev: showPrev,
      calendar: prevDate(calendar),
      handlePrev,
    }
  })

  const createTitleProps = useCallback(() => {
    const { showISOWeekNumbers, showWeekNumbers } = props
    const colSpan = showISOWeekNumbers || showWeekNumbers ? 6 : 5
    return {
      colSpan,
      calendar,
    }
  })

  const renderWeeks = useCallback(() => {
    const {
      showWeekNumbers,
      showISOWeekNumbers,
      locale: { weekNames, weekLabel },
    } = props
    const showWeeks = showISOWeekNumbers || showWeekNumbers
    const weeks = showWeeks ? [weekLabel].concat(weekNames) : weekNames
    const WeekData = weeks.map((children, key) => {
      const className = classNames({
        week: !!(key === 0 && showWeeks),
      })
      const thProps = {
        children,
        className,
        key,
      }
      return <Th {...thProps} />
    })
    return <Tr>{WeekData}</Tr>
  })

  const prev = createPrevProps()
  const next = createNextProps()
  const title = createTitleProps()
  return (
    <THead>
      <Tr>
        <CalendarPrev {...prev} />
        <CalendarTitle {...title} />
        <CalendarNext {...next} />
      </Tr>
      {renderWeeks()}
    </THead>
  )
}
