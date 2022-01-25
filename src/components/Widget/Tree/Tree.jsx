import React, { useState } from "react";

import TreeContent from "./TreeContent";
import "./tree.scss";

const Tree = (props) => {
  const [treeData, setTreeData] = useState([]);

  const widgetId = props.widget?._id || "";

  return (
    <TreeContent
      setTreeData={setTreeData}
      treeData={treeData}
      onEditNode={() => {}}
      onAddNode={() => {}}
      onRemoveNode={() => {}}
      onMoveNode={() => {}}
      widgetId={widgetId}
    />
  );
};

export default Tree;
