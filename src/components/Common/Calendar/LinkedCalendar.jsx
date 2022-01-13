import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { dayjs } from './utils'
import { Table } from './table/index'
import CalendarBody from './CalendarBody'
import CalendarHead from './CalendarHead'

export default function LinkedCalendar(props) {
  LinkedCalendar.propTypes = {
    children: PropTypes.array,
    dateRange: PropTypes.object,
  }
  const {
    dateRange: { start },
  } = props
  const [leftCalendar, setLeftCalendar] = useState(dayjs(start))
  const [rightCalendar, setRightCalendar] = useState(
    dayjs(start).add(1, 'month'),
  )

  const handlePrev = (leftCal) => {
    setLeftCalendar(leftCal)
    setRightCalendar(leftCal.add(1, 'month'))
  }

  const handleNext = (rightCal) => {
    setLeftCalendar(rightCal.subtract(1, 'month'))
    setRightCalendar(rightCal)
  }

  const leftState = { ...props, calendar: leftCalendar }
  const rightState = { ...props, calendar: rightCalendar }

  const leftProps = {
    handlePrev,
    handleNext: () => {},
    handleSelected: handlePrev,
    showNext: false,
    showPrev: true,
    ...leftState,
  }
  const rightProps = {
    showPrev: false,
    showNext: true,
    handlePrev: () => {},
    handleNext,
    handleSelected: handleNext,
    ...rightState,
  }
  const { children } = props
  const className = classNames({
    // [`opens${opens}`]: true,
    'daterangepicker show-calendar row px-2 pt-2': true,
  })
  return (
    <div
      className={className}
      style={{
        left: 'auto',
        display: 'flex',
      }}
    >
      <div key={0}>
        <div className="calendar-table pr-2">
          <Table className="table-condensed">
            <CalendarHead {...leftProps} />
            <CalendarBody {...leftProps} />
          </Table>
        </div>
      </div>
      <div key={1}>
        <div className="calendar-table pl-2">
          <Table className="table-condensed">
            <CalendarHead {...rightProps} />
            <CalendarBody {...rightProps} />
          </Table>
        </div>
      </div>
      {children}
    </div>
  )
}
