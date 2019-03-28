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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../core/Logger","../Utils"],function(t,e,r,i,o){Object.defineProperty(e,"__esModule",{value:!0});var u=i.getLogger("esri/views/2d/engine/webgl/util/Matcher"),n=function(){function l(){this._defaultResult=null}return l.fromBasicRenderer=function(t,e,r){var i=t.getSymbols(),n=new l;if(i.length){var a=e.createTemplateGroup(i[0],null,t,r);n.setDefault(a)}return n},l.prototype.size=function(){return 1},l.prototype.getDefault=function(){return this._defaultResult},l.prototype.setDefault=function(t){this._defaultResult=t},l.prototype.match=function(t,e,r){return this.getDefault()},l}(),a=function(l){function g(t,e,r,i,n){var a=l.call(this)||this;return a._intervals=[],a._isMaxInclusive=e,i?a._getValue=o.createArcadeFunction(i,n):t&&t.length?a._getValue="function"==typeof t?(a._field=null,t):(a._field=t,a._normalizationInfo=r,a._getValueFromField.bind(a)):a._field=null,a}return r(g,l),g.fromCBRenderer=function(t,e,r){for(var i=t.isMaxInclusive,n=t.valueExpression,a=t.normalizationField,l=t.normalizationTotal,o=t.normalizationType,u=new g(t.field,i,{normalizationField:a,normalizationTotal:l,normalizationType:o},n,r),s=t.backgroundFillSymbol,f=0,p=t.classBreakInfos;f<p.length;f++){var c=p[f],d=c.symbol,h=e.createTemplateGroup(d,s,t,r),m={min:c.minValue,max:c.maxValue};u.add(m,h)}var _=t.defaultSymbol;if(_){var v=e.createTemplateGroup(_,s,t,r);u.setDefault(v)}return u},g.prototype.add=function(t,e){this._intervals.push({interval:t,result:e}),this._intervals.sort(function(t,e){return t.interval.min-e.interval.min})},g.prototype.size=function(){return l.prototype.size.call(this)+this._intervals.length},g.prototype.match=function(t,e,r){if(!this._getValue)return this.getDefault();var i=this._getValue(t,e,r);if(!i&&(null==i||isNaN(i)))return this.getDefault();for(var n=0;n<this._intervals.length;n++){var a=this._intervals[n],l=a.interval,o=a.result,u=i>=l.min,s=this._isMaxInclusive?i<=l.max:i<l.max;if(u&&s)return o}return this.getDefault()},g.prototype._needsNormalization=function(){var t=this._normalizationInfo;return t&&(t.normalizationField||t.normalizationTotal||t.normalizationType)},g.prototype._getValueFromField=function(t){var e=t.attributes[this._field];if(!this._needsNormalization())return e;var r=this._normalizationInfo,i=r.normalizationField,n=r.normalizationTotal,a=r.normalizationType,l=!!i&&t.attributes[i];if(a)switch(a){case"field":return l?e/l:void 0;case"log":return Math.log(e)*Math.LOG10E;case"percent-of-total":return e/n*100;default:return void u.error("Found unknown normalization type: "+a)}else u.error("Normalization is required, but no type was set!")},g}(e.default=n);e.IntervalMatcher=a;var l=function(a){function h(t,e,r,i){var n=a.call(this)||this;return n._resultsMap=new Map,r?n._getValue=o.createArcadeFunction(r,i):t&&t.length?"function"==typeof t[0]?(n._fields=null,n._getValue=t[0]):(n._fields=t,n._seperator=e||"",n._getValue=n._getValueFromFields.bind(n)):n._fields=null,n}return r(h,a),h.fromUVRenderer=function(t,e,r){var i=t.uniqueValueInfos,n=t.fieldDelimiter,a=t.valueExpression,l=[t.field];t.field2&&l.push(t.field2),t.field3&&l.push(t.field3);for(var o=t.backgroundFillSymbol,u=new h(l,n,a,r),s=0,f=i;s<f.length;s++){var p=f[s],c=e.createTemplateGroup(p.symbol,o,t,p);u.add(p.value,c)}if(t.defaultSymbol){var d=e.createTemplateGroup(t.defaultSymbol,o,t,r);u.setDefault(d)}return u},h.prototype.add=function(t,e){this._resultsMap.set(t.toString(),e)},h.prototype.size=function(){return a.prototype.size.call(this)+this._resultsMap.size},h.prototype.match=function(t,e,r){if(!this._getValue)return this.getDefault();var i=this._getValue(t,e,r);if(!i&&null==i)return this.getDefault();var n=i.toString();return this._resultsMap.has(n)?this._resultsMap.get(n):this.getDefault()},h.prototype._getValueFromFields=function(t){for(var e=[],r=0,i=this._fields;r<i.length;r++){var n=i[r],a=t.attributes[n];e.push(a)}return e.join(this._seperator)},h}(n);e.MapMatcher=l});