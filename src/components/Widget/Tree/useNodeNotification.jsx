import { useContext, useEffect } from "react";
import { BACKEND_SOCKET_API_URL } from "../../../constants/resources";
import io from "socket.io-client";
import { notificationService } from "../../../services/NotificationService";
import { DbrContext } from "../../../services/context";

const useNodeNotification = ({ widgetId, treeId }) => {
  let subscription;
  let socket;

  const {
    map,
    dashboard: { widgets },
    setMapData,
  } = useContext(DbrContext);

  const id = treeId ? treeId : widgetId;
  const currentNodeId = map[id]?.currentNodeId || null;
  const data = map[id]?.data || [];

  useEffect(() => {
    subscription = notificationService
      .getNotification()
      .subscribe((notification) => {
        handleNotification(widgets, notification, data);
      });

    createSocket();
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [data, widgets]);

  useEffect(() => {
    if (!currentNodeId) {
      return;
    }
    const node = data.find(({ _id }) => currentNodeId == _id);
    if (!node) {
      return;
    }
    let appParamsValue = {};
    for (let key in node.metaData || {}) {
      appParamsValue[key] =
        node.metaData[key] + "".split(",").map((i) => i.trim())[0];
    }
    if (node.applicationParam) {
      appParamsValue[node.applicationParam] = node.name;
    }
    if (
      Object.keys(appParamsValue)?.length > 0 &&
      !(treeId && widgets[treeId])
    ) {
      notifyAllWidgets({
        fromWidgetKey: widgetId,
        appParamsValue,
      });
    }
  }, [currentNodeId]);

  const createSocket = (widgets) => {
    socket = io(BACKEND_SOCKET_API_URL, {
      path: "/back/socket",
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      notificationService.registerWidgetSocket(socket);
    });

    socket.on("RECEIVE_NOTIFICATION", (notification) => {
      if (notification.widgetSocketId == socket.id) {
        return;
      }
      if (
        !notificationService.isWidgetRegistredInSocketPool(
          notification.widgetSocketId
        )
      ) {
        handleNotification(widgets, notification.widgetNotification, data);
      }
    });

    return socket;
  };

  const handleNotification = (widgets, notification, nodes) => {
    if (
      (widgets && treeId && widgets[treeId]) ||
      !notification.appParamsValue ||
      notification.fromWidgetKey == widgetId
    ) {
      return;
    }

    const appParams = notification.appParamsValue;
    const selectedNodes = nodes.filter((node) => {
      const commonKeys = Object.keys(appParams).filter(
        (key) => node.metaData && node.metaData[key]
      );
      return (
        commonKeys?.length > 0 &&
        commonKeys.every((key) => {
          return (
            node.metaData[key] &&
            (appParams[key] == "" ||
              node.metaData[key]
                .split(",")
                .map((item) => item.trim())
                .indexOf(appParams[key] + "") > -1)
          );
        })
      );
    });
    if (selectedNodes?.length > 0) {
      setMapData(treeId ? treeId : widgetId, {
        currentNodeId:
          selectedNodes.length == 1 ? selectedNodes[0]._id : "root",
        mapNodes: selectedNodes,
        nodes: selectedNodes,
      });
    }
  };

  const notifyAllWidgets = (widgetNotification) => {
    notificationService.sendNotification(widgetNotification);
    if (!socket) {
      socket = createSocket(widgets);
    }
    // notify others dashboards
    socket.emit("SEND_NOTIFICATION", {
      widgetSocketId: socket.id,
      widgetNotification: widgetNotification,
    });
  };

  return {
    currentNodeId,
    notification: true,
  };
};

export default useNodeNotification;
