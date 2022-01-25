import React, { memo } from "react";

const NoDataFound = memo(() => {
  return (
    <div className="widgetWrapper">
      <div className="actionsContainer">
        <img
          src={require("../../assets/nodata.svg")}
          alt=""
          title=""
          style={{ width: "45px" }}
        />
        <h3 className="mt-2">No data found</h3>
        <p className="px-4">No data to display for the selected metrics</p>
      </div>
    </div>
  );
});

export default NoDataFound;
