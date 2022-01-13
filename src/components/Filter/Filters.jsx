import React, { useState, useEffect, useRef, lazy, memo } from "react";
import io from 'socket.io-client'
import Alert from "components/Alert";
import { useDeleteFilterFromDashboard } from "hooks/api/filter";
import { connect } from "react-redux";
import { mapParams, notificationService } from '../../../widgets/GenericWidget/NotificationService';
import InputText from "./InputTypeText";
import './filters.scss';
import FilterActionsMenu from "./FilterActionsMenu";
import { Button } from "reactstrap";
import { BACKEND_SOCKET_API_URL } from "constants/resources";

const DatePicker = lazy(() =>
  import(/* webpackChunkName: "DatePicker" */ '../../DatePicker'),
)

const SelectOptionFilter = lazy(() =>
  import(/* webpackChunkName: "SelectOptionFilter" */ './SelectOptionFilter'),
)

const FiltersModalWizard = lazy(() =>
  import(/* webpackChunkName: "FiltersModalWizard" */ './FiltersModalWizard'),
)

const Filters = memo(({ filters, editMode, widgets }) => {
  const ref = useRef([]);
  let socket;

  const [tags, setTags] = useState(filters || [])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [selectedFilter, setSelecteFilter] = useState({})
  const deleteFilter = useDeleteFilterFromDashboard();
  const [notification, setNotification] = useState({ appParamsValue: {} })

  const removeFilterTag = (indexToRemove, filterToRemove) => {
    setShowDeleteDialog(true)
    setSelecteFilter({ item: filterToRemove, index: indexToRemove });
  };

  const sendNotification = (notification) => {
    if (!socket) {
      socket = createSocket()
    }
    const notif = { ...notification, appParamsValue: { ...notification.appParamsValue } }
    socket.emit("SEND_NOTIFICATION", {
      widgetSocketId: socket.id,
      widgetNotification: notif
    });
    setTimeout(() => {
      notificationService.sendNotification(notification);
    }, 100);
  }

  const dispatchFilterNotification = (filterValue, param) => {
    notification.appParamsValue[param] = filterValue
    sendNotification(notification)
  }

  useEffect(() => {
    ref.current = ref.current.slice(0, tags.length);
    if (!socket) {
      socket = createSocket()
    }
  }, [tags])

  useEffect(() => {
    let newFilters = [...filters]
    let widgetInputParams = Object.keys(widgets).map(key => widgets[key].widget?.datasource)
      .reduce((acc, datasource) => {
        if (datasource?.query?.urlParams?.length > 0) {
          acc = [...acc, ...datasource?.query?.urlParams]
        }
        return acc
      }, [])

    const filtersAppParams = filters.reduce((acc, { configuration: { appParam } }) => {
      acc = [
        ...acc,
        ...((Array.isArray(appParam)) ? appParam.map(({ value }) => value) : [appParam.value])
      ]
      return acc
    }, [])

    widgetInputParams = [...new Set(widgetInputParams)]
    widgetInputParams.forEach((paramName, index) => {
      if (mapParams[paramName] && filtersAppParams.indexOf(paramName) < 0) {
        newFilters.push({
          _id: `${paramName}_${index}`,
          name: paramName,
          type: 'inputText',
          configuration: {
            appParam: {
              label: paramName,
              value: paramName
            },
            inputText: mapParams[paramName]
          }
        })
      }
    });


    setTags(newFilters)
  }, [filters, Object.keys(mapParams).length])

  const createSocket = () => {
    socket = io(BACKEND_SOCKET_API_URL, {
      path: '/back/socket',
      transports: ['websocket', 'polling']
    })

    socket.on('connect', () => {
      notificationService.registerWidgetSocket(socket);
    });

    socket.on("RECEIVE_NOTIFICATION", (notification) => {
      if (notification.widgetSocketId == socket.id) {
        return
      }
      if (!notificationService.isWidgetRegistredInSocketPool(notification.widgetSocketId)) {
        notificationService.sendNotification(notification.widgetNotification);
      }
    });

    return socket
  }

  const onConfirmDelete = async () => {
    if (!selectedFilter.item.dashboardId) {
      afterDelete()
      return
    }
    deleteFilter.mutateAsync(selectedFilter.item).then(() => {
      afterDelete()
    })
  }

  const afterDelete = () => {
    setTags(tags.filter(tag => tag._id != selectedFilter.item._id))
    hideDeleteDialog()
    resetAppParams(selectedFilter.item)
    sendNotification(notification)
    setSelecteFilter({})
  }

  const editFilterTag = (tag) => {
    setShowFilterModal(true)
    setCurrentFilter(tag)
  }

  const hideFilterModal = () => {
    setShowFilterModal(false)
    setCurrentFilter(null)
  }

  const resetFilter = (filter, index) => {
    resetAppParams(filter)
    ref.current[index].resetSelection()
  }

  const resetAppParams = (filter) => {
    if (Array.isArray(filter.configuration.appParam)) {
      filter.configuration.appParam.forEach(({ value }) => {
        notification.appParamsValue[value] = ''
      });
    } else {
      notification.appParamsValue[filter.configuration.appParam?.value] = ''
    }
    sendNotification(notification)
  }

  const hideDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Alert
        showAlert={showDeleteDialog}
        title="Delete Filter"
        text="Do you want to delete the specified Filter ?"
        action={onConfirmDelete}
        allowAction
        onCancel={hideDeleteDialog}
      />
      {showFilterModal && <FiltersModalWizard toggle={hideFilterModal} status={true} filter={currentFilter} />}
      <div className="dashboard-filters flex-wrap">
        {tags && tags.map((tag, index) => (
          <div className="filter-item" key={index}>
            <div className="filter-item__title d-flex justify-content-between">
              <span>
                {tag.name || tag.configuration.appParam?.label}
              </span>
              {(tag.type == 'inputText') ? <Button close onClick={() => removeFilterTag(index, tag)} /> :
                editMode && <FilterActionsMenu
                  onDelete={() => removeFilterTag(index, tag)}
                  onEdit={() => editFilterTag(tag)}
                />}
            </div>
            <span className="filter-item__value">
              {tag.type === "datePickerAvance" ? (
                <DatePicker
                  onSendNotification={sendNotification}
                  tag={tag} />
              ) : tag.type === "inputText" ? (
                <span onClick={() => dispatchFilterNotification(tag.configuration.inputText, tag.configuration.appParam?.value)}>
                  <InputText tag={tag} />
                </span>
              ) : (tag.type === "listeDeroulanteJson" || tag.type === "listeDeroulanteDataSource") ? (
                <SelectOptionFilter
                  onSendNotification={sendNotification}
                  onReset={() => resetFilter(tag, index)}
                  tag={tag}
                  ref={el => ref.current[index] = el} />
              ) : ''
              }
            </span>
          </div>
        ))}
      </div>
    </>
  );
});

const mapStateToProps = ({ dashboard }) => ({
  widgets: dashboard.widgets,
  editMode: dashboard.editMode
})

export default connect(mapStateToProps)(Filters)