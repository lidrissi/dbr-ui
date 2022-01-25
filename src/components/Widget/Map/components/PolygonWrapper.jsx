import React, { useState } from "react";
import { Polygon } from "@react-google-maps/api";
import PropTypes from "prop-types";

const options = {
  fillOpacity: 0.4,
  strokeColor: "#000",
  strokeOpacity: 1,
  strokeWeight: 1,
};

function PolygonWrapper(props) {
  const { node, handleMarkerClick } = props;
  const [fillColor, setFillColor] = useState(node.fillColor || "#000");

  const handleMouseOver = () => {
    setFillColor("#e9e7a8");
  };

  const handleMouseOut = () => {
    setFillColor(node.fillColor || "#000");
  };

  const polygonOptions = { ...options, fillColor };

  PolygonWrapper.propTypes = {
    node: PropTypes.object,
    handleMarkerClick: PropTypes.func,
  };

  const coords = node.polygonCoordinates.map((l) => ({ lat: l[1], lng: l[0] }));

  return (
    <Polygon
      paths={coords}
      onClick={() => {
        handleMarkerClick(node);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      options={polygonOptions}
    />
  );
}

export default PolygonWrapper;
