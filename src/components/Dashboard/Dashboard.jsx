import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { deductDateRangeFromType } from "../../helpers/date";
import { getDashboardFilter } from "../../api/filter";
import { getDashboardWidgets } from "../../api/dashboard";
import Customizer from "./Customizer";

export const Dashboard = (props) => {
  const [widgets, setWidgets] = useState([]);
  const [layouts, setLayouts] = useState({});
  const [filters, setFilters] = useState([]);

  const dashboardId = props.id;

  const fetchWidgets = () => {
    getDashboardWidgets(dashboardId).then((dashboardWidgets) => {
      const { layouts = {}, widgets = [], appearance } = dashboardWidgets;
      const widgetsObject = {};
      widgets.forEach((widget) => {
        // add only valid widget
        if (widget && widget._id && widget.status === "publish") {
          if (
            widget?.stWidget?.config &&
            typeof widget.stWidget.config !== "object"
          ) {
            widget.config = JSON.parse(
              widget?.stWidget.config || widget.config
            );
          }
          widgetsObject[widget._id] = {
            widget,
          };
        }
      });

      setWidgets(widgetsObject);
      setLayouts(layouts);
    });
  };

  const fetchFilters = () => {
    getDashboardFilter(dashboardId).then((dashboardFilters) => {
      const filters = (dashboardFilters || []).map((filter) => {
        if (
          filter.type == "datePickerAvance" &&
          filter.configuration?.dateRangeType != "CUSTOM_RANGE"
        ) {
          const { startDate, endDate } = deductDateRangeFromType(
            filter.configuration.dateRangeType
          );
          filter.configuration.startDateRange = startDate;
          filter.configuration.endDateRange = endDate;
        }
        return filter;
      });
      setFilters(filters);
    });
  };

  useEffect(() => {
    window.dbr_env = props.env;
    console.log("=====", window.dbr_env, props.env);
    if (props.id) {
      fetchWidgets();
      fetchFilters();
    }
  }, [props.id, props.env]);

  return (
    <div className="container-fluid no-breadcrumbs page-dashboard">
      <Customizer
        {...props}
        dashboardID={dashboardId}
        widgets={widgets}
        layouts={layouts}
        filters={filters}
      />
    </div>
  );
};

Dashboard.propTypes = {
  id: PropTypes.string.isRequired,
  env: PropTypes.oneOf(["local", "demo", "sandbox"]),
};
