import React, { useState, useEffect, memo } from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import {
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import { notificationService } from '../../../services/NotificationService';

const DataGrid = memo(({
  widget,
  onReceiveNotification
}) => {
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [urlParams, setUrlParams] = useState('')
  const [data, setData] = useState([])
  const [expandableRowIndex, setExpandableRowIndex] = useState(-1)

  const columns = (widget.mappingResponseParams || []).map(
    ({ responseParam, widgetParam }, index) => ({
      colIndex: index,
      name: responseParam,
      appParam: widget.mappingParams.find((param) => widgetParam == param.widgetParam)?.appParam,
    }
    ));

  let subscription;

  useEffect(() => {
    const result = widget.data || []
    setData(result)
    subscription = notificationService.getNotification().subscribe(notification => {
      handleNotification(notification)
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [widget.data])

  const handleNotification = (notification) => {
    onReceiveNotification(notification.appParamsValue || {})
    if (!notification || widget.mappingParams.length == 0) {
      return
    }

    const commonAppParams = widget.mappingParams.filter(({ appParam }) => Object.keys(notification.appParamsValue).indexOf(appParam) > -1)
    let rowIndex = -1
    if (commonAppParams?.length > 0) {
      rowIndex = widget.data.findIndex((rowData) => commonAppParams.every(({ appParam, responseParam }) => {
        return notification.appParamsValue[appParam] == rowData[responseParam]
      }
      ))
    }
    setExpandableRowIndex(rowIndex)
  }

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none"
          }
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: '#f1f2f4',
            padding: '10px'
          }
        },
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: '#f1f2f4',
          }
        },
        MUIDataTableBodyCell: {
          root: {
            padding: '6px',
            cursor: 'pointer',
          },
        },
      }
    });

  const notifyAllWidgets = (widgetNotification) => {
    notificationService.sendNotification(widgetNotification);
  }

  const handleRowClick = (_, { rowIndex }) => {
    if (widget.mappingParams.length == 0) {
      return
    }
    const rowData = data[rowIndex]
    let appParamsValue = {}
    widget.mappingParams.forEach(({ appParam, responseParam }) => {
      appParamsValue[appParam] = rowData[responseParam]
    })

    if (Object.keys(appParamsValue).length > 0) {
      setExpandableRowIndex(rowIndex)
      notifyAllWidgets({
        fromWidgetKey: widget._id,
        appParamsValue
      })
    }
  }

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyMaxHeight,
    fixedHeader: true,
    selectableRowsHideCheckboxes: true,
    onRowClick: handleRowClick,
  };

  const components = {
    ExpandButton: function (props) {
      if (props.dataIndex !== expandableRowIndex || !urlParams) return <div style={{ width: '24px' }} />;
      return <ExpandButton {...props} />;
    }
  };

  if (!widget.data || widget.data.length == 0) {
    return null
  }

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
        components={components}
      />
    </MuiThemeProvider>
  );
})

export default DataGrid