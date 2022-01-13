import React, { useState, useCallback, useEffect } from 'react';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Modal,
} from 'reactstrap'
import 'bootstrap-daterangepicker/daterangepicker.css';

import * as dayjs from 'dayjs'
import { LinkedCalendarUI } from '../Calendar'
import { saveSelectedDateRange } from './DatePicker.actions'
import { notificationService, mapParams } from '../../../services/NotificationService';

const selector = ({ datePicker }) => {
  const { dateRange } = datePicker
  return {
    dateRange,
  }
}

const ranges = [
  {
    name: 'Today',
    value: { start: dayjs().toDate(), end: dayjs().toDate() },
  },
  {
    name: 'Yesterday',
    value: {
      start: dayjs().subtract(1, 'days').toDate(),
      end: dayjs().subtract(1, 'days').toDate(),
    },
  },
  {
    name: 'Last 7 Days',
    value: {
      start: dayjs().subtract(6, 'days').toDate(),
      end: dayjs().toDate(),
    },
  },
  {
    name: 'Last 30 Days',
    value: {
      start: dayjs().subtract(29, 'days').toDate(),
      end: dayjs().toDate(),
    },
  },
  {
    name: 'This Month',
    value: {
      start: dayjs().startOf('month').toDate(),
      end: dayjs().endOf('month').toDate(),
    },
  },
  {
    name: 'Last Month',
    value: {
      start: dayjs().subtract(1, 'month').startOf('month').toDate(),
      end: dayjs().subtract(1, 'month').endOf('month').toDate(),
    },
  },
]

let notification = { appParamsValue: {} }

function DatePicker(props) {
  const { tag, onSendNotification } = props
  const dispatch = {}//useDispatch()
  const [selectedDropdownItem, setSelectedDropdownItem] = useState()
  const { dateRange } = {}// useSelector(selector, shallowEqual)
  const [modalBasic, setModalBasic] = useState(false)

  const { start, end } = dateRange

  useEffect(() => {
    let startDate = tag.configuration.startDateRange !== null ? new Date(tag.configuration.startDateRange) : dayjs().startOf('month').toDate()
    let endDate = tag.configuration.endDateRange !== null ? new Date(tag.configuration.endDateRange) : dayjs().endOf('month').toDate()
    dateRange.start = startDate
    dateRange.end = endDate
    dispatch(
      saveSelectedDateRange({
        start: startDate,
        end: endDate,
      })
    );
    handleDateNotification()

    notificationService.getNotification().subscribe(widgetNotification => {
      handleDateNotification()
      notification = widgetNotification
    })

  }, [])

  const handleDateNotification = () => {
    const { appParam } = tag?.configuration
    if (appParam?.length == 2 && mapParams.hasOwnProperty(appParam[0]?.value) && mapParams.hasOwnProperty(appParam[1]?.value)) {
      const startDate = Date.parse(mapParams[appParam[0].value].split('-').reverse().join('/'))
      const endDate = Date.parse(mapParams[appParam[1].value].split('-').reverse().join('/'))
      dateRange.start = startDate
      dateRange.end = endDate

      dispatch(
        saveSelectedDateRange({
          start: startDate,
          end: endDate,
        })
      );
    }
  }

  const dispatchDateFilterNotification = (notification, startDate, endDate, filter) => {
    notification.appParamsValue[filter?.configuration?.appParam && filter.configuration.appParam[0] && filter.configuration.appParam[0].value] = (dayjs(startDate).format('DD-MM-YYYY'))
    notification.appParamsValue[filter?.configuration?.appParam && filter.configuration.appParam[1] && filter.configuration.appParam[1].value] = (dayjs(endDate).format('DD-MM-YYYY'))
    notificationService.sendNotification(notification);
    onSendNotification(notification)
  }

  const handleClick = ({ value, name }) => {
    const { start, end } = value
    setSelectedDropdownItem(name);
    dispatch(
      saveSelectedDateRange({
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      })
    );
    dispatchDateFilterNotification(notification, start, end, tag);
  }

  const onDatesChange = useCallback(({ startDate, endDate }) => {
    dispatch(
      saveSelectedDateRange({
        start: new Date(startDate).toISOString(),
        end: new Date(endDate).toISOString(),
      }),
    );
    toggleModal();
    dispatchDateFilterNotification(notification, startDate, endDate, tag);

  })

  const toggleModal = () => {
    setModalBasic((mode) => !mode)
  }

  const onCustomRangeDropDownClick = () => {
    toggleModal()
    setSelectedDropdownItem('custom-range');
  }

  const startLabel = dayjs(start).format('MMM DD YYYY') //HH:mm
  const endLabel = dayjs(end).format('MMM DD YYYY') //HH:mm

  return (

    <>
      <UncontrolledDropdown>
        <DropdownToggle caret tag="span" size="xs">
          <i className="simple-icon-calendar mr-2 " />
          {startLabel === endLabel ? startLabel : <>
            {startLabel}
            <i className="iconsminds-right ml-1 mr-1" />
            {endLabel}
          </>}
        </DropdownToggle>
        <DropdownMenu>
          {ranges.map((elt) => {
            return (
              <DropdownItem
                key={elt.name}
                onClick={() => {
                  handleClick(elt)
                }}
                active={elt.name === selectedDropdownItem}
              >
                {elt.name}
              </DropdownItem>
            )
          })}
          <DropdownItem
            key="custom-range"
            onClick={onCustomRangeDropDownClick}
            active={selectedDropdownItem === 'custom-range'}
          >
            Custom Range
          </DropdownItem>
          <Modal isOpen={modalBasic}>
            <LinkedCalendarUI
              onDatesChange={onDatesChange}
              onCancel={toggleModal}
            />
          </Modal>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default DatePicker
