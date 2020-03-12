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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/tsSupport/assignHelper","../../../../../core/Handles","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/scheduling","../../../../../core/screenUtils","../../../../../core/watchUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/math/common","../../Manipulator3D","../../manipulatorUtils","../../manipulatorUtils","./dragUtils","./graphicTransform3DToolConfig","../../../support/geometryUtils","../../../support/mathUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/materials/ColorMaterial"],function(t,e,a,r,i,o,n,l,s,c,u,g,h,m,p,d,f,R,I,v,_,T,A,D,S,M,y,E,N){function O(t,e){var a=d.vec3.subtract(M.sv3d.get(),e.start,t.origin),r=d.vec3.subtract(M.sv3d.get(),e.end,t.origin),i=d.vec3.length(a),o=d.vec3.length(r);return 0===i?0:o/i}function C(t,e){var a=t.allLayerViews.find(function(t){return t.layer===e.layer});if(c.isNone(e.symbol))return null;var r=e.symbol;return{symbolLayers:r.symbolLayers.map(function(t){var e=null,i=null;return"object"===t.type&&(e=t.heading),i=a.getSymbolLayerSize(r,t),{heading:e,size:i}}).toArray()}}function b(t,e,a,r){t.symbolLayers.forEach(function(t,i){var o=e.symbolLayers[i],n=o.heading,l=o.size;"object"===t.type&&(t.heading=(c.isSome(n)?n:0)-R.toDegree(a),c.isSome(l)&&"width"in l&&(t.width=l.width*r,t.depth=l.depth*r,t.height=l.height*r))})}function H(t,e,a,r){var i=t.start,o=t.end,n=P(i,r,M.sv3d.get()),l=P(o,r,M.sv3d.get());if(d.vec3.squaredDistance(n,l)<A.DRAG_THRESHOLD_PX*A.DRAG_THRESHOLD_PX)return null;var s=d.vec3.subtract(M.sv3d.get(),i,a),c=d.vec3.cross(M.sv3d.get(),s,e),u=i,g=d.vec3.add(M.sv3d.get(),u,c),h=P(a,r,M.sv3d.get()),m=n,p=P(g,r,M.sv3d.get()),f=d.vec3.subtract(M.sv3d.get(),p,m),R=d.vec3.subtract(M.sv3d.get(),n,h),I=D.ray.wrap(m,f),v=D.ray.wrap(h,R);return D.ray.distance2(I,l)<D.ray.distance2(v,l)?"rotate":"scale"}function P(t,e,a){var r=e.projectPoint(t,g.castRenderScreenPointArray(k)),i=e.renderToScreen(r,F);return d.vec3.set(a,i[0],i[1],0)}function G(t){var e=null,a=1,r=function(){return a};return{start:function(){a=t.getScale(),e=t.getScale,t.getScale=r},update:function(e){return a+=((a+1)/2-a)*Math.min(e*A.RING_RESET_ANIMATION_SPEED_FACTOR,1),t.tool.updateManipulators(),Math.abs(a-1)<.01?1:0},destroy:function(){t.getScale=e,t.tool.updateManipulators()}}}function L(t){var e=0,a=null,r=function(){return!1};return{start:function(){a=t.getFocused,t.getFocused=r,e=0},update:function(a){return e+=a,!t.ringManipulator.focused||e>A.RING_INDICATOR_DELAY_MS?1:0},destroy:function(){t.getFocused=a,t.tool.updateManipulators()}}}Object.defineProperty(e,"__esModule",{value:!0});var w;!function(t){t.ScaleIn=32,t.ScaleOut=64,t.RotateLeft=128,t.RotateRight=256,t.Highlighted=512,t.Unlocked=1024,t.TouchInput=32768}(w||(w={}));var U=function(){function t(t){var e=this;this.mode=null,this._handles=new l,this._scaleRotateDragData=null,this._activeAnimation=null,this.getFocused=function(){return e.ringManipulator.focused},this.getScale=function(){return c.isSome(e._scaleRotateDragData)&&"scale"===e._scaleRotateDragData.mode?e._scaleRotateDragData.scale:1},this.tool=t.tool,this.mode=t.mode}return t.prototype.destroy=function(){this._clear()},t.prototype._clear=function(){c.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),this._activeAnimation=null),this._handles.removeAll(),this.tool.manipulators.remove(this.ringManipulator),this.ringManipulator=null},Object.defineProperty(t.prototype,"dragging",{get:function(){return this.ringManipulator.dragging},enumerable:!0,configurable:!0}),t.prototype.startAnimation=function(t){var e=this;this.cancelActiveAnimation(),t.start();var a=u.addFrameTask({update:function(a){var r=a.deltaTime;t.update(r)&&e.cancelActiveAnimation()}});this._activeAnimation=n({},t,{frameTask:a})},t.prototype.cancelActiveAnimation=function(){c.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),this._activeAnimation.destroy(),this._activeAnimation=null)},t.prototype.recreateManipulators=function(){var t=this;this._clear(),this.ringManipulator=this.createRingManipulator(),this.tool.manipulators.add(this.ringManipulator);var e=this.ringManipulator,a=function(t){},r=function(e){t._scaleRotateDragData=null;var a=f.vec3f64.fromValues(t.ringManipulator.modelTransform[8],t.ringManipulator.modelTransform[9],t.ringManipulator.modelTransform[10]),r=f.vec3f64.clone(t.ringManipulator.renderLocation),i=D.plane.fromPositionAndNormal(r,a),o=T.createCartesianPlaneDrag(e,t.tool.view,i);if(c.isNone(o))return null;var l=C(t.tool.view,t.tool.graphic);if(c.isNone(l))return null;var u={mode:"none",origin:r,angle:0,startAngle:t.tool.symbolRotationAngle,angleDir:0,scale:1,scaleDir:0,startSymbolData:l};return t._scaleRotateDragData=u,function(e){var a=o(e),r=i,l=v.calculateInputRotationTransform(a.start,a.end,u.origin,r),g=S.cyclicalPI.shortestSignedDiff(u.angle,l);u.angleDir=s.clamp(u.angleDir+g,-A.ROTATE_INDICATOR_DIRECTION_BUFFER,A.ROTATE_INDICATOR_DIRECTION_BUFFER),u.angle=l;var h=O(u,a),m=h-u.scale;if(u.scaleDir=s.clamp(u.scaleDir+m,-A.SCALE_INDICATOR_DIRECTION_BUFFER,A.SCALE_INDICATOR_DIRECTION_BUFFER),u.scale=h,"none"===u.mode){var p=t.mode||H(a,i,u.origin,t.tool.view.state.camera);if(c.isSome(p)){switch(p){case"rotate":t.tool.emit("graphic-rotate-start",{graphic:t.tool.graphic});break;case"scale":t.tool.emit("graphic-scale-start",{graphic:t.tool.graphic})}u.mode=p}}else{if(c.isSome(t.tool.graphic.symbol)){var d=t.tool.graphic.symbol.clone(),f=0,R=1;switch(u.mode){case"scale":R=u.scale;break;case"rotate":f=u.angle}b(d,u.startSymbolData,f,R),t.tool.graphic.symbol=d}if("update"===e.action)switch(u.mode){case"rotate":t.tool.emit("graphic-rotate",{graphic:t.tool.graphic,angle:u.angle,type:"rotate"});break;case"scale":t.tool.emit("graphic-scale",{graphic:t.tool.graphic,scale:u.scale,type:"scale"})}}if("end"===e.action){switch(u.mode){case"rotate":t.tool.emit("graphic-rotate-stop",{graphic:t.tool.graphic});break;case"scale":t.tool.emit("graphic-scale-stop",{graphic:t.tool.graphic});break;default:case"none":}t.startAnimation(G(t)),t._scaleRotateDragData=null}return t.tool.updateManipulators(),n({},a,u)}};T.createDragHandler(e,r,a),this._handles.add([h.init(this.tool.graphic,"geometry",function(){_.placeManipulatorAtGraphic(t.ringManipulator,t.tool.graphic)}),this.ringManipulator.events.on("focus",function(e){"focus"===e.action?t.startAnimation(L(t)):t.tool.updateManipulators()}),this.ringManipulator.events.on("immediate-click",function(t){t.stopPropagation()}),h.init(this.tool.graphic,["visible","layer.visible"],function(){t.ringManipulator.visible=t.tool.graphic.visible&&t.tool.graphic.layer.visible})])},t.prototype.updateManipulators=function(t,e){var a=m.mat4.identity(M.sm4d.get()),r=this.tool.symbolRotationAngle;0!==r&&m.mat4.rotate(a,a,r,f.vec3f64.fromValues(0,0,1));var i=this.getScale(),o=m.mat4.fromScaling(M.sm4d.get(),d.vec3.set(M.sv3d.get(),i,i,i)),n=m.mat4.identity(M.sm4d.get());if(m.mat4.multiply(n,t,o),m.mat4.multiply(n,n,a),this.ringManipulator.modelTransform=n,this.ringManipulator.state=0,this.ringManipulator.state|=!0===e?w.Highlighted:0,this.ringManipulator.state|=c.isSome(this._scaleRotateDragData)&&"none"!==this._scaleRotateDragData.mode?0:w.Unlocked,c.isSome(this._scaleRotateDragData))switch(this._scaleRotateDragData.mode){case"rotate":this.ringManipulator.state|=this._scaleRotateDragData.angleDir<0?w.RotateLeft:w.RotateRight;break;case"scale":this.ringManipulator.state|=this._scaleRotateDragData.scaleDir<0?w.ScaleIn:w.ScaleOut}},t.prototype.createRingManipulator=function(){for(var t=function(t,e,a){for(var r=[],i=Math.ceil(A.GEOMETRY_SEGMENTS*(e-t)/(2*Math.PI)),o=0;o<i+1;o++){var n=t+o*(e-t)/i;r.push(f.vec3f64.fromValues(a*Math.cos(n),a*Math.sin(n),0))}return r},e=function(e){return t(0,2*Math.PI,e)},a=function(t){return[[-t/2,0],[t/2,0],[t/2,A.RING_HEIGHT/2],[-t/2,A.RING_HEIGHT/2]]},r=function(t,e){return new y(E.createPathExtrusionGeometry(a(e),t,[],[],!1),"graphic-transform-ring")},i=e(A.RING_RADIUS),o=r(i,A.RING_THICKNESS),n={left:[],right:[]},l=[],s=0;s<2;s++){var c=s*Math.PI-Math.PI/4,u=Math.PI/2-A.ROTATE_INDICATOR_ARC_LENGTH,g=c+u,h=c+Math.PI/2-u,d=t(g,h,A.INNER_INDICATOR_RADIUS),R=r(d,A.INDICATOR_THICKNESS);l.push(d),n.left.push(R),n.right.push(R);for(var v=0;v<2;v++){var _=0===v,T=p.mat4f64.create();if(_){m.mat4.scale(T,T,[1,-1,1]),m.mat4.rotate(T,T,-g,[0,0,1]);var D=Math.round(A.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE*(d.length-1));T[12]=d[D][0],T[13]=d[D][1],T[14]=d[D][2]}else{m.mat4.rotate(T,T,h,[0,0,1]);var D=Math.round((1-A.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE)*(d.length-1));T[12]=d[D][0],T[13]=d[D][1],T[14]=d[D][2]}var S=E.createExtrudedTriangle(A.ROTATE_INDICATOR_ARROW_TIP_LENGTH,0,A.ROTATE_INDICATOR_ARROW_TIP_RADIUS,A.RING_HEIGHT);E.transformInPlace(S,T);var M=new y(S,"graphic-transform-ring-rotate");(_?n.left:n.right).push(M)}}for(var N=[],s=0;s<2;s++){var c=s*Math.PI-Math.PI/4,u=Math.PI/2-A.SCALE_INDICATOR_ARC_LENGTH,g=c+u,h=c+Math.PI/2-u,d=t(g,h,A.OUTER_INDICATOR_RADIUS);N.push(r(d,A.INDICATOR_THICKNESS))}var O=e(A.RING_RADIUS+A.SCALE_INDICATOR_OFFSET1),C=e(A.RING_RADIUS+A.SCALE_INDICATOR_OFFSET2),b=r(O,A.INDICATOR_THICKNESS),H=r(C,A.INDICATOR_THICKNESS),P=e(A.RING_RADIUS-A.SCALE_INDICATOR_OFFSET1),G=e(A.RING_RADIUS-A.SCALE_INDICATOR_OFFSET2),L=r(P,A.INDICATOR_THICKNESS),U=r(G,A.INDICATOR_THICKNESS),k=this.createMaterial(),F=this.createMaterial(.66),x=this.createMaterial(.5),K=this.createMaterial(.33),j=[{geometry:o,material:k,stateMask:w.Highlighted},{geometry:o,material:x}];this.mode&&"scale"!==this.mode||(j=j.concat([{geometry:N,material:k,stateMask:w.Highlighted|w.Unlocked},{geometry:b,material:F,stateMask:w.Highlighted|w.ScaleIn},{geometry:H,material:K,stateMask:w.Highlighted|w.ScaleIn},{geometry:L,material:F,stateMask:w.Highlighted|w.ScaleOut},{geometry:U,material:K,stateMask:w.Highlighted|w.ScaleOut}])),this.mode&&"rotate"!==this.mode||(j=j.concat([{geometry:n.right,material:k,stateMask:w.Highlighted|w.Unlocked},{geometry:n.left,material:k,stateMask:w.Highlighted|w.RotateLeft},{geometry:n.right,material:k,stateMask:w.Highlighted|w.RotateRight}]));var V=[i].concat(l);return new I.Manipulator3D({view:this.tool.view,renderObjects:j,autoScaleRenderObjects:!1,radius:A.RING_THICKNESS,focusMultiplier:1,touchMultiplier:1.5,elevationInfo:{mode:"on-the-ground",offset:0},collisionType:{type:"ribbon",paths:V,direction:f.vec3f64.fromValues(0,0,1)}})},t.prototype.createMaterial=function(t){void 0===t&&(t=1);var e=A.HANDLE_COLOR.concat([t]),a=new N({color:e,transparent:1!==t,cullFace:2},"graphic-transform");return a.renderOccluded=2,a},t}();e.GraphicScaleRotateTransform=U;var k=f.vec3f64.create(),F=g.createScreenPointArray()});