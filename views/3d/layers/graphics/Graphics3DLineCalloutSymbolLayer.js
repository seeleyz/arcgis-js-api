// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../core/screenUtils","./ElevationAligners","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./symbolComplexity","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Util","../../webgl-engine/materials/LineCalloutMaterial"],function(e,t,r,a,n,i,o,l,s,c,p,u,d,f,h,m){Object.defineProperty(t,"__esModule",{value:!0});var v,y,g=h.VertexAttrConstants,O=function(e){function t(t,r){var a=e.call(this,t,null,r,!0)||this;a._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!1};var n=a._getStageIdHint();return a._createMaterialsAndAddToStage(a._context.stage,n),a.resolve(),a}return r(t,e),t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(u.ModelContentType.MATERIAL,this._material.id),this._material=null)},t.prototype.perInstanceMaterialParameters=function(e){var t=this.materialParameters;return t.screenOffset=e.screenOffset||[0,0],t.centerOffsetUnits=e.centerOffsetUnits||"world",t},Object.defineProperty(t.prototype,"materialParameters",{get:function(){var e=this.symbol,t=e.callout,r=a.toUnitRGBA(t.color);r[3]*=this._getLayerOpacity();var i=n.pt2px(t.size||0),o=null;if(e.verticalOffset){var l=e.verticalOffset,s=l.screenLength,c=l.minWorldLength,p=l.maxWorldLength;o={screenLength:n.pt2px(s),minWorldLength:c||0,maxWorldLength:null!=p?p:1/0}}var u=t.border&&t.border.color?a.toUnitRGBA(t.border.color):null,d=e.symbolLayers.getItemAt(0),f="object"===d.type,h="label-3d"===e.type,m=!f,v=f?0:void 0,y=h;return{color:r,size:i,verticalOffset:o,screenSizePerspective:this._context.screenSizePerspectiveEnabled?this._context.sharedResources.screenSizePerspectiveSettings:null,screenOffset:[0,0],centerOffsetUnits:"world",borderColor:u,occlusionTest:m,shaderPolygonOffset:v,depthHUDAlignStart:y,slicePlaneEnabled:this._context.slicePlaneEnabled}},enumerable:!0,configurable:!0}),t.prototype._createMaterialsAndAddToStage=function(e,t){this._material=new m(this.materialParameters,t+"_lineCallout_common"),e.add(u.ModelContentType.MATERIAL,this._material)},t.prototype._defaultElevationInfoNoZ=function(){return x},t.prototype.createGraphics3DGraphic=function(e){var t=e.renderingInfo,r=e.graphic,a=this.getGraphicElevationContext(r,t.elevationOffset||0),n=t.symbol,i="on-the-ground"===this._elevationContext.mode&&!n.symbolLayers.some(function(e){return"object"===e.type||"text"===e.type});if("label-3d"!==n.type&&i)return null;var o=c.computeCentroid(r.geometry);if(null==o)return null;var l="graphic"+r.uid;return this._createAs3DShape(r,o,a,t,l,r.uid)},t.prototype.layerOpacityChanged=function(){return this._material.setParameterValues(this.materialParameters),!0},t.prototype.layerElevationInfoChanged=function(e,t,r){var a=this,n=this._elevationContext.mode;return(r===n||"on-the-ground"!==r&&"on-the-ground"!==n)&&(e.forEach(function(e){var r=t(e);r&&a.updateGraphicElevationContext(e.graphic,r)}),!0)},t.prototype.slicePlaneEnabledChanged=function(e,t){return this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),!0},t.prototype.pixelRatioChanged=function(e,t){return!0},t.prototype.getGraphicElevationContext=function(t,r){void 0===r&&(r=0);var a=e.prototype.getGraphicElevationContext.call(this,t);return a.addOffsetRenderUnits(r),a},t.prototype.updateGraphicElevationContext=function(e,t){var r=this.getGraphicElevationContext(e,t.metadata.elevationOffset);t.elevationContext.set(r),t.needsElevationUpdates=l.needsElevationUpdates2D(r.mode)},t.prototype.computeComplexity=function(){return{primitivesPerFeature:2,primitivesPerCoordinate:0,memory:p.emptySymbolComplexity.memory}},t.prototype.createVertexData=function(e){var t,r=e.translation,a=e.centerOffset;if(!r&&!a)return b;var n=r?{size:3,data:[r[0],r[1],r[2]]}:b[g.POSITION],i=a?{size:4,data:[a[0],a[1],a[2],a[3]]}:b[g.AUXPOS1];return t={},t[g.POSITION]=n,t[g.NORMAL]=b[g.NORMAL],t[g.AUXPOS1]=i,t},t.prototype.getOrCreateMaterial=function(e,t){var r=this.perInstanceMaterialParameters(e),a=m.uniqueMaterialIdentifier(r);if(a===this._material.uniqueMaterialIdentifier)return{material:this._material,isUnique:!1};if(e.materialCollection){var n=e.materialCollection.getMaterial(a);return n||(n=new m(r,t+"_lineCallout_shared"),e.materialCollection.addMaterial(a,n)),{material:n,isUnique:!1}}var n=new m(r,t+"_lineCallout_unique");return{material:n,isUnique:!0}},t.prototype._createAs3DShape=function(e,t,r,a,n,s){var c=new f(this.createVertexData(a),_,f.DefaultOffsets,"point"),p=new d(c,n),u=[p],h=this.getOrCreateMaterial(a,n),m=l.createStageObjectForPoint(this._context,t,u,[h.material],null,null,r,n,this._context.layer.uid,s,!0);if(null===m)return null;var v=i.perObjectElevationAligner,y=new o(this,m.object,u,h.isUnique?[h.material]:null,null,v,r);return y.metadata={elevationOffset:a.elevationOffset||0},y.alignedTerrainElevation=m.terrainElevation,y.needsElevationUpdates=l.needsElevationUpdates2D(r.mode),l.extendPointGraphicElevationContext(y,t,this._context.elevationProvider),y},t}(s.Graphics3DSymbolLayer);t.Graphics3DLineCalloutSymbolLayer=O;var b=(v={},v[g.POSITION]={size:3,data:[0,0,0]},v[g.NORMAL]={size:3,data:[0,0,1]},v[g.AUXPOS1]={size:4,data:[0,0,0,1]},v),C=new Uint32Array([0]),_=(y={},y[g.POSITION]=C,y[g.NORMAL]=C,y[g.AUXPOS1]=C,y),x={mode:"relative-to-ground",offset:0};t.default=O});