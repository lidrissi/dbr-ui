/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import { cx } from "../utils";

export default function DayCell(props) {
  DayCell.propTypes = {
    day: PropTypes.object.isRequired,
    onDayClick: PropTypes.func,
  };

  const handleOnClick = () => {
    const { onDayClick, day } = props;
    if (onDayClick) {
      onDayClick(day);
    }
  };

  const { day } = props;
  const className = cx({ ...props });
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <td className={className} onClick={handleOnClick}>
      {day.format("DD")}
    </td>
  );
}
