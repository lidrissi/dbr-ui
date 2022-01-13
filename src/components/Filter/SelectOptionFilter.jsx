import { noQueryDatasource } from "constants/datasource";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { fetchDatasourceQuery } from "services/datasource/datasourceManager";
import { mapParams, notificationService } from '../../../widgets/GenericWidget/NotificationService';

const SelectOptionFilter = forwardRef((props, ref) => {

  const { tag, onSendNotification } = props

  let subscription
  let notification = { appParamsValue: {} }

  const [isOpenSizingLg, setIsOpenSizingLg] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ALL');
  const [options, setOptions] = useState(tag.configuration.options || [])
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      resetSelection
    }
  });

  const fetchFilter = async (paramsValue = {}) => {
    const datasource = { ...tag.configuration.dataSource };
    if (!datasource.query && !noQueryDatasource(datasource.type)) {
      return
    }
    setLoading(true)
    if (datasource.query) {
      datasource.query.paramsValue = paramsValue
    }
    const result = await fetchDatasourceQuery(datasource)
    const dt = result;
    const values = Object.keys(dt).map(k => dt[k]).filter(option => option != null)
    setOptions(values)
    tag.configuration.options = values
    setLoading(false)
  }

  useEffect(() => {
    subscription = notificationService.getNotification().subscribe(widgetNotification => {
      changeCurrentSelection(widgetNotification.appParamsValue)
      if (tag?.configuration?.dataSource?.query?.urlParams?.length > 0) {
        const urlParams = tag.configuration.dataSource.query.urlParams
        const oldValues = urlParams.map(key => notification.appParamsValue[key] || '')
        const newValues = urlParams.map(key => widgetNotification.appParamsValue[key] || '')
        if (JSON.stringify(oldValues) != JSON.stringify(newValues)) {
          fetchFilter(widgetNotification.appParamsValue)
        }
      } else {
        setLoading(false)
        setOptions(tag.configuration.options)
      }
      notification = { ...widgetNotification, appParamsValue: { ...widgetNotification.appParamsValue } }
    })
    return () => {
      subscription.unsubscribe();
    }
  }, [])


  useEffect(() => {
    fetchFilter(notification)
    changeCurrentSelection(mapParams)
  }, [tag.configuration?.dataSource?.query?._id])

  const changeCurrentSelection = (appParamsValue) => {
    if (tag.configuration.appParam?.length == 0 || Object.keys(appParamsValue)?.length == 0) {
      return
    }
    Object.keys(appParamsValue).forEach((key) => {
      const tagAppParam = tag.configuration.appParam.find(({ value }) => key == value)
      if (!tagAppParam) {
        return
      }
      const selectedOption = tag.configuration.options.find(option => option[tagAppParam.label] == appParamsValue[key])
      if (selectedOption) {
        setSelectedOption(selectedOption[tag.configuration.serviceParam] || Object.values(selectedOption)[0])
      }
    })
  }

  const selectOption = (option) => {
    setSelectedOption(option[tag.configuration.serviceParam] || Object.values(option)[0])
    dispatchFilterNotification(option)
  }

  const dispatchFilterNotification = (option) => {
    if (!tag?.configuration?.appParam) {
      return
    }
    const appParamsValue = [];
    (tag.configuration.appParam || []).forEach(({ label, value }) => {
      appParamsValue[value] = option[label] || ""
    });
    const newNotification = { appParamsValue, fromWidgetKey: "" }
    notificationService.sendNotification(newNotification);
    onSendNotification(newNotification)
  }

  const resetSelection = () => {
    setSelectedOption('ALL');
  };

  return (
    <ButtonDropdown
      isOpen={isOpenSizingLg}
      toggle={() => setIsOpenSizingLg(!isOpenSizingLg)}
    >
      <DropdownToggle tag="span" caret size="xs" className="w-100" className="d-flex align-items-center">
        <span className="truncate filter-value" title={selectedOption}>
          {selectedOption}
        </span>
      </DropdownToggle>
      <DropdownMenu>
        {loading === false ? (
          options && options.length > 0 ? <>
            <DropdownItem onClick={props.onReset}>
              ALL
            </DropdownItem>
            <DropdownItem divider className="mt-1 mb-1" />
            {
              options.map((option, index) => {
                return (
                  <DropdownItem key={index} onClick={() => selectOption(option)}>
                    {option[tag.configuration.serviceParam] || Object.values(option)[0]}
                  </DropdownItem>
                )
              })
            }</> : <DropdownItem>No options found</DropdownItem>
        ) : <DropdownItem>Loading ...</DropdownItem>
        }
      </DropdownMenu>
    </ButtonDropdown>
  )
});

export default SelectOptionFilter