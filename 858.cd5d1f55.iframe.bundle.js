"use strict";(self.webpackChunkdbr_ui=self.webpackChunkdbr_ui||[]).push([[858,255,541,406,674,428],{"./src/api/node/node.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{z:function(){return getWidgetNodes}});__webpack_require__("./node_modules/react-query/es/index.js");var _axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/api/axios.js"),constants_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/constants/resources.js");function getWidgetNodes(widget){var options={method:constants_resources__WEBPACK_IMPORTED_MODULE_2__.lD.nodes.get.method,url:"".concat((0,constants_resources__WEBPACK_IMPORTED_MODULE_2__.kG)(),"/").concat(constants_resources__WEBPACK_IMPORTED_MODULE_2__.lD.nodes.get.resource,"?widget=").concat(widget)};return(0,_axios__WEBPACK_IMPORTED_MODULE_1__.Z)(options).then((function(res){return res.data})).catch((function(err){return err}))}},"./src/components/Widget/Map/Map.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Map}});var objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),esm=__webpack_require__("./node_modules/@react-google-maps/api/dist/esm.js"),map_worker=__webpack_require__("./src/components/Widget/Map/map.worker.js"),workerSetup=__webpack_require__("./src/components/Widget/Map/workerSetup.js"),mapStyles=__webpack_require__("./src/components/Widget/Map/mapStyles.json"),PolygonWrapper=__webpack_require__("./src/components/Widget/Map/components/PolygonWrapper.jsx"),node=__webpack_require__("./src/api/node/node.js"),useNodeNotification=__webpack_require__("./src/components/Widget/Tree/useNodeNotification.jsx"),services_context=__webpack_require__("./src/services/context.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["children","treeId"],_excluded2=["setMapData"],defaultMapOptions={styles:mapStyles,disableDefaultUI:!0,gestureHandling:"auto",mapTypeId:"satellite"},listNode={},Breadcrumb=[],stratificationNodes={},containerStyle={height:"calc(100% - 42px)",width:"100%",borderRadius:"0 0 0.4rem 0.4rem"},calculateBounds=function calculateBounds(positions){return positions&&positions[0]&&positions[0].polygonCoordinates&&positions[0].polygonCoordinates.length>0?function calculatePolygonBounds(listNode){if(listNode){var bounds=new window.google.maps.LatLngBounds;return listNode.forEach((function(_ref){for(var polygonCoordinates=_ref.polygonCoordinates,i=0;i<polygonCoordinates.length;i++){var latLng=new window.google.maps.LatLng(polygonCoordinates[i].lat||polygonCoordinates[i][1],polygonCoordinates[i].lng||polygonCoordinates[i][0]);bounds.extend(latLng)}})),bounds}}(positions):function calculateMarkerBounds(positions){if(positions&&positions[0]){for(var bounds=new window.google.maps.LatLngBounds,i=0;i<positions.length;i++){var latLng=new window.google.maps.LatLng(positions[i].lat,positions[i].lng);bounds.extend(latLng)}return bounds}}(positions)},map=null,MapComponents=function MapComponents(_ref){var _context$map$treeId,_context$map$treeId2,handleMarkerClick=_ref.handleMarkerClick,setBreadcrumb=_ref.setBreadcrumb,getNodeAncestors=_ref.getNodeAncestors,treeId=_ref.treeId;map=(0,esm.YP)();var context=(0,react.useContext)(services_context.h),nodes=(null==context||null===(_context$map$treeId=context.map[treeId])||void 0===_context$map$treeId?void 0:_context$map$treeId.mapNodes)||[],currentNodeId=(null==context||null===(_context$map$treeId2=context.map[treeId])||void 0===_context$map$treeId2?void 0:_context$map$treeId2.currentNodeId)||null,_useState=(0,react.useState)({}),_useState2=(0,slicedToArray.Z)(_useState,2),infoVisibility=_useState2[0],setInfoVisibility=_useState2[1];(0,react.useEffect)((function(){if(map&&nodes){try{var _nodes$;map.fitBounds(calculateBounds(nodes)),1===nodes.length&&null!==(_nodes$=nodes[0])&&void 0!==_nodes$&&_nodes$.kmzUrl&&map.setZoom(map.getZoom()-3)}catch(e){mapContentKey="MAP_KEY_2",console.log("error",e)}setBreadcrumb(getNodeAncestors(currentNodeId))}}),[nodes]);var ShowKmlLayers=function ShowKmlLayers(node){return(0,jsx_runtime.jsx)(esm.Cs,{url:node.kmzUrl,onClick:function onClick(){handleMarkerClick(node)},options:{preserveViewport:!0,suppressInfoWindows:!0}})},ShowMarkers=function ShowMarkers(marker){return(0,jsx_runtime.jsx)(esm.Jx,{position:{lat:marker.lat,lng:marker.lng},icon:marker.icon,onClick:function onClick(){marker.setInfoVisibility((0,defineProperty.Z)({},marker._id,!0)),handleMarkerClick(marker)},children:infoVisibility[marker._id]&&(0,jsx_runtime.jsx)(esm.nx,{children:(0,jsx_runtime.jsx)("h6",{children:marker.name})})})},ShowPolygon=function ShowPolygon(marker){return(0,jsx_runtime.jsx)(PolygonWrapper.default,{node:marker,handleMarkerClick:handleMarkerClick})},Markers=react.useMemo((function(){return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:nodes&&nodes.map((function(marker){return marker?marker.polygonCoordinates&&marker.polygonCoordinates.length>0?(0,jsx_runtime.jsx)(ShowPolygon,(0,objectSpread2.Z)({},marker),marker._id):marker.kmzUrl?(0,jsx_runtime.jsx)(ShowKmlLayers,(0,objectSpread2.Z)({},marker),marker._id):(0,jsx_runtime.jsx)(ShowMarkers,(0,objectSpread2.Z)((0,objectSpread2.Z)({},marker),{},{infoVisibility:infoVisibility,setInfoVisibility:setInfoVisibility}),marker._id):null}))})}),[nodes]);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:Markers})},MapBreadcrumb=function MapBreadcrumb(_ref2){var handleMarkerClick=_ref2.handleMarkerClick,showNewStratificationOnMap=_ref2.showNewStratificationOnMap,rootNodesIds=_ref2.rootNodesIds,breadcrumb=_ref2.breadcrumb;(0,react.useEffect)((function(){showNewStratificationOnMap(rootNodesIds)}),[rootNodesIds]);var onFirstBreadcrumbClick=react.useCallback((function(){showNewStratificationOnMap("root")}),[rootNodesIds]);return Breadcrumb=breadcrumb&&breadcrumb.map((function(node,index){return breadcrumb.length-1===index?(0,jsx_runtime.jsx)("li",{className:"breadcrumb-item-map active",children:(0,jsx_runtime.jsx)("button",{type:"button",className:"btn btn-sm btn-link",onClick:function onClick(){handleMarkerClick(node)},children:node.name||"Unknown"})},Math.random()):(0,jsx_runtime.jsx)("li",{className:"breadcrumb-item-map",children:(0,jsx_runtime.jsx)("button",{type:"button",className:"btn btn-sm btn-link",onClick:function onClick(){handleMarkerClick(node)},children:node.name||"Unknown"})},Math.random())})),(0,jsx_runtime.jsxs)("ol",{className:"breadcrumb bread-map",children:[(0,jsx_runtime.jsx)("li",{className:"bread-map-left-icon",children:(0,jsx_runtime.jsx)("i",{className:"simple-icon-map"})}),(0,jsx_runtime.jsx)("li",{className:"breadcrumb-item-map-map",children:(0,jsx_runtime.jsx)("button",{type:"button",className:"btn btn-sm btn-link",onClick:onFirstBreadcrumbClick,children:"Home"})}),Breadcrumb]})};function MapHOC(_ref3){var children=_ref3.children,treeId=_ref3.treeId,props=(0,objectWithoutProperties.Z)(_ref3,_excluded),setMapData=(0,react.useContext)(services_context.h).setMapData,getNodeAncestorsRecursive=function getNodeAncestorsRecursive(node,list){node&&(stratificationNodes[node.parent]&&getNodeAncestorsRecursive(stratificationNodes[node.parent],list),list.push(node))},getNodeAncestors=function getNodeAncestors(nodeId){var bcrumb=[];return getNodeAncestorsRecursive(stratificationNodes[nodeId],bcrumb),bcrumb},updateMapMarkers=function updateMapMarkers(currentNodesIds){var _stratificationNodes,flatenListNode=function getListNodeToshow(currentNodesIds){if(currentNodesIds&&currentNodesIds[0]&&currentNodesIds[0]in listNode)return currentNodesIds.map((function(nodeId){return listNode[nodeId]})).flat().reduce((function(acc,node){return acc.concat(node)}),[])}(currentNodesIds)||[null===(_stratificationNodes=stratificationNodes)||void 0===_stratificationNodes?void 0:_stratificationNodes[currentNodesIds]];flatenListNode&&flatenListNode[0]&&currentNodesIds&&(setMapData(treeId,{currentNodeId:1==currentNodesIds.length?currentNodesIds[0]:"root",nodes:flatenListNode,mapNodes:flatenListNode}),props.setBreadcrumb(getNodeAncestors(currentNodesIds[0])))},showNewStratificationOnMap=function showNewStratificationOnMap(nodeIds){updateMapMarkers([].concat(nodeIds))},handleMarkerClick=function handleMarkerClick(marker){marker&&marker._id&&marker.lat&&marker.lng&&showNewStratificationOnMap(marker._id)};return react.Children.map(children,(function(child){var childProps=(0,objectSpread2.Z)((0,objectSpread2.Z)({},child.props),{},{handleMarkerClick:handleMarkerClick,showNewStratificationOnMap:showNewStratificationOnMap,getNodeAncestors:getNodeAncestors,setBreadcrumb:props.setBreadcrumb});return react.isValidElement(child)?react.cloneElement(child,childProps):child}))}var mapContentKey="MAP_KEY_1";function MapContent(_ref4){var widget=_ref4.widget;(0,useNodeNotification.default)({widgetId:widget._id,treeId:widget.tree._id});var _useState3=(0,react.useState)((function(){return new workerSetup.default(map_worker.default)})),mapWorkerInstance=(0,slicedToArray.Z)(_useState3,1)[0],_useContext2=(0,react.useContext)(services_context.h),setMapData=_useContext2.setMapData,other=(0,objectWithoutProperties.Z)(_useContext2,_excluded2);console.log("====== other",other);var _useLoadScript=(0,esm.Db)({googleMapsApiKey:"AIzaSyCzNqa1T_iZxs-eNClr8wyDIYzu3cdQs4Y"}),isLoaded=_useLoadScript.isLoaded,loadError=_useLoadScript.loadError,_useState5=(0,react.useState)((function(){return{lat:33.58831,lng:-7.61138}})),center=(0,slicedToArray.Z)(_useState5,1)[0],_useState7=(0,react.useState)(),_useState8=(0,slicedToArray.Z)(_useState7,2),rootNodesIds=_useState8[0],setRootNodesIds=_useState8[1],_React$useReducer=react.useReducer((function(state,action){return action}),[]),_React$useReducer2=(0,slicedToArray.Z)(_React$useReducer,2),breadcrumb=_React$useReducer2[0],dispatchBreadcrumb=_React$useReducer2[1],handleListStratification=function handleListStratification(selfParentTree){selfParentTree&&Array.isArray(selfParentTree)&&(listNode={},stratificationNodes={},selfParentTree.forEach((function(node){var parentId=node.parent||"root";if(listNode[parentId]||(listNode[parentId]=[]),node.location){var lat=node.location.coordinates[1],lng=node.location.coordinates[0];stratificationNodes[node._id]=(0,objectSpread2.Z)((0,objectSpread2.Z)({},node),{},{lat:lat,lng:lng}),listNode[parentId].push((0,objectSpread2.Z)((0,objectSpread2.Z)({},node),{},{lat:lat,lng:lng}))}})),function setInitialScope(stratificationTree){mapWorkerInstance.postMessage({action:"getNodesWithoutParent",stratificationTree:stratificationTree}),mapWorkerInstance.onmessage=function(e){var _e$data=e.data,action=_e$data.action,nodesWithoutParent=_e$data.nodesWithoutParent;if("getNodesWithoutParent"===action){var InitialRootNodesIds=nodesWithoutParent[0]?nodesWithoutParent:stratificationTree&&stratificationTree[0]&&stratificationTree[0]._id;setRootNodesIds(InitialRootNodesIds)}}}(selfParentTree))};return(0,react.useEffect)((function(){(0,node.z)(widget.tree._id).then((function(data){handleListStratification(data);var nodesData=data.map((function(node){return node.location?(0,objectSpread2.Z)((0,objectSpread2.Z)({},node),{},{lng:node.location.coordinates[0],lat:node.location.coordinates[1]}):node}));console.log("========= nodesData",nodesData),setMapData(widget.tree._id,{fati:"mmmmmm"})}))}),[]),loadError?(0,jsx_runtime.jsx)("div",{children:"Map cannot be loaded right now, sorry."}):(0,jsx_runtime.jsxs)("div",{style:{height:"100%"},children:[(0,jsx_runtime.jsx)(MapHOC,{setBreadcrumb:dispatchBreadcrumb,treeId:widget.tree._id,children:(0,jsx_runtime.jsx)(MapBreadcrumb,{rootNodesIds:rootNodesIds,breadcrumb:breadcrumb})}),isLoaded?(0,jsx_runtime.jsx)(esm.b6,{id:"startification-map",mapContainerStyle:containerStyle,center:center,zoom:5,options:defaultMapOptions,children:(0,jsx_runtime.jsx)(MapHOC,{setBreadcrumb:dispatchBreadcrumb,treeId:widget.tree._id,children:(0,jsx_runtime.jsx)(MapComponents,{treeId:widget.tree._id})})},mapContentKey):(0,jsx_runtime.jsx)("div",{className:"loading"})]})}MapContent.__docgenInfo={description:"",methods:[],displayName:"MapContent"};var Map=MapContent;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Widget/Map/Map.jsx"]={name:"MapContent",docgenInfo:MapContent.__docgenInfo,path:"src/components/Widget/Map/Map.jsx"})},"./src/components/Widget/Map/components/PolygonWrapper.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_react_google_maps_api__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@react-google-maps/api/dist/esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),options={fillOpacity:.4,strokeColor:"#000",strokeOpacity:1,strokeWeight:1};function PolygonWrapper(props){var node=props.node,handleMarkerClick=props.handleMarkerClick,_useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(node.fillColor||"#000"),_useState2=(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(_useState,2),fillColor=_useState2[0],setFillColor=_useState2[1],polygonOptions=(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},options),{},{fillColor:fillColor}),coords=node.polygonCoordinates.map((function(l){return{lat:l[1],lng:l[0]}}));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_4__.mg,{paths:coords,onClick:function onClick(){handleMarkerClick(node)},onMouseOver:function handleMouseOver(){setFillColor("#e9e7a8")},onMouseOut:function handleMouseOut(){setFillColor(node.fillColor||"#000")},options:polygonOptions})}PolygonWrapper.__docgenInfo={description:"",methods:[],displayName:"PolygonWrapper",props:{node:{type:{name:"object"},required:!1,description:""},handleMarkerClick:{type:{name:"func"},required:!1,description:""}}},__webpack_exports__.default=PolygonWrapper,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Widget/Map/components/PolygonWrapper.jsx"]={name:"PolygonWrapper",docgenInfo:PolygonWrapper.__docgenInfo,path:"src/components/Widget/Map/components/PolygonWrapper.jsx"})},"./src/components/Widget/Map/map.worker.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function __WEBPACK_DEFAULT_EXPORT__(){onmessage=function onmessage(e){var _e$data=e.data,action=_e$data.action,stratificationTree=_e$data.stratificationTree;if("getNodesWithoutParent"===action){var nodesWithoutParent=getNodesWithoutParent(stratificationTree);postMessage({action:action,nodesWithoutParent:nodesWithoutParent})}};var getNodesWithoutParent=function getNodesWithoutParent(stratificationTree){var nodesIds=stratificationTree.map((function(_ref){return _ref._id}));return stratificationTree.filter((function(_ref2){var parent=_ref2.parent;return!nodesIds.includes(parent)})).map((function(_ref3){return _ref3.parent}))}}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return __WEBPACK_DEFAULT_EXPORT__}})},"./src/components/Widget/Map/workerSetup.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return WebWorker}});var _Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js"),_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),WebWorker=(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__.Z)((function WebWorker(worker){(0,_Users_lidrissi_Documents_um6p_dbr_ui_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__.Z)(this,WebWorker);var code=worker.toString(),blob=new Blob(["(".concat(code,")()")]);return new Worker(URL.createObjectURL(blob))}))},"./src/components/Widget/Tree/useNodeNotification.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),constants_resources__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/resources.js"),socket_io_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/socket.io-client/build/esm/index.js"),_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/services/NotificationService.js"),_services_context__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/services/context.js");__webpack_exports__.default=function useNodeNotification(_ref){var _map$id,_map$id2,subscription,socket,widgetId=_ref.widgetId,treeId=_ref.treeId,_useContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_services_context__WEBPACK_IMPORTED_MODULE_4__.h),map=_useContext.map,widgets=_useContext.dashboard.widgets,setMapData=_useContext.setMapData,id=treeId||widgetId,currentNodeId=(null===(_map$id=map[id])||void 0===_map$id?void 0:_map$id.currentNodeId)||null,data=(null===(_map$id2=map[id])||void 0===_map$id2?void 0:_map$id2.data)||[];(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return subscription=_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.getNotification().subscribe((function(notification){handleNotification(widgets,notification,data)})),createSocket(),function(){subscription&&subscription.unsubscribe()}}),[data,widgets]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var _Object$keys;if(currentNodeId){var node=data.find((function(_ref2){var _id=_ref2._id;return currentNodeId==_id}));if(node){var appParamsValue={};for(var key in node.metaData||{})appParamsValue[key]=node.metaData[key]+"".split(",").map((function(i){return i.trim()}))[0];node.applicationParam&&(appParamsValue[node.applicationParam]=node.name),!((null===(_Object$keys=Object.keys(appParamsValue))||void 0===_Object$keys?void 0:_Object$keys.length)>0)||treeId&&widgets[treeId]||notifyAllWidgets({fromWidgetKey:widgetId,appParamsValue:appParamsValue})}}}),[currentNodeId]);var createSocket=function createSocket(widgets){return(socket=(0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__.ZP)(constants_resources__WEBPACK_IMPORTED_MODULE_1__.gs,{path:"/back/socket",transports:["websocket","polling"]})).on("connect",(function(){_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.registerWidgetSocket(socket)})),socket.on("RECEIVE_NOTIFICATION",(function(notification){notification.widgetSocketId!=socket.id&&(_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.isWidgetRegistredInSocketPool(notification.widgetSocketId)||handleNotification(widgets,notification.widgetNotification,data))})),socket},handleNotification=function handleNotification(widgets,notification,nodes){if(!(widgets&&treeId&&widgets[treeId])&&notification.appParamsValue&&notification.fromWidgetKey!=widgetId){var appParams=notification.appParamsValue,selectedNodes=nodes.filter((function(node){var commonKeys=Object.keys(appParams).filter((function(key){return node.metaData&&node.metaData[key]}));return(null==commonKeys?void 0:commonKeys.length)>0&&commonKeys.every((function(key){return node.metaData[key]&&(""==appParams[key]||node.metaData[key].split(",").map((function(item){return item.trim()})).indexOf(appParams[key]+"")>-1)}))}));(null==selectedNodes?void 0:selectedNodes.length)>0&&setMapData(treeId||widgetId,{currentNodeId:1==selectedNodes.length?selectedNodes[0]._id:"root",mapNodes:selectedNodes,nodes:selectedNodes})}},notifyAllWidgets=function notifyAllWidgets(widgetNotification){_services_NotificationService__WEBPACK_IMPORTED_MODULE_3__.O.sendNotification(widgetNotification),socket||(socket=createSocket(widgets)),socket.emit("SEND_NOTIFICATION",{widgetSocketId:socket.id,widgetNotification:widgetNotification})};return{currentNodeId:currentNodeId,notification:!0}}},"./node_modules/react-query/es/index.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){function scheduleMicrotask(callback){Promise.resolve().then(callback).catch((function(error){return setTimeout((function(){throw error}))}))}var NotifyManager=function(){function NotifyManager(){this.queue=[],this.transactions=0,this.notifyFn=function(callback){callback()},this.batchNotifyFn=function(callback){callback()}}var _proto=NotifyManager.prototype;return _proto.batch=function batch(callback){this.transactions++;var result=callback();return this.transactions--,this.transactions||this.flush(),result},_proto.schedule=function schedule(callback){var _this=this;this.transactions?this.queue.push(callback):scheduleMicrotask((function(){_this.notifyFn(callback)}))},_proto.batchCalls=function batchCalls(callback){var _this2=this;return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];_this2.schedule((function(){callback.apply(void 0,args)}))}},_proto.flush=function flush(){var _this3=this,queue=this.queue;this.queue=[],queue.length&&scheduleMicrotask((function(){_this3.batchNotifyFn((function(){queue.forEach((function(callback){_this3.notifyFn(callback)}))}))}))},_proto.setNotifyFunction=function setNotifyFunction(fn){this.notifyFn=fn},_proto.setBatchNotifyFunction=function setBatchNotifyFunction(fn){this.batchNotifyFn=fn},NotifyManager}(),notifyManager=new NotifyManager,unstable_batchedUpdates=__webpack_require__("./node_modules/react-dom/index.js").unstable_batchedUpdates;notifyManager.setBatchNotifyFunction(unstable_batchedUpdates);console;!function setLogger(newLogger){newLogger}(console)},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":function(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectWithoutProperties}});var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=(0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__.Z)(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}},"./src/components/Widget/Map/mapStyles.json":function(module){module.exports=JSON.parse('[{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","stylers":[{"visibility":"on"}]}]')}}]);