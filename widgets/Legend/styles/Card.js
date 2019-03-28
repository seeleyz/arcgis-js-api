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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/assignHelper","dojo/i18n!../../../nls/common","dojo/i18n!../../Legend/nls/Legend","dojox/gfx","../../../core/Handles","../../../core/lang","../../../core/screenUtils","../../../core/accessorSupport/decorators","../../Widget","./support/utils","../support/styleUtils","../../support/colorUtils","../../support/widget"],function(e,t,r,a,i,s,n,o,l,c,d,h,p,y,m,g,u){function v(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var r=e.symbolLayers.getItemAt(t-1),a=r.resource&&r.resource.primitive;return"circle"===a||"cross"===a||"kite"===a||"sphere"===a||"cube"===a||"diamond"===a}var i=e.style;return"circle"===i||"diamond"===i||"cross"===i}}function _(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var r=e.symbolLayers.getItemAt(t-1),a=r.get("resource.primitive");return"triangle"===a||"cone"===a||"tetrahedron"===a}return"triangle"===e.style}}var b={activated:"esri-legend--card__carousel-indicator--activated",base:"esri-legend--card esri-widget",stacked:"esri-legend--stacked",carouselTitle:"esri-legend--card__carousel-title",indicator:"esri-legend--card__carousel-indicator",intervalSeparator:"esri-legend--card__interval-separator",imageryLayerStretchedImage:"esri-legend--card__imagery-layer-image--stretched",imageLabel:"esri-legend--card__image-label",layerCaption:"esri-legend--card__layer-caption",labelElement:"esri-legend--card__label-element",layerRow:"esri-legend--card__layer-row",labelCell:"esri-legend--card__label-cell",message:"esri-legend--card__message",rampLabel:"esri-legend--card__ramp-label",section:"esri-legend--card__section",relationshipSection:"esri-legend--card__relationship-section",serviceCaptionText:"esri-legend--card__service-caption-text",serviceContent:"esri-legend--card__service-content",service:"esri-legend--card__service",groupLayer:"esri-legend--card__group-layer",groupLayerChild:"esri-legend--card__group-layer-child",symbol:"esri-legend--card__symbol",sizeRampRow:"esri-legend--card__size-ramp-row",symbolRow:"esri-legend--card__symbol-row",symbolCell:"esri-legend--card__symbol-cell",indicatorContainer:"esri-legend--card__carousel-indicator-container",intervalSeparatorsContainer:"esri-legend--card__interval-separators-container",relationshipLabelContainer:"esri-legend--card__relationship-label-container",labelContainer:"esri-legend--card__label-container",serviceCaptionContainer:"esri-legend--card__service-caption-container",symbolContainer:"esri-legend--card__symbol-container",sizeRampContainer:"esri-legend--card__size-ramp-container",hidden:"esri-hidden",header:"esri-widget__heading"},f="esri-legend--card__",x=window.devicePixelRatio;return function(e){function t(t){var r=e.call(this)||this;return r._handles=new l,r._hasIndicators=!1,r._selectedSectionName=null,r._sectionNames=[],r._sectionMap=new Map,r.activeLayerInfos=null,r.layout="stack",r.type="card",r.view=null,r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([this.watch("activeLayerInfos",function(t){e._handles.removeAll(),e._watchForSectionChanges(t)})])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null},t.prototype.render=function(){var e,t=this;this._hasIndicators="auto"===this.layout&&this.view.container.clientWidth<=768||"stack"===this.layout;var r=this.activeLayerInfos,a=r&&r.toArray().map(function(e){return t._renderLegendForLayer(e)}).filter(function(e){return!!e});this._hasIndicators?this._selectedSectionName&&-1!==this._sectionNames.indexOf(this._selectedSectionName)||(this._selectedSectionName=this._sectionNames&&this._sectionNames[0]):this._selectedSectionName=null;var i=this._sectionNames.length,o=this._sectionNames.map(function(e,r){var a,n=c.substitute({index:r+1,total:i},s.pagination.pageText);return u.tsx("div",{key:e,"aria-label":n,title:n,tabIndex:0,onclick:t._selectSection,onkeydown:t._selectSection,bind:t,class:t.classes(b.indicator,(a={},a[b.activated]=t._selectedSectionName===e,a)),"data-section-name":e})}),l=this._hasIndicators&&i>1?u.tsx("div",{class:b.indicatorContainer,key:"carousel-navigation"},o):null,d=this._hasIndicators?this._sectionMap.get(this._selectedSectionName):a&&a.length?a:null,h=(e={},e[b.stacked]=this._hasIndicators,e);return u.tsx("div",{class:this.classes(b.base,h)},l,d||u.tsx("div",{class:b.message},n.noLegend))},t.prototype._selectSection=function(e){var t=e.target,r=t.getAttribute("data-section-name");r&&(this._selectedSectionName=r)},t.prototype._watchForSectionChanges=function(e){var t=this;this._generateSectionNames(),e&&(e.forEach(function(e){var r="activeLayerInfo-"+e.layer.uid+"-version-change";t._handles.remove(r),t._watchForSectionChanges(e.children),t._handles.add(e.watch("version",function(){return t._generateSectionNames()}),r)}),this._handles.add(e.on("change",function(){return t._watchForSectionChanges(e)})))},t.prototype._generateSectionNames=function(){this._sectionNames.length=0,this.activeLayerInfos&&this.activeLayerInfos.forEach(this._generateSectionNamesForActiveLayerInfo,this)},t.prototype._generateSectionNamesForActiveLayerInfo=function(e){var t=this;e.children.forEach(this._generateSectionNamesForActiveLayerInfo,this),e.legendElements&&e.legendElements.forEach(function(r,a){t._sectionNames.push(""+f+e.layer.uid+"-type-"+r.type+"-"+a)})},t.prototype._renderLegendForLayer=function(e){var t,r=this;if(!e.ready)return null;if(e.children.length){var a=e.children.map(function(e){return r._renderLegendForLayer(e)}).toArray();return u.tsx("div",{key:e.layer.uid,class:this.classes(b.service,b.groupLayer)},u.tsx("div",{class:b.serviceCaptionContainer},e.title),a)}var i=e.legendElements;if(i&&!i.length)return null;var s=i.some(function(e){return"relationship-ramp"===e.type}),n=i.map(function(t,a){return r._renderLegendForElement(t,e,a,s)}).filter(function(e){return!!e});if(!n.length)return null;var o=(t={},t[b.groupLayerChild]=!!e.parent,t);return u.tsx("div",{key:e.layer.uid,class:this.classes(b.service,o)},u.tsx("div",{class:b.serviceCaptionContainer},u.tsx("div",{class:b.serviceCaptionText},e.title)),u.tsx("div",{class:b.serviceContent},n))},t.prototype._renderLegendForElement=function(e,t,r,a){var i=this;void 0===a&&(a=!1);var s,n="color-ramp"===e.type,o="opacity-ramp"===e.type,l="size-ramp"===e.type,c=t.layer,d=e.title,h=null;if("string"==typeof d)h=d;else if(d){var p=m.getTitle(d,n||o);h=d.title?d.title+" ("+p+")":p}var g=""+f+c.uid+"-type-"+e.type+"-"+r,v=this._hasIndicators?u.tsx("div",null,u.tsx("h3",{class:this.classes(b.header,b.carouselTitle)},t.title),u.tsx("h4",{class:this.classes(b.header,b.layerCaption)},h)):h?u.tsx("h4",{class:this.classes(b.header,b.layerCaption)},h):null,_=null;if("symbol-table"===e.type){var x=e.infos.map(function(r,a){return i._renderLegendForElementInfo(r,t,e.legendType,a)}).filter(function(e){return!!e});if(x.length){var w=x[0].properties.classes&&x[0].properties.classes[b.symbolRow],L=(s={},s[b.labelContainer]=!w&&!a,s[b.relationshipLabelContainer]=a,s);_=u.tsx("div",{key:g,class:b.section},v,u.tsx("div",{class:this.classes(L)},x))}}else"color-ramp"===e.type||"opacity-ramp"===e.type||"heatmap-ramp"===e.type?_=u.tsx("div",{key:g,class:b.section},v,this._renderLegendForRamp(e)):l?_=u.tsx("div",{key:g,class:b.section},v,this._renderSizeRamps(e)):"relationship-ramp"===e.type&&(_=u.tsx("div",{key:g,class:this.classes(b.section,b.relationshipSection)},v,y.renderRelationshipRamp(e,this.id)));return _?(this._sectionMap.set(g,_),_):null},t.prototype._renderLegendForElementInfo=function(e,t,r,a){var i,s,n,o=t.layer;if(e.type)return this._renderLegendForElement(e,t,a);var l=m.isImageryStretchedLegend(o,r);if(e.symbol&&e.preview){if(-1===e.symbol.type.indexOf("simple-fill")){if(!e.label)return u.tsx("div",{key:a,bind:e.preview,afterCreate:m.attachToNode});var c=(i={},i[b.symbolCell]=this._hasIndicators,i);return u.tsx("div",{key:a,class:this.classes(b.layerRow,(s={},s[b.symbolRow]=this._hasIndicators,s))},u.tsx("div",{class:this.classes(c),bind:e.preview,afterCreate:m.attachToNode}),u.tsx("div",{class:this.classes(b.imageLabel,(n={},n[b.labelCell]=this._hasIndicators,n))},m.getTitle(e.label,!1)||""))}var d=255,h=255,p=255,y=0,v=255,_=255,f=255,x=0,w=e.symbol.color&&e.symbol.color.a,L=e.symbol.outline&&e.symbol.outline.color.a;w&&(d=e.symbol.color.r,h=e.symbol.color.g,p=e.symbol.color.b,y=e.symbol.color.a),L&&(v=e.symbol.outline.color.r,_=e.symbol.outline.color.g,f=e.symbol.outline.color.b,x=e.symbol.outline.color.a);var S=!e.symbol.color||g.isBright(e.symbol.color),C=S?"black":"white",I=S?"rgba(255, 255, 255, .6)":"rgba(0, 0, 0, .6)",R={background:w?"rgba("+d+", "+h+", "+p+", "+y+")":"none",color:C,textShadow:"-1px -1px 0 "+I+",\n                                              1px -1px 0 "+I+",\n                                              -1px 1px 0 "+I+",\n                                              1px 1px 0 "+I,border:L?"1px solid rgba("+v+", "+_+", "+f+", "+x+")":"none"};return u.tsx("div",{key:a,class:b.layerRow},u.tsx("div",{class:b.labelElement,styles:R}," ",e.label," "))}if(e.src){var k=this._renderImage(e,o,l);return u.tsx("div",{key:a,class:b.layerRow},k,u.tsx("div",{class:b.imageLabel},e.label||""))}},t.prototype._renderImage=function(e,t,r){var a,i=e.label,s=e.src,n=e.opacity,o=(a={},a[b.imageryLayerStretchedImage]=r,a[b.symbol]=!r,a),l={opacity:""+(null!=n?n:t.opacity)};return u.tsx("img",{alt:i,src:s,border:0,width:e.width,height:e.height,class:this.classes(o),styles:l})},t.prototype._drawImageOnSizeRamp=function(e,t,r){var a=r.x,i=r.y,s=r.width,n=r.height,o=new Image;o.src=t,o.onload=function(){e.drawImage(o,a,i,s,n),URL.revokeObjectURL(t)}},t.prototype._attachSizeRampToNode=function(e){var t,r,a=e["data-legend-element"],i=a.infos,s=i[0],n=i[i.length-1],o=s.symbol,l=n.symbol,c="picture-marker"===o.type,h=_(o),p=v(o);if(c)t=o.url,r=l.url;else{var y="http://www.w3.org/2000/xmlns/";if(s.preview){s.preview.firstChild.setAttributeNS(y,"xmlns","http://www.w3.org/2000/svg");var m=new Blob([s.preview.innerHTML],{type:"image/svg+xml"});t=URL.createObjectURL(m)}if(n.preview){n.preview.firstChild.setAttributeNS(y,"xmlns","http://www.w3.org/2000/svg");var g=new Blob([n.preview.innerHTML],{type:"image/svg+xml"});r=URL.createObjectURL(g)}}var u=d.pt2px(s.size+s.outlineSize)*x,b=d.pt2px(n.size+n.outlineSize)*x,f=this._hasIndicators?u:u+100*x,w=this._hasIndicators?f+50*x:u,L=document.createElement("canvas");L.width=f,L.height=w,L.style.width=L.width/x+"px",L.style.height=L.height/x+"px";var S=L.getContext("2d");if(this._hasIndicators){this._drawImageOnSizeRamp(S,t,{x:0,y:0,width:u,height:u}),this._drawImageOnSizeRamp(S,r,{x:f/2-b/2,y:w-b,width:b,height:b}),S.beginPath();var C=p?f/2:f,I=f/2-b/2,R=w-(h?0:p?b/2:b);S.moveTo(0,C),S.lineTo(I,R);var k=f,N=p?f/2:f,T=f/2+b/2,z=w-(h?0:p?b/2:b);S.moveTo(k,N),S.lineTo(T,z)}else{this._drawImageOnSizeRamp(S,t,{x:f-u,y:0,width:u,height:u}),this._drawImageOnSizeRamp(S,r,{x:0,y:w/2-b/2,width:b,height:b}),S.beginPath();var F=b-(p||h?b/2:0),E=w/2-b/2,O=f-(p||h?u/2:u);S.moveTo(F,E),S.lineTo(O,0);var A=b-(p?b/2:0),U=w/2+b/2,M=f-(p?u/2:u),H=w;S.moveTo(A,U),S.lineTo(M,H)}S.strokeStyle="#ddd",S.stroke(),e.appendChild(L)},t.prototype._renderSizeRamps=function(e){var t,r=e.infos,a=r[0].label,i=r[r.length-1].label;return u.tsx("div",{class:this.classes(b.layerRow,(t={},t[b.sizeRampRow]=this._hasIndicators,t))},u.tsx("div",{class:b.rampLabel},this._hasIndicators?a:i),u.tsx("div",{class:b.sizeRampContainer},u.tsx("div",{bind:this,"data-legend-element":e,afterCreate:this._attachSizeRampToNode})),u.tsx("div",{class:b.rampLabel},this._hasIndicators?i:a))},t.prototype._renderLegendForRamp=function(e){var t=e.infos,r="heatmap-ramp"===e.type,a=t.length-1,i=a>2&&!r?25*a:100,s=i+20,l=document.createElement("div");l.style.width=s+"px";var c=o.createSurface(l,s,25),d=t.slice(0).reverse();try{d.forEach(function(e,t){e.offset=r?e.ratio:t/a}),r||c.createPath("M0 12.5 L10 0 L10 25 Z").setFill(d[0].color).setStroke(null),c.createRect({x:10,y:0,width:i,height:25}).setFill({type:"linear",x1:10,y1:0,x2:i+10,y2:0,colors:d}).setStroke(null),r||c.createPath("M"+(i+10)+" 0 L"+s+" 12.5 L"+(i+10)+" 25 Z").setFill(d[d.length-1].color).setStroke(null)}catch(e){c.clear(),c.destroy()}if(!c)return null;var h=d.filter(function(e,t){return!!e.label&&0!==t&&t!==d.length-1}).map(function(e){return u.tsx("div",{class:b.intervalSeparatorsContainer},u.tsx("div",{class:b.intervalSeparator},"|"),u.tsx("div",{class:b.rampLabel},e.label))}),p=t[t.length-1].label,y=t[0].label;return u.tsx("div",{class:b.layerRow},u.tsx("div",{class:b.rampLabel},r?n[p]:p),u.tsx("div",{class:b.symbolContainer},u.tsx("div",{bind:l,afterCreate:m.attachToNode}),h),u.tsx("div",{class:b.rampLabel},r?n[y]:y))},a([u.renderable(),h.property()],t.prototype,"activeLayerInfos",void 0),a([h.property()],t.prototype,"layout",void 0),a([h.property({readOnly:!0})],t.prototype,"type",void 0),a([h.property()],t.prototype,"view",void 0),a([u.accessibleHandler()],t.prototype,"_selectSection",null),t=a([h.subclass("esri.widgets.Legend.styles.Card")],t)}(h.declared(p))});