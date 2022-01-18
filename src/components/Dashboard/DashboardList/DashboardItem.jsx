import React from "react";
import ImageListView from "./ImageListView";
import PropTypes from 'prop-types'

const DashboardItem = (props) => {

    return (
        <ImageListView {...props}
        />
    )
}

DashboardItem.propTypes = {
    name: PropTypes.any,
    description: PropTypes.string,
    updatedAt: PropTypes.string,
    onClick: PropTypes.func
};
export default DashboardItem