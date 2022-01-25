import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { getDashboards } from "../../../api/dashboard";
import { DashboardItem } from "./DashboardItem";

export const DashboardList = ({ token, env, onClick }) => {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    window.accessToken = token;
    window.dbr_env = env;
    if (token) {
      getDashboards().then((data) => setDashboards(data));
    }
  }, [token, env]);

  return (
    <Row>
      {dashboards?.length > 0 &&
        dashboards.map((dashboard) => (
          <DashboardItem
            key={dashboard._id}
            onClick={onClick || false}
            name={dashboard?.name}
            description={dashboard?.description}
            updatedAt={dashboard?.updatedAt}
          />
        ))}
    </Row>
  );
};
DashboardList.propTypes = {
  token: PropTypes.string.isRequired,
  env: PropTypes.oneOf(["local", "demo", "sandbox"]),
  onClick: PropTypes.func,
};
