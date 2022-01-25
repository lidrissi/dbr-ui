import React, { useContext, useEffect, useState } from "react";
import SortableTree, { getVisibleNodeCount, find } from "react-sortable-tree";
import "react-sortable-tree/style.css";

import { listToTree } from "../../../helpers/tree";

import SearchBar from "./SearchBar";
import useNodeNotification from "./useNodeNotification";
import { getWidgetNodes } from "../../../api/node/node";
import { DbrContext } from "../../../services/context";

const TreeContent = React.memo((props) => {
  const { currentNodeId } = useNodeNotification({ widgetId: props.widgetId });
  const { setMapData } = useContext(DbrContext);

  const [searchString, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);
  const [prevTreeData, setPrevTreeData] = useState([]);

  const { treeData, onAddNode, setTreeData, onMoveNode } = props;

  useEffect(() => {
    getWidgetNodes(props.widgetId).then((data) => {
      const tree = listToTree(data, []);
      setTreeData(tree);
    });
  }, []);

  useEffect(() => {
    const result = find({
      getNodeKey,
      treeData,
      searchQuery: currentNodeId,
      searchMethod: ({ node, searchQuery }) => node._id == searchQuery,
      searchFocusOffset: 0,
      expandAllMatchPaths: true,
      expandFocusMatchPaths: true,
    });
    if (result.treeData?.length > 0) {
      setTreeData(result.treeData);
    }
  }, [currentNodeId]);

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  };

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    );
  };

  const handleDragStateChange = ({ isDragging }) => {
    if (!isDragging) {
      return;
    }
    setPrevTreeData(treeData);
  };

  const customSearchMethod = ({ node, searchQuery }) =>
    searchQuery &&
    node.name &&
    node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const handleNodeClick = (event, node) => {
    const clickedItemClassName = event.target.className;
    if (
      clickedItemClassName == "rst__expandButton" ||
      clickedItemClassName == "rst__collapseButton"
    ) {
      return;
    }
    const nodes = [
      ...(node.children?.length > 0 && node.polygonCoordinates?.length == 0
        ? []
        : [node]),
      ...(node.children?.length > 0 ? node.children : []),
    ];

    if (!nodes || nodes.length == 0) {
      return;
    }

    console.log("node id", node._id);
    setMapData(props.widgetId, {
      currentNodeId: node._id,
      nodes,
      mapNodes: nodes,
    });
  };

  const visibleNodesCount = getVisibleNodeCount({ treeData });

  return (
    <div className="wrapper">
      <div className="d-flex justify-content-end align-items-center">
        <SearchBar
          searchString={searchString}
          selectPrevMatch={selectPrevMatch}
          selectNextMatch={selectNextMatch}
          searchFocusIndex={searchFocusIndex}
          searchFoundCount={searchFoundCount}
          onSearchChange={setSearchString}
        />
      </div>
      <div className="tree-wrapper">
        <SortableTree
          onMoveNode={({ node, nextParentNode, path }) => {
            onMoveNode({ node, nextParentNode, path, prevTreeData });
          }}
          onDragStateChanged={handleDragStateChange}
          treeData={treeData}
          onChange={setTreeData}
          rowHeight={55}
          canDrag={false}
          canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
          searchQuery={searchString}
          style={{ height: 55 * visibleNodesCount + 20 }}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={(matches) => {
            setSearchFoundCount(matches.length);
            setSearchFocusIndex(
              matches.length > 0 ? searchFocusIndex % matches.length : 0
            );
          }}
          isVirtualized={true}
          searchMethod={customSearchMethod}
          generateNodeProps={(rowInfo) => ({
            title: `${rowInfo.node.name}`,
            onClick: (e) => handleNodeClick(e, rowInfo.node),
            className:
              currentNodeId == rowInfo.node._id
                ? "rst__rowSearchMatch rst__rowSearchFocus"
                : "",
          })}
        />
      </div>
    </div>
  );
});

export default TreeContent;
