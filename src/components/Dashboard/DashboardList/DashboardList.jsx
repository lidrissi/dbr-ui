import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import PropTypes from 'prop-types'
import { getDashboards } from "../../../api/dashboard";
import DashboardItem from "./DashboardItem";

const DashboardList = ({
    token,
    env,
    onClick
}) => {

    const [dashboards, setDashboards] = useState([])

    useEffect(() => {
        window.accessToken = token
        window.dbr_env = env
        getDashboards().then(
            (data) => setDashboards(data)
        )
    }, [token, env])

    return (
        <Row>
            {
                dashboards?.length > 0 && dashboards.map(dashboard => <DashboardItem
                    onClick={onClick || false}
                    dashboard={dashboard} />
                )
            }
        </Row>
    )
}
DashboardList.propTypes = {
    token: PropTypes.string.isRequired,
    env: PropTypes.oneOf(['local', 'demo', 'sandbox']),
    onClick: PropTypes.func
};
export default DashboardList