import { createContext, useState } from "react";
const dbrContextValue = {
  dashboard: {
    dashboardId: null,
    widgets: [],
  },
  map: {
    nodes: [],
    data: [],
    status: true,
    marker: { id: "" },
    currentNodeId: null,
  },
  datePicker: {
    dateRange: {
      start: new Date().setDate(0),
      end: new Date(),
    },
  },
};
export const DbrContext = createContext(dbrContextValue);

export const DbrProvider = (props) => {
  const initialMapData = {
    nodes: [],
    mapNodes: [],
    data: [],
    currentNodeId: null,
  };

  const setMapData = (treeId, data = {}) => {
    setState({
      ...state,
      map: {
        ...state.map,
        [treeId]: {
          ...(state.map[treeId] ? state.map[treeId] : initialMapData),
          ...data,
        },
      },
    });
  };

  const initState = {
    dashboard: {
      dashboardId: null,
      widgets: [],
    },
    map: {},
    setMapData,
  };

  const [state, setState] = useState(initState);

  return (
    <DbrContext.Provider value={state}>{props.children}</DbrContext.Provider>
  );
};
