import React, { useContext, useEffect, useState } from "react";
import SortableTree, { getVisibleNodeCount, find } from "react-sortable-tree";
import "react-sortable-tree/style.css";

import { listToTree } from "helpers/tree";

import SearchBar from "./SearchBar";
import useNodeNotification from "./useNodeNotification";
import { getWidgetNodes } from "../../../api/node/node";
import { DbrContext } from "../../../services/context";

const TreeContent = React.memo((props) => {

    const { currentNodeId } = useNodeNotification({ widgetId: props.widgetId })
    const { setMapData } = useContext(DbrContext)

    const [searchString, setSearchString] = useState("")
    const [searchFocusIndex, setSearchFocusIndex] = useState(0)
    const [searchFoundCount, setSearchFoundCount] = useState(null)
    const [prevTreeData, setPrevTreeData] = useState([])

    const { treeData, onEditNode, onRemoveNode, onAddNode, setTreeData, onMoveNode } = props;

    useEffect(() => {
        getWidgetNodes(props.widgetId).then((data) => {
            const tree = listToTree(data, [])
            setTreeData(tree)
        })
    }, [])

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
            setTreeData(result.treeData)
        }
    }, [currentNodeId])

    const selectPrevMatch = () => {
        setSearchFocusIndex(searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1)
    };

    const selectNextMatch = () => {
        setSearchFocusIndex(
            searchFocusIndex !== null
                ? (searchFocusIndex + 1) % searchFoundCount
                : 0
        );
    };

    const handleDragStateChange = ({ isDragging }) => {
        if (!isDragging) {
            return;
        }
        setPrevTreeData(treeData)
    }

    const customSearchMethod = ({ node, searchQuery }) =>
        searchQuery &&
        node.name &&
        node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1

    const getNodeKey = ({ treeIndex }) => treeIndex

    const handleNodeClick = (event, node) => {
        const clickedItemClassName = event.target.className;
        if (
            clickedItemClassName == 'rst__expandButton' || clickedItemClassName == 'rst__collapseButton'
        ) {
            return
        }
        const nodes = [
            ...(node.children?.length > 0 && node.polygonCoordinates?.length == 0) ? [] : [node],
            ...node.children?.length > 0 ? node.children : []
        ]

        if (!nodes || nodes.length == 0) {
            return
        }

        console.log("node id", node._id);
        setMapData(props.widgetId, {
            nodes
        })
    }

    const visibleNodesCount = getVisibleNodeCount({ treeData })
    const canEdit = false

    const renderNodeButtons = (rowInfo) => {
        if (!canEdit) {
            return []
        }

        return [
            <button
                className="btn-outline-dark transparent action"
                onClick={(e) => { e.stopPropagation(); onAddNode(rowInfo) }}
                title="add"
            >
                <i className="simple-icon-plus" />
            </button>,
            <button
                className="btn-outline-success transparent action"
                onClick={(e) => { e.stopPropagation(); onEditNode(rowInfo) }}
                title="edit"
            >
                <i className="simple-icon-pencil" />
            </button>,
            <button
                className="btn-outline-danger transparent action"
                onClick={(e) => { e.stopPropagation(); onRemoveNode(rowInfo) }}
                title="delete"
            >
                <i className="simple-icon-trash" />
            </button>
        ]
    }

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
                {canEdit &&
                    <button onClick={onAddNode} className='btn btn-light ml-1'>
                        <i className="simple-icon-plus mr-2" />
                        Add Node
                    </button>
                }
            </div>
            <div className="tree-wrapper">
                <SortableTree
                    onMoveNode={({ node, nextParentNode, path }) => { onMoveNode({ node, nextParentNode, path, prevTreeData }) }}
                    onDragStateChanged={handleDragStateChange}
                    treeData={treeData}
                    onChange={setTreeData}
                    rowHeight={55}
                    canDrag={() => canEdit}
                    canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
                    searchQuery={searchString}
                    style={{ height: 55 * visibleNodesCount + 20 }}
                    searchFocusOffset={searchFocusIndex}
                    searchFinishCallback={matches => {
                        setSearchFoundCount(matches.length);
                        setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0)
                    }
                    }
                    isVirtualized={true}
                    searchMethod={customSearchMethod}
                    generateNodeProps={rowInfo => ({
                        title: `${rowInfo.node.name}`,
                        onClick: (e) => handleNodeClick(e, rowInfo.node),
                        buttons: renderNodeButtons(rowInfo),
                        className: (currentNodeId == rowInfo.node._id) ? 'rst__rowSearchMatch rst__rowSearchFocus' : ''
                    })}
                />
            </div>
        </div>
    );
})


export default TreeContent