import React, { PureComponent } from 'react';
import io from 'socket.io-client'
import { BACKEND_SOCKET_API_URL } from 'constants/resources'
// amcharts imports
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import * as am4maps from "@amcharts/amcharts4/maps";
import worldMoroccoLow from "@amcharts/amcharts4-geodata/worldMoroccoLow";
import moroccoLow from "@amcharts/amcharts4-geodata/moroccoLow";
import { mapParams, notificationService } from '../../../services/NotificationService';

am4core.useTheme(am4themes_animated);
am4core.addLicense('ch-custom-attribution')

class GenericWidget extends PureComponent {
  mappingParams = [];

  chart;
  socket;
  lastAppParams = { ...mapParams };
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      filters: []
    };

    this.mappingParams = this.props.widget.mappingParams;
    this.subscription = notificationService.getNotification().subscribe((widgetNotification) => {
      this.handleNotification(widgetNotification)
    });
    if (!this.socket) {

      this.socket = io(BACKEND_SOCKET_API_URL, {
        path: '/back/socket',
        transports: ['websocket', 'polling']
      })

      this.socket.on('connect', (socket) => {
        notificationService.registerWidgetSocket(this.socket);
      });
      this.socket.on("RECEIVE_NOTIFICATION", (notification) => {
        if (!notificationService.isWidgetRegistredInSocketPool(notification.widgetSocketId)) {
          notificationService.sendNotification(notification.widgetNotification);
        }
      });
    }
  }

  handleNotification = (widgetNotification) => {
    if (JSON.stringify(this.lastAppParams) == JSON.stringify(widgetNotification.appParamsValue)) {
      return
    }
    this.props.onReceiveNotification(widgetNotification.appParamsValue)
    this.lastAppParams = { ...widgetNotification.appParamsValue }
  }

  setDashboardId() {
    // if (this.props.match.params.title) {
    //   this.dashboardId = this.props.match.params.title
    // }
  }

  renderWidget(widgetNotification) {
    if (widgetNotification) {
      if (widgetNotification !== null
        && widgetNotification !== undefined
        // && widgetNotification.fromWidgetKey !== this.props.widget.widgetKey
      ) {
        try {
          this.props.widget.config = this.jsonParser(this.props.widget.config)
          if (this.props.widget.config.hasOwnProperty('render')) {
            const render = eval(this.props.widget.config.render);
            const renderParams = {
              chart: this.chart,
              props: this.props,
              notification: widgetNotification,
              am4core,
              am4charts,
              worldMoroccoLow,
              moroccoLow,
              am4maps,
              am4plugins_wordCloud
            }

            this.chart = render(renderParams);
            this.chart.dispatchEvent = this.dispathWidgetEvent.bind(this);
          }
        }
        catch (er) {
          console.log(er);
        }
      }
    }
  }

  notifyAllWidgets(widgetNotification) {
    notificationService.sendNotification(widgetNotification);

    // notify others dashboards
    this.socket.emit("SEND_NOTIFICATION", { widgetSocketId: this.socket.id, widgetNotification });
  }

  dispathWidgetEvent(widgetParam) {
    if (!this.mappingParams || this.mappingParams.length == 0) {
      return
    }

    const widgetNotification = {
      fromWidgetKey: this.props.widget._id,
      appParamsValue: {}
    };
    this.mappingParams.forEach(item => {
      widgetNotification.appParamsValue[item.appParam] = widgetParam[item.responseParam];
    })

    this.notifyAllWidgets(widgetNotification);

    // const filtersAppParams = this.props.filters.reduce((acc, { configuration }) => {
    //   if (Array.isArray(configuration.appParam)) {
    //     return configuration.appParam.map((param) => param?.value || '').concat(acc)
    //   }
    //   acc.push(configuration.appParam.value)
    //   return acc
    // }, [])
    // this.mappingParams.forEach(item => {
    //   if (!filtersAppParams.includes(item.appParam)) {
    //     const filterConfig = {
    //       name: item.appParam,
    //       type: "inputText",
    //       dashboardId: this.dashboardId,
    //       configuration: {
    //         appParam: { label: item.appParam, value: item.appParam },
    //         inputText: widgetParam[item.responseParam]
    //       }
    //     }
    //     if (filterConfig.name && filterConfig.configuration.appParam && filterConfig.configuration.inputText) {
    //       this.props.addFilter(filterConfig)
    //     }
    //   }
    // })
  }

  componentDidMount() {
    this.initializeWidget()
    this.props.exportChart.current = this.exportChart
    this.props.initChart.current = this.initializeWidget
  }

  componentWillUnmount() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  exportChart = (type) => {
    this.chart.exporting.export(type);
  }

  jsonParser(toParse) {
    let parsed = toParse
    if (typeof toParse === 'string') parsed = JSON.parse(toParse);
    if (typeof parsed === 'string') { // case of over-stringified strings
      return this.jsonParser(parsed)
    }
    return parsed;
  }

  componentDidUpdate(prevProps) {
    if (this.props.widget.data != prevProps.widget.data) {
      this.renderWidget({ appParamsValue: this.lastAppParams });
    }
  }

  initializeWidget = async () => {
    try {
      this.setDashboardId();
      try {
        const parsedConfig = this.jsonParser(this.props.widget.config);
        this.props.widget.config = parsedConfig;
      }
      catch (er) {
        console.log(er);
      }

      if (this.props.widget.config.hasOwnProperty('init')) {
        // init chart from config
        const initChart = eval(this.props.widget.config.init);
        initChart(this.props);
        this.chart = am4core.createFromConfig(this.props.widget.config, this.props.widget._id, this.props.widget.type);
      }

      if (this.props.widget.config.hasOwnProperty('initChart')) {
        // init chart from javascript code
        const initChart = eval(this.props.widget.config.initChart);

        const initChartParams = {
          chart: this.chart,
          props: this.props,
          am4core,
          am4charts,
          worldMoroccoLow,
          moroccoLow,
          am4maps,
          am4plugins_wordCloud
        }

        this.chart = initChart(initChartParams);
      }
      if (this.chart) {
        this.chart.dispatchEvent = this.dispathWidgetEvent.bind(this);
      }
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <div
        key={this.props.widget._id}
        id={this.props.widget._id}
        className={`w-100 h-100 ${this.props.widget?.data?.length > 0 ? '' : 'd-none'}`}
      />
    );
  }


}

export default GenericWidget;
