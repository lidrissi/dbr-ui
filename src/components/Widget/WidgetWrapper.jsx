import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader } from 'reactstrap'
import Map from "./Map";
import Tree from "./Tree";
import DataGrid from "./DataGrid";
import Image from "./Image";
import Text from "./Text";
import GenericWidget from "./GenericWidget";

import WidgetErrorBoundary from 'errorBoundaries/WidgetErrorBoundary'
import './widgetWrapper.scss'
import { fetchDatasourceQuery } from 'services/datasource/datasourceManager'
import WidgetActionsMenu from './Actions/WidgetActionsMenu'
import { isSystemWidget } from 'constants/widget'
import NoDataFound from './NoDataFound'
import { mapParams } from '../../services/NotificationService'

export const WidgetWrapper = (props) => {
  const [Widget, setWidget] = useState({})
  const [widgetData, setWidgetData] = useState([])
  const [mode, setMode] = useState()

  const exportChart = React.useRef(null)
  const initChart = React.useRef(null)

  useEffect(() => {
    if (initChart?.current) {
      initChart.current()
    }
  }, [props.appearance?.widgetBackground, props.appearance?.seriesColors])

  useEffect(() => {
    fetchWidgetData(mapParams)
  }, [props.widget.mappingParams, props.widget.mappingResponseParams])

  useEffect(() => {
    if(props.env){
      window.dbr_env = props.env
    }
  }, [props.env])

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
     if (!widget.stWidget) {
      return
    }
    const properties = {
          widget:{
                    ...widget.stWidget,
                    ...widget,
                    data: widgetData,
                  },
          onReceiveNotification:handleWidgetNotification,
          exportChart,
          initChart
    }
   
    switch (widget.stWidget.type) {
      case 'Tree':
        return <Tree {...properties} />
      case 'DataGrid':
        return <DataGrid {...properties}/>
      case 'Map':
        return <Map {...properties}/>
      case 'Image':
        return <Image {...properties}/>
      case 'Text':
        return <Text {...properties}/>
      default:
        return <GenericWidget {...properties}/>
    }
    return null
  }

  const { widget, showTitle } = props


  if (!widget) {
    return null
  }

  return (
    <div className="widget h-100">
        <Card style={{ height: '100%' }} className="widget-card">
          {showTitle && widget.name && (
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
                {loadWidget()}
                {mode === 'NoDataFound' &&
                  <NoDataFound />
                }
              </Suspense>
            </WidgetErrorBoundary>
          </CardBody>
        </Card>
    </div>
  )
}

WidgetWrapper.propTypes = {
  widget: PropTypes.shape({
    name: PropTypes.string,
    stWidget: PropTypes.object,
  }),
  showTitle: PropTypes.bool,
  env: PropTypes.oneOf(['local', 'demo', 'sandbox']),
}
