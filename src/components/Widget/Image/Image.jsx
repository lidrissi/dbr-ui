import React, { memo, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { getWidgetIcon } from "../../../constants/widget";
import "./image.scss";

const Image = memo(({ editMode, widget, onDelete }) => {
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const imageUrl = getWidgetIcon(widget);
      setImagePath(imageUrl);
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div
      style={loading ? {} : { backgroundImage: `url(${imagePath})` }}
      className="widget-image"
    >
      {editMode && (
        <span className="delete bg-danger" onClick={onDelete}>
          <i className="simple-icon-trash" />
        </span>
      )}
      {loading && <Spinner />}
    </div>
  );
});

export default Image;
