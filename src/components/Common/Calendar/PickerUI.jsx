import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { dayjs } from './utils'

const calendar = dayjs()
const startOfWeek = calendar.startOf('week')
const endOfWeek = calendar.endOf('week')
const minDate = calendar.clone().subtract(5, 'year')
const maxDate = calendar.clone().add(5, 'year')
const maxSpan = { years: 5 }
const minYear = calendar.clone().subtract(70, 'year').format('YYYY')
const maxYear = calendar.clone().add(70, 'year').format('YYYY')
const showWeekNumbers = true
const showISOWeekNumbers = false
const buttonClasses = 'btn btn-sm'
const applyButtonClasses = 'btn-primary'
const cancelButtonClasses = 'btn-default'
const weekNames = []
for (let s = startOfWeek; s <= endOfWeek;) {
  weekNames.push(s.format('dd'))
  s = s.add(1, 'day')
}
// eslint-disable-next-line radix
let sY = parseInt(minYear)
// eslint-disable-next-line radix
const eY = parseInt(maxYear)
const yearNames = []
for (; sY < eY; sY++) {
  yearNames.push(sY)
}
const locale = {
  weekNames,
  weekLabel: 'W',
  yearNames,
}

const state = {
  locale,
  calendar,
  minDate,
  maxDate,
  maxSpan,
  minYear,
  maxYear,
  showWeekNumbers,
  showISOWeekNumbers,
  buttonClasses,
  applyButtonClasses,
  cancelButtonClasses,
}

function PickerUI(props) {
  PickerUI.propTypes = {
    dateRange: PropTypes.object,
    onDatesChange: PropTypes.func,
    onCancel: PropTypes.func,
    component: PropTypes.any,
  }

  const {
    dateRange: { start, end },
  } = props

  const [startDate, setStartDate] = useState(dayjs(start))
  const [endDate, setEndDate] = useState(dayjs(end))
  const [range, setRange] = useState('')
  const [closedOrOpen, setClosedOrOpen] = useState('CLOSED')

  const onDayClick = (day) => {
    const isOpen = closedOrOpen === 'OPEN'
    const startDateValue = isOpen ? startDate : day
    const endDateValue = isOpen && day >= startDate ? day : null
    const rangeValue = endDate || startDate
    const closedOrOpenValue = isOpen && day >= startDate ? 'CLOSED' : 'OPEN'
    setStartDate(startDateValue)
    setEndDate(endDateValue)
    setRange(rangeValue)
    setClosedOrOpen(closedOrOpenValue)
  }

  const onApply = () => {
    const { onDatesChange } = props
    if (onDatesChange && startDate && endDate) {
      onDatesChange({ startDate, endDate })
    }
  }

  const onCancelFunc = () => {
    const { onCancel } = props
    onCancel()
  }

  const dateLabel = () => {
    return startDate && endDate
      ? `${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`
      : ''
  }

  const componentProps = {
    onDayClick,
    startDate,
    endDate,
    range,
    closedOrOpen,
    ...props,
    ...state,
  }
  const { component: Component } = props
  return (
    <Component {...componentProps}>
      <div className="ranges" />
      <div className="drp-buttons" style={{ width: '100%' }}>
        <span className="drp-selected"><strong>{dateLabel()}</strong></span>
        <button
          className="cancelBtn btn btn-lg btn-light px-4 py-2"
          type="button"
          onClick={onCancelFunc}
        >
          Cancel
        </button>
        <button
          className="applyBtn btn btn-lg btn-primary px-4 py-2"
          type="button"
          onClick={onApply}
        >
          Apply
        </button>
      </div>
    </Component>
  )
}

export default PickerUI
