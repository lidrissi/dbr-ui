import { Subject } from "rxjs";

const subject = new Subject();

const widgetSockets = [];
export const mapParams = {};
export const notificationService = {
  sendNotification: (notification) => {
    for (let key of Object.keys(notification.appParamsValue)) {
      const value = notification.appParamsValue[key];
      if (value && value != "") {
        mapParams[key] = value;
      } else {
        delete mapParams[key];
      }
    }

    notification.appParamsValue = { ...mapParams };

    subject.next(notification);
  },
  getNotification: () => subject.asObservable(),
  registerWidgetSocket: (socket) => {
    if (socket) widgetSockets.push(socket.id);
  },
  isWidgetRegistredInSocketPool: (widgetSocketId) => {
    return widgetSockets.indexOf(widgetSocketId) >= 0;
  },
};
