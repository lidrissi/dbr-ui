"use strict";(self.webpackChunkdbr_ui=self.webpackChunkdbr_ui||[]).push([[579],{"./src/components/Filter/SelectOptionFilter.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Filter_SelectOptionFilter}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),noQueryDatasource=function noQueryDatasource(type){return"csv_file"===type},react=__webpack_require__("./node_modules/react/index.js"),reactstrap_modern=__webpack_require__("./node_modules/reactstrap/dist/reactstrap.modern.js"),datasourceManager=__webpack_require__("./src/services/datasource/datasourceManager.js"),NotificationService=__webpack_require__("./src/services/NotificationService.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),SelectOptionFilter=(0,react.forwardRef)((function(props,ref){var _tag$configuration2,_tag$configuration2$d,_tag$configuration2$d2,_jsx2,subscription,tag=props.tag,onSendNotification=props.onSendNotification,notification={appParamsValue:{}},_useState=(0,react.useState)(!1),_useState2=(0,slicedToArray.Z)(_useState,2),isOpenSizingLg=_useState2[0],setIsOpenSizingLg=_useState2[1],_useState3=(0,react.useState)("ALL"),_useState4=(0,slicedToArray.Z)(_useState3,2),selectedOption=_useState4[0],setSelectedOption=_useState4[1],_useState5=(0,react.useState)(tag.configuration.options||[]),_useState6=(0,slicedToArray.Z)(_useState5,2),options=_useState6[0],setOptions=_useState6[1],_useState7=(0,react.useState)(!1),_useState8=(0,slicedToArray.Z)(_useState7,2),loading=_useState8[0],setLoading=_useState8[1];(0,react.useImperativeHandle)(ref,(function(){return{resetSelection:resetSelection}}));var fetchFilter=function(){var _ref=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){var paramsValue,datasource,result,dt,values,_args=arguments;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(paramsValue=_args.length>0&&void 0!==_args[0]?_args[0]:{},(datasource=(0,objectSpread2.Z)({},tag.configuration.dataSource)).query||noQueryDatasource(datasource.type)){_context.next=4;break}return _context.abrupt("return");case 4:return setLoading(!0),datasource.query&&(datasource.query.paramsValue=paramsValue),_context.next=8,(0,datasourceManager.f)(datasource);case 8:result=_context.sent,dt=result,values=Object.keys(dt).map((function(k){return dt[k]})).filter((function(option){return null!=option})),setOptions(values),tag.configuration.options=values,setLoading(!1);case 14:case"end":return _context.stop()}}),_callee)})));return function fetchFilter(){return _ref.apply(this,arguments)}}();(0,react.useEffect)((function(){return subscription=NotificationService.O.getNotification().subscribe((function(widgetNotification){var _tag$configuration,_tag$configuration$da,_tag$configuration$da2,_tag$configuration$da3;if(changeCurrentSelection(widgetNotification.appParamsValue),(null==tag||null===(_tag$configuration=tag.configuration)||void 0===_tag$configuration||null===(_tag$configuration$da=_tag$configuration.dataSource)||void 0===_tag$configuration$da||null===(_tag$configuration$da2=_tag$configuration$da.query)||void 0===_tag$configuration$da2||null===(_tag$configuration$da3=_tag$configuration$da2.urlParams)||void 0===_tag$configuration$da3?void 0:_tag$configuration$da3.length)>0){var urlParams=tag.configuration.dataSource.query.urlParams,oldValues=urlParams.map((function(key){return notification.appParamsValue[key]||""})),newValues=urlParams.map((function(key){return widgetNotification.appParamsValue[key]||""}));JSON.stringify(oldValues)!=JSON.stringify(newValues)&&fetchFilter(widgetNotification.appParamsValue)}else setLoading(!1),setOptions(tag.configuration.options);notification=(0,objectSpread2.Z)((0,objectSpread2.Z)({},widgetNotification),{},{appParamsValue:(0,objectSpread2.Z)({},widgetNotification.appParamsValue)})})),function(){subscription.unsubscribe()}}),[]),(0,react.useEffect)((function(){fetchFilter(notification),changeCurrentSelection(NotificationService.B)}),[null===(_tag$configuration2=tag.configuration)||void 0===_tag$configuration2||null===(_tag$configuration2$d=_tag$configuration2.dataSource)||void 0===_tag$configuration2$d||null===(_tag$configuration2$d2=_tag$configuration2$d.query)||void 0===_tag$configuration2$d2?void 0:_tag$configuration2$d2._id]);var changeCurrentSelection=function changeCurrentSelection(appParamsValue){var _tag$configuration$ap,_Object$keys;0!=(null===(_tag$configuration$ap=tag.configuration.appParam)||void 0===_tag$configuration$ap?void 0:_tag$configuration$ap.length)&&0!=(null===(_Object$keys=Object.keys(appParamsValue))||void 0===_Object$keys?void 0:_Object$keys.length)&&Object.keys(appParamsValue).forEach((function(key){var tagAppParam=tag.configuration.appParam.find((function(_ref2){var value=_ref2.value;return key==value}));if(tagAppParam){var selectedOption=tag.configuration.options.find((function(option){return option[tagAppParam.label]==appParamsValue[key]}));selectedOption&&setSelectedOption(selectedOption[tag.configuration.serviceParam]||Object.values(selectedOption)[0])}}))},dispatchFilterNotification=function dispatchFilterNotification(option){var _tag$configuration3;if(null!=tag&&null!==(_tag$configuration3=tag.configuration)&&void 0!==_tag$configuration3&&_tag$configuration3.appParam){var appParamsValue=[];(tag.configuration.appParam||[]).forEach((function(_ref3){var label=_ref3.label,value=_ref3.value;appParamsValue[value]=option[label]||""}));var newNotification={appParamsValue:appParamsValue,fromWidgetKey:""};NotificationService.O.sendNotification(newNotification),onSendNotification(newNotification)}},resetSelection=function resetSelection(){setSelectedOption("ALL")};return(0,jsx_runtime.jsxs)(reactstrap_modern.Kb,{isOpen:isOpenSizingLg,toggle:function toggle(){return setIsOpenSizingLg(!isOpenSizingLg)},children:[(0,jsx_runtime.jsx)(reactstrap_modern.Z_,(_jsx2={tag:"span",caret:!0,size:"xs",className:"w-100"},(0,defineProperty.Z)(_jsx2,"className","d-flex align-items-center"),(0,defineProperty.Z)(_jsx2,"children",(0,jsx_runtime.jsx)("span",{className:"truncate filter-value",title:selectedOption,children:selectedOption})),_jsx2)),(0,jsx_runtime.jsx)(reactstrap_modern.h_,{children:!1===loading?options&&options.length>0?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(reactstrap_modern.hP,{onClick:props.onReset,children:"ALL"}),(0,jsx_runtime.jsx)(reactstrap_modern.hP,{divider:!0,className:"mt-1 mb-1"}),options.map((function(option,index){return(0,jsx_runtime.jsx)(reactstrap_modern.hP,{onClick:function onClick(){return function selectOption(option){setSelectedOption(option[tag.configuration.serviceParam]||Object.values(option)[0]),dispatchFilterNotification(option)}(option)},children:option[tag.configuration.serviceParam]||Object.values(option)[0]},index)}))]}):(0,jsx_runtime.jsx)(reactstrap_modern.hP,{children:"No options found"}):(0,jsx_runtime.jsx)(reactstrap_modern.hP,{children:"Loading ..."})})]})}));SelectOptionFilter.__docgenInfo={description:"",methods:[],displayName:"SelectOptionFilter"};var Filter_SelectOptionFilter=SelectOptionFilter;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Filter/SelectOptionFilter.jsx"]={name:"SelectOptionFilter",docgenInfo:SelectOptionFilter.__docgenInfo,path:"src/components/Filter/SelectOptionFilter.jsx"})}}]);