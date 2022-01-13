import { SAVE_SELECTED_DATERANGE } from './DatePicker.constants'

export function saveSelectedDateRange(dateRange) {
  return {
    type: SAVE_SELECTED_DATERANGE,
    dateRange,
  }
}
