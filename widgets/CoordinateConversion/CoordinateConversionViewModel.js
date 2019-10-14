// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","dojo/_base/config","../../Graphic","../../core/asyncUtils","../../core/Collection","../../core/Error","../../core/Evented","../../core/Handles","../../core/has","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/Point","../../geometry/projection","../../geometry/SpatialReference","../../portal/support/geometryServiceUtils","../../symbols/PictureMarkerSymbol","./support/Conversion","./support/coordinateConversionUtils","./support/formatUtils","../support/GoTo"],function(e,t,o,n,r,i,a,s,c,l,u,p,h,d,v,f,m,_,g,y,w,C,b,P,S,L,M){var O={default:"default",crosshair:"crosshair"},G=new g([0,0,500]),U=window.location.pathname+"__coordinateConversionWidgetState",j=v.getLogger("esri.widgets.CoordinateConversion.CoordinateConversionViewModel"),A={conversions:"conversions",formats:"formats",view:"view",viewChange:"view-change"},x=0,F=[];return function(t){function p(o){var n=t.call(this,o)||this;return n._conversionPromise=null,n._handles=new h,n._locationGraphic=null,n._locale=a.locale,n._pointerCount=0,n.conversions=new l,n.formats=new l(L.generateDefaultFormats()),n.formatterAvailable=!1,n.geometryServicePromise=null,n.requestDelay=300,n.locationSymbol=new b({url:e.toUrl(d("trident")?"../../images/search/search-symbol-32.png":"../../images/search/search-symbol-32.svg"),size:12,width:12,height:12}),n.view=null,n._instanceNumber=x,x++,n._saveWidgetState=n._saveWidgetState.bind(n),n._handleFormatChange=n._handleFormatChange.bind(n),n._handleConversionChange=n._handleConversionChange.bind(n),n._handleViewChange=n._handleViewChange.bind(n),n._onClick=n._onClick.bind(n),n._onPointerMove=n._onPointerMove.bind(n),n._onPointerDown=n._onPointerDown.bind(n),n._onPointerUp=n._onPointerUp.bind(n),n}return o(p,t),p.prototype.initialize=function(){var e=this;if(this._loadWidgetState(),this.formats.forEach(function(t){t.viewModel=e,e._handles.add(t.watch("currentPattern",e._saveWidgetState),t.name)}),this._handles.add(this.conversions.on("change",this._handleConversionChange),A.conversions),this._handles.add(this.formats.on("change",this._handleFormatChange),A.formats),this._handles.add(m.init(this,"view.map",function(t){e.geometryServicePromise=c.safeCast(C.create(e.get("view.map.portalItem")))}),A.viewChange),y.isSupported()?y.load().then(function(){e.formatterAvailable=!0}).catch(function(t){j.error(new u("coordinate-conversion:projection-load-failed","Failed to load the projection module.",{error:t})),e.formatterAvailable=!1}).then(function(){return e._handles.add(m.init(e,"view",e._handleViewChange),A.viewChange)}):(this.formatterAvailable=!1,this._handles.add(m.init(this,"view",this._handleViewChange),A.viewChange)),0===this.conversions.length){var t=this.formats.find(function(e){return"xy"===e.name})||this.formats.getItemAt(0);this.conversions.add(new P({format:t}))}},p.prototype.destroy=function(){this._handles.removeAll(),this._cleanUpView(this.view),this.view=null},Object.defineProperty(p.prototype,"currentLocation",{get:function(){return this._get("currentLocation")||null},set:function(e){this._set("currentLocation",e),this._updateConversions()},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"mode",{get:function(){return this._get("mode")||"live"},set:function(e){switch(e){case"capture":this.currentLocation=null,this._startCaptureMode(),this._set("mode",e);break;case"live":this._startLiveMode(),this._set("mode",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"state",{get:function(){var e=this.get("view");return this.get("view.ready")?"ready":e?"loading":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"waitingForConversions",{get:function(){return null!=this._conversionPromise},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"_debouncedConvert",{get:function(){return f.debounce(function(e,t,o){return f.eachAlways(e.map(function(e){return e.convert(t,o)}))},this.requestDelay)},enumerable:!0,configurable:!0}),p.prototype.setLocation=function(e){if(this.view.graphics.remove(this._locationGraphic),e){var t=e.clone();t.hasZ&&(t.z=void 0),this._locationGraphic=new s({geometry:t,symbol:this.get("locationSymbol")}),this.view.graphics.add(this._locationGraphic)}},p.prototype.convert=function(e,t){return S.isValidPoint(t)?f.resolve().then(function(){return e.convert(t)}):f.reject(new u("coordinate-conversion:invalid-point","Invalid point cannot be converted.",{point:t}))},p.prototype.goToLocation=function(e){if(this.get("view.clippingArea")||this.get("view.map.basemap.baseLayers.length")>0){var t=this.get("view.clippingArea")||this.view.map.basemap.baseLayers.getItemAt(0).fullExtent;return t?t.contains(e)?this.callGoTo({target:e}):f.reject(new u("coordinate-conversion:go-to-failed","Point outside basemap extent.",{point:e})):this.callGoTo({target:e})}return this.callGoTo({target:e})},p.prototype.pause=function(){this.currentLocation=null,this._handles.remove(A.view),this.view&&(this.view.cursor=O.default,this.view.graphics.remove(this._locationGraphic))},p.prototype.previewConversion=function(e,t){return void 0===t&&(t=this.currentLocation||G),this._convertMany([e],t).then(function(t){return e.displayCoordinate})},p.prototype.resume=function(){"capture"===this.mode?this._startCaptureMode():this._startLiveMode()},p.prototype.reverseConvert=function(e,t,o){return void 0===o&&(o=this.get("view.spatialReference")||w.WGS84),t.reverseConvert(e)},p.prototype.updateConversions=function(e,t){return i(this,void 0,void 0,function(){return r(this,function(o){return t&&t.type&&"point"===t.type?[2,this._convertMany(e,t).then(function(e){return e.client.concat(e.server)})]:(this._clearConversions(this.conversions),[2,f.reject(new u("coordinate-conversion:invalid-input-point","Point is invalid, conversions cannot be updated.",{point:t}))])})})},p.prototype._cleanUpView=function(e){e&&(e.graphics.remove(this._locationGraphic),this._handles.remove(A.view),e.cursor=O.default)},p.prototype._clearConversions=function(e){e.forEach(function(e){e.position={location:null,coordinate:null}})},p.prototype._convertMany=function(e,t){var o=this,n=e.reduce(function(e,o){return e[o.format.getConversionStrategy(t)].push(o),e},{client:[],server:[]}),r=n.client,i=n.server,a=f.all(r.map(function(e){return e.format.convert(t).then(function(t){return e.position=t,e}).catch(function(t){e.position=null})})),s=function(e){return e?(o._conversionPromise=null,o.notifyChange("waitingForConversions"),e.map(function(e,t){var o=i[t];return e.error?(o.position=null,o):(o.position=e.value,o)})):[]};return this._conversionPromise=i.length>0?this._debouncedConvert(i.map(function(e){return e.format}),t).then(s,s):f.resolve([]),this.notifyChange("waitingForConversions"),f.all([a,this._conversionPromise]).then(function(e){return{client:e[0],server:e[1]}})},p.prototype._handleConversionChange=function(e){var t=this;e.added.forEach(function(e){var o=e.format;o.viewModel=t,t.currentLocation&&(t._set("waitingForConversions",!0),t.convert(o,t.currentLocation).then(function(o){e.position=o,t._set("waitingForConversions",!1)}))}),this._saveWidgetState()},p.prototype._handleFormatChange=function(e){var t=this;e.added.forEach(function(e){t._handles.add(e.watch("currentPattern",t._saveWidgetState),e.name),e.viewModel=t}),e.removed.forEach(function(e){e.viewModel=null,t._handles.remove(e.name)})},p.prototype._loadWidgetState=function(){if(0===this._instanceNumber)try{var e=JSON.parse(localStorage.getItem(U));e&&(F=e)}catch(e){j.error(new u("coordinate-conversion:invalid-local-storage-json","Could not read from localStorge.",{error:e}))}this._setWidgetState()},p.prototype._startCaptureMode=function(){this._handles.remove(A.view),this.view&&(this.view.cursor=O.crosshair,this.currentLocation&&this.setLocation(this.currentLocation),this._handles.add(this.view.on("click",this._onClick),A.view))},p.prototype._startLiveMode=function(){this._pointerCount=0,this._handles.remove(A.view),this.view&&(this.view.cursor=O.default,this.view.graphics.remove(this._locationGraphic),this._handles.add([this.view.on("pointer-down",this._onPointerDown),this.view.on("pointer-up",this._onPointerUp),this.view.on("pointer-move",this._onPointerMove)],A.view))},p.prototype._handleViewChange=function(e,t){t&&t!==e&&this._cleanUpView(t),e&&("capture"===this.mode&&this._startCaptureMode(),this._startLiveMode())},p.prototype._onClick=function(e){if(0===e.button){var t=this.view.toMap(e),o=t&&t.normalize();this.setLocation(o),this.currentLocation=o}},p.prototype._onPointerDown=function(e){var t=e.pointerType;if(this._pointerCount++,("touch"===t||"pen"===t)&&1===this._pointerCount){var o=this.view.toMap(e);this.currentLocation=o&&o.normalize()}},p.prototype._onPointerMove=function(e){if("mouse"===e.pointerType||1===this._pointerCount){var t=this.view.toMap(e);this.currentLocation=t&&t.normalize()}},p.prototype._onPointerUp=function(e){this._pointerCount--},p.prototype._setWidgetState=function(){var e=this,t=F[this._instanceNumber];if(!t)return void(F[this._instanceNumber]={formats:[],locale:this._locale});try{t.formats.forEach(function(o){var n=e.formats.find(function(e){return e.name===o.name});n&&t.locale===e._locale&&o.currentPattern&&(n.currentPattern=o.currentPattern),n&&o.index>=0&&e.conversions.add(new P({format:n}))})}catch(e){j.warn(new u("coordinate-conversion:local-storage-read-error","Could not get widget state from stored JSON.",{error:e})),F[this._instanceNumber]={formats:[],locale:this._locale}}},p.prototype._saveWidgetState=function(){var e=this._toJSON();F[this._instanceNumber]={formats:e,locale:this._locale};try{localStorage.setItem(U,JSON.stringify(F))}catch(e){j.error(new u("coordinate-conversion:local-storage-write-error","Could not write to localStorage.",{error:e}))}},p.prototype._updateConversions=function(){return i(this,void 0,void 0,function(){var e;return r(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,this.updateConversions(this.conversions.toArray(),this.currentLocation)];case 1:return t.sent(),[3,3];case 2:return e=t.sent(),[3,3];case 3:return[2]}})})},p.prototype._toJSON=function(){var e=this;return this.formats.filter(function(e){var t=e.name;return"xy"===t||"basemap"===t||S.isSupportedNotation(t)}).map(function(t){return{name:t.name,currentPattern:t.currentPattern,defaultPattern:t.defaultPattern,index:e.conversions.findIndex(function(e){return e.format===t})}}).sort(function(e,t){return e.index-t.index}).toArray()},n([_.property()],p.prototype,"conversions",void 0),n([_.property({type:g})],p.prototype,"currentLocation",null),n([_.property()],p.prototype,"formats",void 0),n([_.property()],p.prototype,"mode",null),n([_.property()],p.prototype,"requestDelay",void 0),n([_.property({dependsOn:["view","view.ready"],readOnly:!0})],p.prototype,"state",null),n([_.property()],p.prototype,"locationSymbol",void 0),n([_.property({readOnly:!0})],p.prototype,"waitingForConversions",null),n([_.property()],p.prototype,"view",void 0),n([_.property({readOnly:!0,dependsOn:["requestDelay"]})],p.prototype,"_debouncedConvert",null),n([_.property()],p.prototype,"reverseConvert",null),p=n([_.subclass("esri.widgets.CoordinateConversion.CoordinateConversionViewModel")],p)}(_.declared(M.GoToMixin(p.EventedAccessor)))});