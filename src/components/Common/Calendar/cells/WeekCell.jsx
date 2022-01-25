import React from "react";
import PropTypes from "prop-types";

export default function WeekCell(props) {
  WeekCell.propTypes = {
    week: PropTypes.any,
  };
  const { week } = props;
  return <td className="week">{week}</td>;
}
