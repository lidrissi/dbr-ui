import React from 'react'
import PickerUI from './PickerUI'
import LinkedCalendar from './LinkedCalendar'

export default React.memo(function LinkedCalendarUI(props) {
  const uiProps = { ...props, component: LinkedCalendar }
  return <PickerUI {...uiProps} />
})
