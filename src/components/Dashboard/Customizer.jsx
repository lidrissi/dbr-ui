import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { withSize } from 'react-sizeme'

import 'react-resizable/css/styles.css'
import './customizer.scss';


import { formatDate } from 'helpers/date'
import WidgetWrapper from '../Widget/WidgetWrapper'
import { mapParams } from '../../services/NotificationService'
import Filters from '../Filter/Filters'


class Customizer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      layouts: {},
      widgets: [],
      width: 1200,
      widgetList: {},
      currentWidget: {},
      showWidgetEditor: false,
    }
  }

  componentDidMount() {
    this.setAppParams(this.props.filters)
    this.setState({ widgets: this.props.widgets, layouts: this.props.layouts })
    this.mounted = true
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
    am4core.useTheme(this.am4themes_dashboard);
  }

  setAppParams = (filters = []) => {
    (filters || []).forEach(filter => {
      if (filter.type == 'datePickerAvance' && filter.configuration.appParam) {
        const params = filter.configuration.appParam
        mapParams[params[0].value] = formatDate(filter.configuration.startDateRange)
        mapParams[params[1].value] = formatDate(filter.configuration.endDateRange)
      } else if (filter.type == 'inputText' && filter.configuration?.appParam?.value) {
        mapParams[filter.configuration.appParam.value] = filter.configuration.inputText
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.widgets != prevProps.widgets || this.props.layouts != prevProps.layouts) {
      this.setState({
        widgets: this.props.widgets,
        layouts: this.props.layouts,
      })
    }
    if (this.props.appearance != prevProps.appearance) {
      am4core.useTheme(this.am4themes_dashboard);
    }
  }

  am4themes_dashboard = (target) => {
    const { appearance } = this.props
    if (target instanceof am4core.ColorSet && appearance?.seriesColors?.length > 0) {
      target.list = appearance.seriesColors.map(serieColor => am4core.color(serieColor))
    }
    if (target instanceof am4core.InterfaceColorSet) {
      if (appearance?.widgetBackground) {
        const fgColor = am4core.color(appearance?.widgetBackground).alternative
        target.setFor("background", am4core.color(appearance?.widgetBackground));
        target.setFor("text", fgColor);
        target.setFor("grid", fgColor);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    if (!this.mounted) return
    const width = window.innerWidth * 0.95
    this.setState({ width })
  }

  onLayoutChange = (_, layouts) => {
    this.setState({
      layouts,
    })
  }

  Widgets = () => {
    const { widgets } = this.state
    const height = { height: '100%' }
    return Object.keys(widgets).map((key) => (
      <div key={key}>
        <div style={height}>
          <WidgetWrapper
            {...widgets[key]}
            showTitle={['Image', 'Text'].indexOf(widgets[key].widget?.stWidget?.type) == -1}
          />
        </div>
      </div>
    ))
  }

  render() {
    const {
      cols,
      breakpoints,
      rowHeight,
      size: { width },
    } = this.props
    const { layouts } = this.state

    return (
      <>
        <Suspense fallback={<div />}>
          <Filters
            widgets={this.props.widgets}
            filters={this.props.filters}
          />
        </Suspense>
        <div className="row m-auto">
          <ResponsiveReactGridLayout
            width={width}
            layouts={layouts}
            cols={cols}
            breakpoints={breakpoints}
            onLayoutChange={this.onLayoutChange}
            isDraggable={true}
            isResizable={false}
            rowHeight={rowHeight}
          >
            {this.Widgets()}
          </ResponsiveReactGridLayout>
        </div>
      </>
    )
  }
}

Customizer.propTypes = {
  breakpoints: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
  }),
  className: PropTypes.string,
  cols: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
  }),
  lg: PropTypes.number,
  md: PropTypes.number,
  rowHeight: PropTypes.number,
  size: PropTypes.shape({
    width: PropTypes.any,
  }),
  sm: PropTypes.number,
  xs: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

Customizer.defaultProps = {
  className: 'layout',
  rowHeight: 200,
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0 }

}


export default withSize()(Customizer)
