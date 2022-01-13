import React, { useState, useEffect, memo } from 'react'
import { deductDateRangeFromType } from 'helpers/date';
import { getDashboardFilter } from '../../api/filter';
import { getDashboardWidgets } from '../../api/dashboard';
import Customizer from './Customizer';

const Dashboard = memo((props) => {

  const [widgets, setWidgets] = useState([])
  const [layouts, setLayouts] = useState({})
  const [filters, setFilters] = useState([])

  const dashboardId = '615dac10b0e71057228737f0'// props.title

  const fetchWidgets = () => {
    getDashboardWidgets(dashboardId).then((dashboardWidgets) => {
      const { layouts = {}, widgets = [], appearance, share, owner } = dashboardWidgets
      const widgetsObject = {}
      widgets.forEach((widget) => {
        // add only valid widget
        if (widget && widget._id && widget.status === 'publish') {
          if (widget?.stWidget?.config && typeof widget.stWidget.config !== 'object') {
            widget.config = JSON.parse(widget?.stWidget.config || widget.config)
          }
          widgetsObject[widget._id] = {
            widget,
          }
        }
      })

      setWidgets(widgetsObject)
      setLayouts(layouts)
    }
    )

    // props.setDashboardData({
    //   id: dashboardId,
    //   widgets: widgetsObject,
    //   readOnly: true,
    //   appearance,
    //   share,
    //   owner
    // })
  }

  const fetchFilters = () => {
    getDashboardFilter(dashboardId).then((dashboardFilters) => {
      const filters = (dashboardFilters.data || []).map((filter) => {
        if (filter.type == 'datePickerAvance' && filter.configuration?.dateRangeType != 'CUSTOM_RANGE') {
          const { startDate, endDate } = deductDateRangeFromType(filter.configuration.dateRangeType)
          filter.configuration.startDateRange = startDate
          filter.configuration.endDateRange = endDate
        }
        return filter
      })
      setFilters(filters)
    })
  }

  useEffect(() => {
    fetchWidgets()
    fetchFilters()
  },
    [])

  return (
    <div className="container-fluid no-breadcrumbs page-dashboard">
      <Customizer
        {...props}
        dashboardID={dashboardId}
        widgets={widgets}
        layouts={layouts}
        filters={filters}
      />
    </div>
  )
})

// const mapActionToProps = {
//   setDashboardData: setDashboardData
// }

export default Dashboard
