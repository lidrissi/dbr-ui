import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader } from 'reactstrap'
import WidgetErrorBoundary from 'errorBoundaries/WidgetErrorBoundary'
import './widgetWrapper.scss'
import { fetchDatasourceQuery } from 'services/datasource/datasourceManager'
import WidgetActionsMenu from './Actions/WidgetActionsMenu'
import { isSystemWidget } from 'constants/widget'
import NoDataFound from './NoDataFound'
import { mapParams } from '../../services/NotificationService'

const WidgetWrapper = memo((props) => {
  const [Widget, setWidget] = useState({})
  const [widgetData, setWidgetData] = useState([])
  const [mode, setMode] = useState()

  const exportChart = React.useRef(null)
  const initChart = React.useRef(null)


  useEffect(() => {
    loadWidget()
  }, [])

  useEffect(() => {
    if (initChart?.current) {
      initChart.current()
    }
  }, [props.appearance?.widgetBackground, props.appearance?.seriesColors])

  useEffect(() => {
    fetchWidgetData(mapParams)
  }, [props.widget.mappingParams, props.widget.mappingResponseParams])


  const fetchWidgetData = async (paramsValue = []) => {
    if (!props.widget.datasource || (!props.widget.datasource.query && props.widget.datasource.type != 'csv_file')) {
      return
    }
    const datasource = { ...props.widget.datasource };
    if (datasource.query) {
      datasource.query.paramsValue = paramsValue
    }
    const result = await fetchDatasourceQuery(datasource)
    if (!result || result.length == 0 || result.status == 'error') {
      setWidgetData([])
      setMode("NoDataFound")
    } else {
      setWidgetData(result)
      setMode("DataFound")
    }
  }

  const handleWidgetNotification = (paramsValue = []) => {
    if (props.widget.datasource) {
      const { datasource: { query } } = props.widget
      if (!query?.urlParams?.length > 0) {
        return
      }
    }

    fetchWidgetData(paramsValue)
  }

  const loadWidget = () => {
    const { widget } = props
    const loadedWidget = lazy(() => {
      try {
        const systemWidget = isSystemWidget(widget.stWidget.type)
        return import(
          `./${systemWidget ? widget.stWidget.type : 'GenericWidget'}`
        )
      } catch (error) {
        return error
      }
    })
    setWidget(loadedWidget)
  }

  const { widget, widgetKey, hideTitle } = props

  return (

    <div className="widget h-100">
      {Widget && Object.keys(Widget).length !== 0 && (
        <Card style={{ height: '100%' }} className="widget-card">
          {!hideTitle && widget.name && (
            <CardHeader className="py-1 px-3 widget-header">
              <div className="d-flex flex flex-md-row align-items-center">
                <p className="ml-2 mb-0 py-2 w-100 w-xs-100 text-sxlarge">
                  {widget.name}
                </p>
                <WidgetActionsMenu
                  widget={widget}
                  onExport={isSystemWidget(widget.stWidget.type) ? null : exportChart.current}
                />
              </div>
              <div className="separator" />
            </CardHeader>
          )}

          <CardBody className="p-0 position-relative h-100 overflow-auto" >
            <WidgetErrorBoundary>
              <Suspense fallback={<div className="loading" />}>
                <Widget
                  {...props}
                  widget={{
                    ...widget.stWidget,
                    ...widget,
                    data: widgetData,
                  }}
                  widgetKey={widgetKey}
                  onReceiveNotification={handleWidgetNotification}
                  filters={props.filters}
                  exportChart={exportChart}
                  initChart={initChart}
                />
                {mode === 'NoDataFound' &&
                  <NoDataFound />
                }
              </Suspense>
            </WidgetErrorBoundary>
          </CardBody>
        </Card>
      )}
    </div>
  )
})

WidgetWrapper.propTypes = {
  widget: PropTypes.shape({
    folder: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  widgetKey: PropTypes.string,
}



export default WidgetWrapper
