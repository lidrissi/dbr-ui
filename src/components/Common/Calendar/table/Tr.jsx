import React from "react";
import PropTypes from "prop-types";

export default function Tr(props) {
  const { className, onClick, style, children } = props;

  Tr.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.array,
    onClick: PropTypes.func,
  };
  return (
    <tr style={style} onClick={onClick} className={className}>
      {children}
    </tr>
  );
}
