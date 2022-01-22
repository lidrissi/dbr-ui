"use strict";(self.webpackChunkdbr_ui=self.webpackChunkdbr_ui||[]).push([[314,178,709,177,428],{"./src/api/node/node.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{z:function(){return getWidgetNodes}});__webpack_require__("./node_modules/react-query/es/index.js");var _axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/api/axios.js"),constants_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/constants/resources.js");function getWidgetNodes(widget){var options={method:constants_resources__WEBPACK_IMPORTED_MODULE_2__.lD.nodes.get.method,url:"".concat((0,constants_resources__WEBPACK_IMPORTED_MODULE_2__.kG)(),"/").concat(constants_resources__WEBPACK_IMPORTED_MODULE_2__.lD.nodes.get.resource,"?widget=").concat(widget)};return(0,_axios__WEBPACK_IMPORTED_MODULE_1__.Z)(options).then((function(res){return res.data})).catch((function(err){return err}))}},"./src/components/Widget/Tree/SearchBar.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),SearchBar=function SearchBar(props){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),_useState2=(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(_useState,2),showInput=_useState2[0],setShowInput=_useState2[1],selectPrevMatch=props.selectPrevMatch,selectNextMatch=props.selectNextMatch,searchFocusIndex=props.searchFocusIndex,searchFoundCount=props.searchFoundCount,onSearchChange=props.onSearchChange,searchString=props.searchString,SearchIcon=function SearchIcon(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:"search-box__icon",onClick:function onClick(){return setShowInput(!showInput)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i",{className:"simple-icon-magnifier"})})};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:showInput?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"search-box",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SearchIcon,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{value:searchString,onChange:function onChange(e){return onSearchChange(e.target.value)}}),(null==searchString?void 0:searchString.length)>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span",{className:"search-box__count m-1",children:[searchFoundCount>0?searchFocusIndex+1:0," / ",searchFoundCount]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"search-box__controls m-1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{onClick:selectPrevMatch,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i",{className:"simple-icon-arrow-up"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{onClick:selectNextMatch,className:"m-1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i",{className:"simple-icon-arrow-down"})})]})]})]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SearchIcon,{})})};SearchBar.__docgenInfo={description:"",methods:[],displayName:"SearchBar"},__webpack_exports__.default=SearchBar,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Widget/Tree/SearchBar.jsx"]={name:"SearchBar",docgenInfo:SearchBar.__docgenInfo,path:"src/components/Widget/Tree/SearchBar.jsx"})},"./src/components/Widget/Tree/Tree.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_TreeContent__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Widget/Tree/TreeContent.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/components/Widget/Tree/tree.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js")),Tree=function Tree(props){var _props$widget,_useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),_useState2=(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.Z)(_useState,2),treeData=_useState2[0],setTreeData=_useState2[1],widgetId=(null===(_props$widget=props.widget)||void 0===_props$widget?void 0:_props$widget._id)||"";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TreeContent__WEBPACK_IMPORTED_MODULE_1__.default,{setTreeData:setTreeData,treeData:treeData,onEditNode:function onEditNode(){},onAddNode:function onAddNode(){},onRemoveNode:function onRemoveNode(){},onMoveNode:function onMoveNode(){},widgetId:widgetId})};Tree.__docgenInfo={description:"",methods:[],displayName:"Tree"},__webpack_exports__.default=Tree,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Widget/Tree/Tree.jsx"]={name:"Tree",docgenInfo:Tree.__docgenInfo,path:"src/components/Widget/Tree/Tree.jsx"})},"./src/components/Widget/Tree/TreeContent.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Tree_TreeContent}});var toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),index_esm=__webpack_require__("./node_modules/react-sortable-tree/dist/index.esm.js"),objectSpread2=(__webpack_require__("./node_modules/react-sortable-tree/style.css"),__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"));var SearchBar=__webpack_require__("./src/components/Widget/Tree/SearchBar.jsx"),useNodeNotification=__webpack_require__("./src/components/Widget/Tree/useNodeNotification.jsx"),node=__webpack_require__("./src/api/node/node.js"),context=__webpack_require__("./src/services/context.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),TreeContent=react.memo((function(props){var currentNodeId=(0,useNodeNotification.default)({widgetId:props.widgetId}).currentNodeId,setMapData=(0,react.useContext)(context.h).setMapData,_useState=(0,react.useState)(""),_useState2=(0,slicedToArray.Z)(_useState,2),searchString=_useState2[0],setSearchString=_useState2[1],_useState3=(0,react.useState)(0),_useState4=(0,slicedToArray.Z)(_useState3,2),searchFocusIndex=_useState4[0],setSearchFocusIndex=_useState4[1],_useState5=(0,react.useState)(null),_useState6=(0,slicedToArray.Z)(_useState5,2),searchFoundCount=_useState6[0],setSearchFoundCount=_useState6[1],_useState7=(0,react.useState)([]),_useState8=(0,slicedToArray.Z)(_useState7,2),prevTreeData=_useState8[0],setPrevTreeData=_useState8[1],treeData=props.treeData,setTreeData=(props.onAddNode,props.setTreeData),_onMoveNode=props.onMoveNode;(0,react.useEffect)((function(){(0,node.z)(props.widgetId).then((function(data){var tree=function listToTree(selfParentTree){var currentRoles=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!selfParentTree||selfParentTree.length<1)return[];var listNode={};selfParentTree.forEach((function(node){var _node$location,_node$location2;node.roles&&0!=node.roles.length&&!node.roles.some((function(role){return currentRoles.indexOf(role)>-1}))||(listNode[node._id]=(0,objectSpread2.Z)((0,objectSpread2.Z)({},node),{},{lat:null===(_node$location=node.location)||void 0===_node$location?void 0:_node$location.coordinates[1],lng:null===(_node$location2=node.location)||void 0===_node$location2?void 0:_node$location2.coordinates[0],children:node.children||[]}))}));var tree=[];Object.keys(listNode).forEach((function(id,index){if(listNode&&listNode.hasOwnProperty(id)){var mappedElem=listNode[id];mappedElem.parent&&listNode[mappedElem.parent]?listNode[mappedElem.parent].children.push(mappedElem):tree.push(mappedElem)}}));for(var i=0;i<tree.length;i++)tree[i].isRoot=!0;return tree}(data,[]);setTreeData(tree)}))}),[]),(0,react.useEffect)((function(){var _result$treeData,result=(0,index_esm.sE)({getNodeKey:getNodeKey,treeData:treeData,searchQuery:currentNodeId,searchMethod:function searchMethod(_ref){var node=_ref.node,searchQuery=_ref.searchQuery;return node._id==searchQuery},searchFocusOffset:0,expandAllMatchPaths:!0,expandFocusMatchPaths:!0});(null===(_result$treeData=result.treeData)||void 0===_result$treeData?void 0:_result$treeData.length)>0&&setTreeData(result.treeData)}),[currentNodeId]);var getNodeKey=function getNodeKey(_ref4){return _ref4.treeIndex},visibleNodesCount=(0,index_esm.vr)({treeData:treeData});return(0,jsx_runtime.jsxs)("div",{className:"wrapper",children:[(0,jsx_runtime.jsx)("div",{className:"d-flex justify-content-end align-items-center",children:(0,jsx_runtime.jsx)(SearchBar.default,{searchString:searchString,selectPrevMatch:function selectPrevMatch(){setSearchFocusIndex(null!==searchFocusIndex?(searchFoundCount+searchFocusIndex-1)%searchFoundCount:searchFoundCount-1)},selectNextMatch:function selectNextMatch(){setSearchFocusIndex(null!==searchFocusIndex?(searchFocusIndex+1)%searchFoundCount:0)},searchFocusIndex:searchFocusIndex,searchFoundCount:searchFoundCount,onSearchChange:setSearchString})}),(0,jsx_runtime.jsx)("div",{className:"tree-wrapper",children:(0,jsx_runtime.jsx)(index_esm.ZP,{onMoveNode:function onMoveNode(_ref5){var node=_ref5.node,nextParentNode=_ref5.nextParentNode,path=_ref5.path;_onMoveNode({node:node,nextParentNode:nextParentNode,path:path,prevTreeData:prevTreeData})},onDragStateChanged:function handleDragStateChange(_ref2){_ref2.isDragging&&setPrevTreeData(treeData)},treeData:treeData,onChange:setTreeData,rowHeight:55,canDrag:!1,canDrop:function canDrop(_ref6){var nextParent=_ref6.nextParent;return!nextParent||!nextParent.noChildren},searchQuery:searchString,style:{height:55*visibleNodesCount+20},searchFocusOffset:searchFocusIndex,searchFinishCallback:function searchFinishCallback(matches){setSearchFoundCount(matches.length),setSearchFocusIndex(matches.length>0?searchFocusIndex%matches.length:0)},isVirtualized:!0,searchMethod:function customSearchMethod(_ref3){var node=_ref3.node,searchQuery=_ref3.searchQuery;return searchQuery&&node.name&&node.name.toLowerCase().indexOf(searchQuery.toLowerCase())>-1},generateNodeProps:function generateNodeProps(rowInfo){return{title:"".concat(rowInfo.node.name),onClick:function onClick(e){return function handleNodeClick(event,node){var _node$children,_node$polygonCoordina,_node$children2,clickedItemClassName=event.target.className;if("rst__expandButton"!=clickedItemClassName&&"rst__collapseButton"!=clickedItemClassName){var nodes=[].concat((0,toConsumableArray.Z)((null===(_node$children=node.children)||void 0===_node$children?void 0:_node$children.length)>0&&0==(null===(_node$polygonCoordina=node.polygonCoordinates)||void 0===_node$polygonCoordina?void 0:_node$polygonCoordina.length)?[]:[node]),(0,toConsumableArray.Z)((null===(_node$children2=node.children)||void 0===_node$children2?void 0:_node$children2.length)>0?node.children:[]));nodes&&0!=nodes.length&&(console.log("node id",node._id),setMapData(props.widgetId,{currentNodeId:node._id,nodes:nodes,mapNodes:nodes}))}}(e,rowInfo.node)},className:currentNodeId==rowInfo.node._id?"rst__rowSearchMatch rst__rowSearchFocus":""}}})})]})})),Tree_TreeContent=TreeContent},"./src/components/Widget/Tree/useNodeNotification.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),constants_resources__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/resources.js"),socket_io_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/socket.io-client/build/esm/index.js"),_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/services/NotificationService.js"),_services_context__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/services/context.js");__webpack_exports__.default=function useNodeNotification(_ref){var _map$id,_map$id2,subscription,socket,widgetId=_ref.widgetId,treeId=_ref.treeId,_useContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_services_context__WEBPACK_IMPORTED_MODULE_4__.h),map=_useContext.map,widgets=_useContext.dashboard.widgets,setMapData=_useContext.setMapData,id=treeId||widgetId,currentNodeId=(null===(_map$id=map[id])||void 0===_map$id?void 0:_map$id.currentNodeId)||null,data=(null===(_map$id2=map[id])||void 0===_map$id2?void 0:_map$id2.data)||[];(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return subscription=_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.getNotification().subscribe((function(notification){handleNotification(widgets,notification,data)})),createSocket(),function(){subscription&&subscription.unsubscribe()}}),[data,widgets]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var _Object$keys;if(currentNodeId){var node=data.find((function(_ref2){var _id=_ref2._id;return currentNodeId==_id}));if(node){var appParamsValue={};for(var key in node.metaData||{})appParamsValue[key]=node.metaData[key]+"".split(",").map((function(i){return i.trim()}))[0];node.applicationParam&&(appParamsValue[node.applicationParam]=node.name),!((null===(_Object$keys=Object.keys(appParamsValue))||void 0===_Object$keys?void 0:_Object$keys.length)>0)||treeId&&widgets[treeId]||notifyAllWidgets({fromWidgetKey:widgetId,appParamsValue:appParamsValue})}}}),[currentNodeId]);var createSocket=function createSocket(widgets){return(socket=(0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__.ZP)(constants_resources__WEBPACK_IMPORTED_MODULE_1__.gs,{path:"/back/socket",transports:["websocket","polling"]})).on("connect",(function(){_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.registerWidgetSocket(socket)})),socket.on("RECEIVE_NOTIFICATION",(function(notification){notification.widgetSocketId!=socket.id&&(_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.isWidgetRegistredInSocketPool(notification.widgetSocketId)||handleNotification(widgets,notification.widgetNotification,data))})),socket},handleNotification=function handleNotification(widgets,notification,nodes){if(!(widgets&&treeId&&widgets[treeId])&&notification.appParamsValue&&notification.fromWidgetKey!=widgetId){var appParams=notification.appParamsValue,selectedNodes=nodes.filter((function(node){var commonKeys=Object.keys(appParams).filter((function(key){return node.metaData&&node.metaData[key]}));return(null==commonKeys?void 0:commonKeys.length)>0&&commonKeys.every((function(key){return node.metaData[key]&&(""==appParams[key]||node.metaData[key].split(",").map((function(item){return item.trim()})).indexOf(appParams[key]+"")>-1)}))}));(null==selectedNodes?void 0:selectedNodes.length)>0&&setMapData(treeId||widgetId,{currentNodeId:1==selectedNodes.length?selectedNodes[0]._id:"root",mapNodes:selectedNodes,nodes:selectedNodes})}},notifyAllWidgets=function notifyAllWidgets(widgetNotification){_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.sendNotification(widgetNotification),socket||(socket=createSocket(widgets)),socket.emit("SEND_NOTIFICATION",{widgetSocketId:socket.id,widgetNotification:widgetNotification})};return{currentNodeId:currentNodeId,notification:!0}}},"./src/components/Widget/Tree/tree.scss":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_exports__.default={}}}]);