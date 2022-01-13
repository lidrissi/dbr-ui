import { SAVE_SELECTED_DATERANGE } from './DatePicker.constants'

const initialState = {
  dateRange: {
    start: new Date().setDate(0),
    end: new Date(),
  },
}

function datePickerReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SELECTED_DATERANGE:
      return { ...state, dateRange: action.dateRange }
    default:
      return state
  }
}

export default datePickerReducer
