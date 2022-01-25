import React from "react";
import PropTypes from "prop-types";

export default function THead(props) {
  const { className, style, children } = props;

  THead.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    children: PropTypes.array,
  };
  return (
    <thead style={style} className={className}>
      {children}
    </thead>
  );
}
