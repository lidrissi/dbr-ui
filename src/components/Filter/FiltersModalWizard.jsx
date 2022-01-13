import React, { useState, useEffect, memo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Badge, Spinner, Alert, ModalFooter } from 'reactstrap';
import Select, { components } from "react-select";
import { useAddFilterToDashboard, useGetFiltersType, useUpdateFilterOnDashboard } from 'hooks/api/filter';
import { useGetDataSources } from "hooks/api/dataSource/dataSource";
import { fetchDatasourceQuery } from "services/datasource/datasourceManager";
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import { useParams } from "react-router";
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx } from '../../common/CustomBootstrap'
import { useAddApplicationParam, useApplicationParams } from 'hooks/api/applicationParam';
import { LinkedCalendarUI } from 'components/Calendar';
import { dateRangeTypeOptions, deductDateRangeFromType, formatDate } from 'helpers/date';
import { noQueryDatasource } from 'constants/datasource';
import JsonInput from './JsonInput';
import 'bootstrap-daterangepicker/daterangepicker.css';

const FiltersModalWizard = memo((props) => {
  const {
    status,
    className,
    toggle,
    filter
  } = props;

  function createOption(value) {
    return {
      value,
      label: value,
      key: value
    };
  }

  const [startDate, setStartDate] = useState(filter?.configuration?.startDate || null);
  const [startDateRange, setStartDateRange] = useState(filter?.configuration?.startDateRange || null);
  const [endDateRange, setEndDateRange] = useState(filter?.configuration?.endDateRange || null);
  const [applicationParamsList, setApplicationParams] = useState([])
  const [filterName, setFilterName] = useState(filter?.name || '')
  const [filterType, setFilterType] = useState(filter?.type || '');
  const [filterTypeOptions, setFilterTypeOptions] = useState(null);
  const [inputText, setInputText] = useState(filter?.configuration?.inputText || '');
  const [serviceParam, setServiceParam] = useState(filter?.configuration?.serviceParam || '');
  const [appParam, setAppParam] = useState(filter?.configuration?.appParam || [{ label: '', value: '' }])
  const [options, setOptions] = useState(filter?.configuration?.options || [])
  const [jsonForOptions, setJsonForOptions] = useState(filter?.configuration?.inputText || '')
  const [filterSelectOptions, setFilterSelectOptions] = useState('')
  const [showOptionPreview, setShowOptionPreview] = useState(false)
  const [startDateAppParam, setStartDateAppParam] = useState(filter?.configuration?.appParam?.length > 0 ? filter?.configuration?.appParam[0] : null)
  const [dateRangeType, setDateRangeType] = useState(filter?.configuration?.dateRangeType || null)
  const [endDateAppParam, setEndDateAppParam] = useState(filter?.configuration?.appParam?.length > 1 ? filter?.configuration?.appParam[1] : null)
  const [datasources, setDatasources] = useState([])
  const [dataSource, setDataSource] = useState(filter?.configuration?.dataSource || null)
  const [dataSourceOptions, setDataSourceOptions] = useState([])
  const addApplicationParam = useAddApplicationParam()
  const dataSources = useGetDataSources();
  const [queryOptions, setQueryOptions] = useState([])
  const [loadingOptions, setLoadingOptions] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)
  const [showCustomRangeModal, setShowCustomRangeModal] = useState(false)

  const { title } = useParams();
  const applicationParams = useApplicationParams();

  useEffect(() => {
    if (filter?.configuration?.dataSource) {
      fetchFilterQuery(filter.configuration.dataSource)
    }

  }, [])

  useEffect(() => {
    const { data } = dataSources
    if (data) {
      const output = (Array.isArray(data) ? data : []).map(datasource => {
        return {
          label:
            <>
              <Badge color="secondary" className="mr-2">{datasource.type}</Badge>
              {datasource.name}
            </>,
          value: datasource._id,
          data: datasource
        }
      })
      setDataSourceOptions(output)
      setDatasources(data)
    }
  }, [dataSources.data])

  useEffect(() => {
    const output = applicationParams.data ? applicationParams.data.map(item => { return { label: item.name, value: item.name } }) : [];
    setApplicationParams(output)
  }, [applicationParams.data && applicationParams.data.length > 0 && JSON.stringify(applicationParams.data)])

  const filterNameHandleChange = (e) => {
    setFilterName(e.target.value)
  }

  const filterTypeHandleChange = (e) => {
    clearData();
    setFilterType(e.value)
  }

  const saveNewAppParams = async (appParam) => {
    await addApplicationParam.mutateAsync({ name: appParam.value, code: appParam.value })
  }

  const isValidFilterObject = () => {
    if (!filterObject.type || !filterObject.configuration) {
      return false
    }
    let isValid = false
    const config = filterObject.configuration
    switch (filterObject.type) {
      case 'inputText':
        isValid = config.inputText?.length > 0 && config.appParam?.value?.length > 0
        break;
      case 'datePickerAvance':
        isValid = config.startDateRange && config.endDateRange && startDateAppParam && endDateAppParam
        break;
      case 'listeDeroulanteJson':
        isValid = config.options?.length > 0
        break;
      case 'listeDeroulanteDataSource':
        isValid = (config.dataSource && (config.dataSource.query || noQueryDatasource(config.dataSource.type))) && config.serviceParam?.length > 0
        break;
    }

    return isValid
  }

  const submit = () => {
    const isValid = isValidFilterObject()
    setShowValidationError(!isValid)
    if (!isValid) {
      return
    }
    filterObject.dashboardId = title
    if (filterObject.type === "datePickerAvance") {
      filterObject.configuration.appParam = [startDateAppParam, endDateAppParam]
      filterObject.configuration.appParam.forEach(element => {
        if (element?.__isNew__ && element.__isNew__ === true) {
          saveNewAppParams(element)
        }
      });
    }

    if (filterObject && filterObject.configuration
      && filterObject.configuration.appParam
      && filterObject.configuration.appParam.__isNew__
      && filterObject.configuration.appParam.__isNew__ === true) {
      saveNewAppParams(filterObject.configuration.appParam)
    }
    if (filter?._id) {
      filterObject._id = filter._id
    }
    const doAction = (filter?._id) ? updateFilter : addFilter
    doAction.mutateAsync(filterObject).then(() => {
      toggle()
      clearData();
    })
  }

  const cancel = () => {
    clearData();
    toggle()
  }

  const parseJsonText = (text) => {
    setJsonForOptions(text)
    try {
      const obj = JSON.parse(text)
      if (obj?.length > 0) {
        setOptions(obj);
      }
    } catch (error) {
      console.error('error parsing text');
    }
  }

  const handleInputTextChange = (e) => {
    setInputText(e.target.value)
  }

  const handleChangeAppParams = (newValue, actionMeta) => {
    if (actionMeta.action == "create-option") {
      setApplicationParams(applicationParamsList.slice().concat(createOption(newValue.value)))
    }
    setAppParam(newValue)
  };

  const handleChangeServiceParam = ({ value }) => {
    let dt;
    try {
      dt = JSON.parse(jsonForOptions);
    } catch (e) {
      dt = jsonForOptions
    }
    setServiceParam(value)
    const values = Object.keys(dt).map(k => dt[k][value])
    setFilterSelectOptions(values);
    setShowOptionPreview(true)
  }

  const { data } = useGetFiltersType()

  useEffect(() => {
    const options = data && data.map((option) => {
      return { value: option.code, label: option.name }
    })
    setFilterTypeOptions(options)
  }, [data && data.length > 0 && JSON.stringify(data)])

  const addFilter = useAddFilterToDashboard();
  const updateFilter = useUpdateFilterOnDashboard()

  const onDatasourceChange = (sourceData) => {
    setQueryOptions([])
    setDataSource(sourceData)
    if (sourceData?.queries?.length >= 0) {
      const { queries } = sourceData
      const options = queries.map(query => ({
        label: query.name,
        value: query.value,
        data: query
      })
      )
      setQueryOptions(options)
    }
  };

  const handleDataSourceChange = async (datasource) => {
    setServiceParam('')
    setOptions([])
    setAppParam([{ label: '', value: '' }])
    onDatasourceChange(datasource)
    if (noQueryDatasource(datasource.type)) {
      fetchFilterQuery(datasource)
    }
  }

  const fetchFilterQuery = async (newDatasource) => {
    onDatasourceChange(newDatasource)
    setLoadingOptions(true)
    const result = await fetchDatasourceQuery(newDatasource)
    if (result?.length > 0) {
      setOptions(result);
      setJsonForOptions(result)
    }
    setLoadingOptions(false)
  }

  const handleQueryChange = (query) => {
    setServiceParam('')
    setAppParam([{ label: '', value: '' }])
    fetchFilterQuery({ ...dataSource, query })
  }

  const clearData = () => {
    setStartDate(null)
    setStartDateRange(null)
    setEndDateRange(null)
    setInputText(null)
    setServiceParam(null)
    setAppParam([{ label: '', value: '' }])
    setShowOptionPreview(false)
    setFilterSelectOptions('')
    setFilterType(null)
    setDataSource(null)
    setOptions([])
  }

  const getResponseOptions = () => {
    const responseKeys = Object.keys(options?.length > 0 ? options[0] : {})
    return (responseKeys || []).map(option => ({ label: option, value: option }))
  }

  const handleAppParamChange = (key, value, index) => {
    const newAppParam = [...appParam]
    if (newAppParam.length > index) {
      newAppParam[index][key] = value
    }
    setAppParam(newAppParam)
  }

  const addAppParam = () => {
    setAppParam([...appParam, { label: '', value: '' }])
  }

  const removeAppParam = (index) => {
    setAppParam(appParam.filter((_, currentIndex) => currentIndex != index))
  }

  const handleDateRangeTypeChange = (type) => {
    setDateRangeType(type)
    if (type == 'CUSTOM_RANGE') {
      setShowCustomRangeModal(true)
    } else {
      const { startDate, endDate } = deductDateRangeFromType(type)
      setStartDateRange(startDate)
      setEndDateRange(endDate)
    }
  }

  const onDateRangeChange = ({ startDate, endDate }) => {
    setStartDateRange(startDate)
    setEndDateRange(endDate)
    setShowCustomRangeModal(false)
  }

  const hideCustomRangeModal = () => {
    if (dateRangeType == 'CUSTOM_RANGE' && (startDateRange === null || endDateRange == null)) {
      setDateRangeType(null)
    }
    setShowCustomRangeModal(false)
  }

  const SingleDateRangeType = props => (
    <components.SingleValue {...props}>
      {props.data.label}
      {
        (dateRangeType == 'CUSTOM_RANGE' && startDateRange && endDateRange) ?
          `: ${formatDate(startDateRange)} - ${formatDate(endDateRange)}`
          :
          ''
      }
    </components.SingleValue>
  );

  const renderAppParams = () => {
    if (loadingOptions) {
      return (
        <div className="d-flex justify-content-center mt-2">
          <Spinner color="primary" />
        </div>
      )
    }
    if (!options || options.length == 0) {
      return null
    }
    return (
      <>
        <Row className="mx-0">
          <Colxx xxs="12" className="pr-0 pl-0">
            <FormGroup>
              <Label>Label  </Label>
              <Select
                onChange={handleChangeServiceParam}
                value={{ label: serviceParam, value: serviceParam }}
                options={getResponseOptions()}
              />
            </FormGroup>
          </Colxx>
        </Row>
        {showOptionPreview && (
          <Row className="mx-0">
            <Colxx xxs="12" md="12" className="mb-2 pl-0 pr-0">
              <FormGroup>
                <Label>
                  Options preview
                </Label>
                <Input
                  value={filterSelectOptions}
                  type="text"
                  readOnly
                />
              </FormGroup>
            </Colxx>
          </Row>
        )}

        <Row className="mx-0">
          <Colxx xxs="12" md="6" className="pl-0">
            <label>
              Response vs app params
            </label>
          </Colxx>
        </Row>
        {(appParam || []).map((param, index) => (
          <Row key={index} className="mx-0 mb-2">
            <Colxx xxs="12" md="5" className="pl-0 pr-0">
              <Select
                isClearable
                placeholder={'response param'}
                onChange={({ value }) => handleAppParamChange('label', value, index)}
                value={param.label ? { label: param.label, value: param.label } : null}
                options={getResponseOptions()}
              />
            </Colxx>
            <Colxx xxs="12" md="1" className="pl-0 pr-0 center-item-content justify-content-around">
              <i className="iconsminds-repeat"></i>
            </Colxx>
            <Colxx xxs="12" md="5" className="pl-0 pr-0">
              <CreatableSelect
                isClearable
                placeholder={'app param'}
                onChange={({ value }) => handleAppParamChange('value', value, index)}
                value={param.value ? { label: param.value, value: param.value } : null}
                options={applicationParamsList}
              />
            </Colxx>
            <Colxx xxs="12" md="1" className="control-icons pl-0 pr-0 center-item-content justify-content-end">
              {
                appParam?.length != 1 &&
                <span className="text-danger" onClick={() => removeAppParam(index)}>-</span>
              }
              {
                index == appParam?.length - 1 &&
                <span className="text-primary ml-2" onClick={addAppParam}>+</span>
              }
            </Colxx>
          </Row>
        )
        )
        }
      </>
    )
  }

  const filterObject = {
    name: filterName,
    type: filterType,
    configuration: {
      inputText: filterType == 'listeDeroulanteJson' ? jsonForOptions : inputText,
      startDate,
      startDateRange,
      endDateRange,
      serviceParam,
      appParam,
      options: filterType == 'listeDeroulanteJson' ? options : [],
      dataSource,
      dateRangeType
    },
  }

  return (
    <Modal isOpen={status} toggle={cancel} className={className} size="lg">
      <ModalHeader className="p-3" toggle={cancel}>Filtres </ModalHeader>
      <ModalBody>
        <Row className="px-5">
          <Colxx xxs="12">
            {
              showValidationError && <Alert color="danger">
                Fill in a valid value for all required fields
              </Alert>
            }
            <Form>
              <FormGroup>
                <Label>
                  Filter Name
                </Label>
                <Input
                  onChange={filterNameHandleChange}
                  value={filterName}
                  type="text"
                  name="widgetName"
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="type"> Type </Label>
                <Select
                  onChange={filterTypeHandleChange}
                  options={filterTypeOptions}
                  value={filterTypeOptions && filterTypeOptions.find(obj => obj.value === filterType)} // set selected value
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  placeholder="Sélectionner un paramètre"
                />

              </FormGroup>
              {filterType === "inputText" ? (
                <>
                  <FormGroup>
                    <Label for="type"> Default Value  </Label>
                    <Input
                      type="text"
                      name="inputtext"
                      value={inputText}
                      onChange={handleInputTextChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="type"> App Param  </Label>
                    <CreatableSelect
                      isClearable
                      onChange={handleChangeAppParams}
                      options={applicationParamsList}
                      value={appParam ? appParam : null}
                    />
                  </FormGroup>
                </>
              )
                : filterType === "datePickerSimple" ? (
                  <>
                    <FormGroup>
                      <Label for="type"> DatePicker Simple </Label>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={setStartDate}
                        placeholderText="DatePicker Simple"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="type"> App Params  </Label>
                      <Select
                        name="select-date-one"
                        onChange={handleChangeAppParams}
                        options={applicationParamsList}
                      />
                    </FormGroup>
                  </>
                ) :
                  filterType === "datePickerAvance" ? (
                    <>
                      <FormGroup>
                        <Label for="type"> Date range </Label>
                        <Select
                          onChange={({ value }) => handleDateRangeTypeChange(value)}
                          options={dateRangeTypeOptions}
                          value={dateRangeTypeOptions.filter(({ value }) => dateRangeType === value)}
                          components={{ SingleValue: SingleDateRangeType }}
                        />

                        <Modal isOpen={showCustomRangeModal}>
                          <LinkedCalendarUI
                            onDatesChange={onDateRangeChange}
                            onCancel={hideCustomRangeModal}
                          />
                        </Modal>
                      </FormGroup>
                      <FormGroup>
                        <Row className="mx-0">
                          <Colxx xxs="12" md="6" className="pl-0">
                            <FormGroup>
                              <Label for="type"> Start date param  </Label>
                              <CreatableSelect
                                isClearable
                                name="select-date-one"
                                onChange={(setStartDateAppParam)}
                                value={startDateAppParam}
                                options={applicationParamsList}
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" md="6" className="pr-0">
                            <FormGroup>
                              <Label for="type">End date param   </Label>
                              <CreatableSelect
                                isClearable
                                name="select-date-one"
                                onChange={setEndDateAppParam}
                                value={endDateAppParam}
                                options={applicationParamsList}
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </FormGroup>
                    </>
                  )
                    : filterType === "listeDeroulanteJson" ? (
                      <>
                        <FormGroup>
                          <Label for="type"> Liste Déroulante (json)  </Label>
                          <JsonInput
                            value={jsonForOptions}
                            height={150}
                            onChange={parseJsonText}
                          />
                        </FormGroup>
                        {renderAppParams()}
                      </>
                    )
                      : filterType === "listeDeroulanteDataSource" ? (
                        <>
                          <Row className="mx-0">
                            <Colxx xxs="12" md={(!dataSource || noQueryDatasource(dataSource.type)) ? "12" : "6"} className="pl-0">
                              <FormGroup>
                                <Label for="type"> Data source  </Label>
                                <Select
                                  value={dataSourceOptions.find(({ value }) => value === dataSource?._id)}
                                  onChange={({ data }) => handleDataSourceChange({ ...data, query: null })}
                                  options={dataSourceOptions}
                                />
                              </FormGroup>
                            </Colxx>
                            {(dataSource && !noQueryDatasource(dataSource.type)) && <Colxx xxs="12" md="6" className="pr-0">
                              <FormGroup>
                                <Label for="type">Query  </Label>
                                <Select
                                  value={queryOptions.find(({ value }) => value === dataSource?.query?.value) || ''}
                                  onChange={({ data }) => handleQueryChange(data)}
                                  options={queryOptions}
                                />
                              </FormGroup>
                            </Colxx>}
                          </Row>
                          {renderAppParams()}
                        </>
                      ) :
                        ''
              }
            </Form>
          </Colxx>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          size="lg"
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={submit}
          size="lg"
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
})

export default FiltersModalWizard;