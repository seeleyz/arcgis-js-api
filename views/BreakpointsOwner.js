// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["../core/Accessoire","../core/ArrayPool","../core/HandleRegistry","../core/Scheduler","../core/watchUtils","dojo/_base/lang","dojo/dom-class"],function(e,i,a,s,t,r,l){function h(e){var i=e;return i&&i.xsmall<i.small&&i.small<i.medium&&i.medium<i.large}var n="breakpointsOwner-css-update",m={widthBreakpoint:{getValue:function(e){var i=e.viewSize[0],a=e.breakpoints,s=this.values;return i<=a.xsmall?s.xsmall:i<=a.small?s.small:i<=a.medium?s.medium:i<=a.large?s.large:s.xlarge},values:{xsmall:"xsmall",small:"small",medium:"medium",large:"large",xlarge:"xlarge"},valueToClassName:{xsmall:"esri-view-width-xsmall esri-view-width-less-than-small esri-view-width-less-than-medium esri-view-width-less-than-large esri-view-width-less-than-xlarge",small:"esri-view-width-small esri-view-width-greater-than-xsmall esri-view-width-less-than-medium esri-view-width-less-than-large esri-view-width-less-than-xlarge",medium:"esri-view-width-medium esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-less-than-large esri-view-width-less-than-xlarge",large:"esri-view-width-large esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-greater-than-medium esri-view-width-less-than-xlarge",xlarge:"esri-view-width-xlarge esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-greater-than-medium esri-view-width-greater-than-large"}},heightBreakpoint:{getValue:function(e){var i=e.viewSize[1],a=e.breakpoints,s=this.values;return i<=a.xsmall?s.xsmall:i<=a.small?s.small:i<=a.medium?s.medium:i<=a.large?s.large:s.xlarge},values:{xsmall:"xsmall",small:"small",medium:"medium",large:"large",xlarge:"xlarge"},valueToClassName:{xsmall:"esri-view-height-xsmall esri-view-height-less-than-small esri-view-height-less-than-medium esri-view-height-less-than-large esri-view-height-less-than-xlarge",small:"esri-view-height-small esri-view-height-greater-than-xsmall esri-view-height-less-than-medium esri-view-height-less-than-large esri-view-height-less-than-xlarge",medium:"esri-view-height-medium esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-less-than-large esri-view-height-less-than-xlarge",large:"esri-view-height-large esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-greater-than-medium esri-view-height-less-than-xlarge",xlarge:"esri-view-height-xlarge esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-greater-than-medium esri-view-height-greater-than-large"}},orientation:{getValue:function(e){var i=e.viewSize,a=i[0],s=i[1],t=this.values;return s>=a?t.portrait:t.landscape},values:{portrait:"portrait",landscape:"landscape"},valueToClassName:{portrait:"esri-view-orientation-portrait",landscape:"esri-view-orientation-landscape"}}},g={xsmall:544,small:768,medium:992,large:1200},w=e.createSubclass({classMetadata:{properties:{breakpoints:{},orientation:{},widthBreakpoint:{},heightBreakpoint:{}}},constructor:function(){this._handles=new a},getDefaults:function(){return r.mixin(this.inherited(arguments),{breakpoints:g})},initialize:function(){this._handles.add(t.init(this,"size",this._updateClassNames))},destroy:function(){this._removeActiveClassNames(),this._handles.destroy(),this._handles=null,this.view=null},_breakpointsSetter:function(e,i){if(e===i)return e;var a,s=h(e);return s||(a=JSON.stringify(g,null,2),console.warn("provided breakpoints are not valid, using defaults:"+a)),e=s?e:g,r.mixin({},e)},_updateClassNames:function(){if(this.container){var e,a,t,r=i.acquire(),l=i.acquire(),h=!1,g=this._handles;for(e in m)a=this[e],t=m[e].getValue({viewSize:this.size,breakpoints:this.breakpoints}),a!==t&&(h=!0,this[e]=t,l.push(m[e].valueToClassName[a]),r.push(m[e].valueToClassName[t]));h&&g.add(s.addFrameTask({update:function(){g.remove(n),this._applyClassNameChanges(r,l),i.release(r),i.release(l)}.bind(this)}),n)}},_applyClassNameChanges:function(e,i){var a=this.container;a&&(l.remove(a,i),l.add(a,e))},_removeActiveClassNames:function(){var e,i=this.container;if(i)for(e in m)l.remove(i,m[e].valueToClassName[this[e]])}});return w});