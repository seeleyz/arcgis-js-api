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

define(["require","exports","../../../core/mathUtils","../../../core/libs/gl-matrix-2/vec2","../../../core/libs/gl-matrix-2/vec4","./TerrainConst","./terrainUtils","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/glUtil3D","../webgl-engine/shaders/MiscPrograms","../../vectorTiles/tileRendererHelper3D","../../vectorTiles/VectorTileDisplayObject","../../webgl/BufferObject","../../webgl/FramebufferObject","../../webgl/renderState","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,a,i,s,o,n,l,c,u,d,f,p,h,x,y,_,b){function T(e){var t=e&&e.sourceLayerInfo&&e.sourceLayerInfo.data;return t instanceof HTMLImageElement||t instanceof HTMLCanvasElement}function g(e){return e&&e.sourceLayerInfo&&e.sourceLayerInfo.data instanceof f}function m(e){return e&&e.sourceLayerInfo&&e.sourceLayerInfo.data instanceof y}function v(e){var t=r.nextHighestPowerOfTwo(e),a=t*t,i=e*e;if(a===i)return e;var s=t/2;return a-i<i-s*s?t:s}var L=new Array(20),w=[0,0],I=function(){function e(e,t,r,a,i){this._backgroundTex=null,this._blackTex=null,this.tileSize=256,this._context=e,this.tileSize=t,this._resourceCounter=a,this._setNeedsRender=i,e.capabilities.textureFilterAnisotropic&&(this._maxAnisotropy=Math.min(8,e.parameters.maxMaxAnisotropy));var s=new Float32Array(20);s[0]=-1,s[1]=-1,s[2]=0,s[3]=0,s[4]=0,s[5]=1,s[6]=-1,s[7]=0,s[8]=1,s[9]=0,s[10]=-1,s[11]=1,s[12]=0,s[13]=0,s[14]=1,s[15]=1,s[16]=1,s[17]=0,s[18]=1,s[19]=1,this._vaoQuad=new b(e,n.Default3D,{geometry:l.Pos3Tex},{geometry:p.createVertex(e,35044,s)}),this._blendLayersProgram=r.getProgram(u.blendLayers),this._blendLayersPipelineState=x.makePipelineState({blending:x.simpleBlendingParams(1,771),colorWrite:x.defaultColorWriteParams}),this._applyOpacityPipelineState=x.makePipelineState({blending:x.simpleBlendingParams(0,770),colorWrite:x.defaultColorWriteParams}),this._blackTex=c.createColorTexture(this._context,[0,0,0,1])}return e.prototype.dispose=function(){this._fbo&&(this._fbo.dispose(),this._fbo=null),this._vtFBO&&(this._vtFBO.dispose(),this._vtFBO=null),this._vaoQuad&&(this._vaoQuad.dispose(),this._vaoQuad=null),this._backgroundTex&&(this._backgroundTex.dispose(),this._backgroundTex=null),this._blackTex&&(this._blackTex.dispose(),this._blackTex=null),this._blendLayersProgram&&(this._blendLayersProgram.dispose(),this._blendLayersProgram=null),this._context=null},e.prototype.updateTileTexture=function(e){for(var t=s.LayerClass.MAP,r=e.layerInfo[t],a=0,n=r;a<n.length;a++){n[a].pendingUpdates&=~s.TileUpdate.TEXTURE}if(e.renderData){var l,c=e.renderData,u=e.surface,d=u.baseOpacity,f=0,p=this.tileSize,h=!1,x=r.length;for(l=0;l<r.length&&!h;l++){var y=u.layerViewByIndex(l,t),_=y.fullOpacity;if(L[l]=_,this._isBaseLayer(y.layer)&&x>=r.length&&(x=l),0!==_){var b=this._getTileRenderInfo(e,l,P);b&&(o.isVectorTileLayerView(y)&&(p=Math.max(p,this.tileSize*y.view.pixelRatio)),f++,y.isOpaque&&1===d&&1===_&&(h=!0))}}p=v(p);var T=p/this.tileSize,g=l-1;if(0===f&&this._backgroundTex)c.opacity=d,c.textureReference=this._backgroundTex,i.vec4.set(c.texOffsetAndScale,0,0,1,1);else if(1===f&&h){c.opacity=d;var b=this._getTileRenderInfo(e,g,P);this._dataToTexture(this._context,b,p,T)&&(c.textureReference=b.sourceLayerInfo.data,i.vec4.set(c.texOffsetAndScale,b.offset[0],b.offset[1],b.scale,b.scale))}else this._composeMapLayers(e,g,x,h,L,p,T),i.vec4.set(c.texOffsetAndScale,0,0,1,1);this._setNeedsRender()}},e.prototype.setBackground=function(e){e instanceof HTMLImageElement?this._backgroundTex=this._buildTexture(e):this._backgroundTex=c.createColorTexture(this._context,e||[0,0,0,0])},e.prototype._buildTexture=function(e){var t,r={target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9987,maxAnisotropy:this._maxAnisotropy,flipped:!0,hasMipmap:!0},a=this._context;if("number"==typeof e)r.width=r.height=e,t=new y(a,r);else try{t=new y(a,r,e)}catch(e){t=c.createEmptyTexture(a),console.warn("TileRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}return a.bindTexture(t),t.generateMipmap(),t},e.prototype._bindFBO=function(e,t,r,a){return e&&e.width===t&&e.height===r||(e&&e.dispose(),e=h.create(this._context,{colorTarget:0,depthStencilTarget:a?1:0,width:t,height:r})),this._context.bindFramebuffer(e),e},e.prototype._drawRasterData=function(e,t,r,a){void 0===a&&(a=1);var i=this._context,s=this._blendLayersProgram,o=this._vaoQuad;i.bindProgram(s),i.bindVAO(o),_.assertCompatibleVertexAttributeLocations(o,s),i.bindTexture(e,0),s.setUniform1i("tex",0),s.setUniform1f("scale",t),s.setUniform2f("offset",r[0],r[1]),s.setUniform1f("opacity",a),i.drawArrays(5,0,_.vertexCount(o,"geometry"))},e.prototype._composeMapLayers=function(e,t,r,a,i,s,o){var n=this,l=e.renderData.ensureTexture(function(e){return n._buildTexture(e)},s),c=this._context;this._fbo=this._bindFBO(this._fbo,l.descriptor.width,l.descriptor.height,!1),c.setViewport(0,0,s,s),c.setClearColor(0,0,0,0),c.setClearDepth(1),c.clearSafe(16384),!a&&this._backgroundTex&&(c.setPipelineState(this._blendLayersPipelineState),this._drawRasterData(this._backgroundTex,1,w));for(var u=e.surface.baseOpacity,d=!1,f=t;f>=0;f--){var p=this._getTileRenderInfo(e,f,P);p&&(f<r&&u<1&&!d&&(c.setPipelineState(this._applyOpacityPipelineState),this._drawRasterData(this._blackTex,1,w,u),d=!0),0!==i[f]&&this._dataToTexture(c,p,s,o)&&(c.setPipelineState(this._blendLayersPipelineState),this._drawRasterData(p.sourceLayerInfo.data,p.scale,p.offset,i[f])))}c.bindTexture(l),c.gl.copyTexImage2D(c.gl.TEXTURE_2D,0,l.descriptor.pixelFormat,0,0,l.descriptor.width,l.descriptor.height,0),l.generateMipmap(),c.bindFramebuffer(null),this._resourceCounter.incrementNumTileTexturesComposited(),e.renderData.opacity=d?1:u,e.renderData.textureReference=l},e.prototype._dataToTexture=function(e,t,r,a){return g(t)&&(this._vectorDataToTexture(e,t,r,a),t.tile.updateMemoryUsed()),T(t)&&(this._rasterDataToTexture(t),t.tile.updateMemoryUsed()),m(t)},e.prototype._rasterDataToTexture=function(e){var t=e.sourceLayerInfo;t.data=this._buildTexture(t.data)},e.prototype._vectorDataToTexture=function(e,t,r,a){var i=t.tile.surface.layerViewByIndex(t.layerIdx,s.LayerClass.MAP);this._vtFBO=this._bindFBO(this._vtFBO,r,r,!0),e.setClearColor(1,1,1,0),e.clearSafe(16640);var o=t.sourceLayerInfo,n=o.data;d.renderVectorTile(this._context,t.sourceLod,n,i.renderer,i.schemaHelper,this.tileSize,this.tileSize,a),n.dispose();var l=o;l.data=this._buildTexture(r),e.bindTexture(l.data),e.gl.copyTexImage2D(e.gl.TEXTURE_2D,0,l.data.descriptor.pixelFormat,0,0,r,r,0),l.data.generateMipmap(),e.bindFramebuffer(this._fbo)},e.prototype._getTileRenderInfo=function(e,t,r){var i=e.layerInfo[s.LayerClass.MAP][t];if(r.layerIdx=t,i.data)return a.vec2.set(r.offset,0,0),r.tile=e,r.scale=1,r.sourceLod=e.lij,r.sourceLayerInfo=i,r;if(!i.upsampleFromTile)return null;var o=i.upsampleFromTile,n=o.tile.layerInfo[s.LayerClass.MAP][t];return r.tile=o.tile,a.vec2.copy(r.offset,o.offset),r.scale=o.scale,r.sourceLod=o.tile.lij,r.sourceLayerInfo=n,r},e.prototype._isBaseLayer=function(e){return e.parent&&"esri.Basemap"===e.parent.declaredClass&&e.parent.baseLayers.indexOf(e)>-1},e}(),P={tile:null,sourceLayerInfo:null,sourceLod:null,offset:[0,0],scale:1,layerIdx:0};return I});