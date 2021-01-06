define(["exports","jquery","windows/windows","websockets/binary_websockets","navigation/menu","lodash","moment","../common/marketUtils","datatables","jquery-growl","common/util"],function(e,t,a,n,i,s,r,h){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var p=u(t),v=u(a),l=u(n),b=u(i),o=(u(s),u(r));function u(e){return e&&e.__esModule?e:{default:e}}var c=null,d=null,m=e.init=function(e){require(["css!tradingtimes/tradingTimes.css"]),e.click(function(){d?d.moveToTop():((d=v.default.createBlankWindow((0,p.default)("<div/>"),{title:"Trading Times".i18n(),dialogClass:"tradingTimes",width:800,height:400})).track({module_id:"tradingTimes",is_unique:!0,data:null}),d.dialog("open"),require(["text!tradingtimes/tradingTimes.html"],f))})},f=function(e){var m=(e=(0,p.default)(e).i18n()).filter(".trading-times-sub-header");c=e.filter("table"),e.appendTo(d),(c=c.dataTable({data:[],columnDefs:[{className:"dt-body-center dt-header-center",targets:[0,1,2,3,4]}],paging:!1,ordering:!1,searching:!0,processing:!0})).parent().addClass("hide-search-input"),c.api().columns().every(function(){var e=this;(0,p.default)("input",this.header()).on("keyup change",function(){e.search()!==this.value&&e.search(this.value).draw()})});function t(a){function d(e,t,a){var n=e.getRowsFor(t,a);c.api().rows().remove(),c.api().rows.add(n),c.api().draw()}function n(e){var i,a,n,s=(i=b.default.extractFilteredMarkets(e[0]),a=[],n={},(i=i||[]).filter(function(e){var t=(local_storage.get("authorize")||{}).loginid||"";return/MF/gi.test(t)&&"Synthetic Indices"!==e.name||/MLT/gi.test(t)&&"Synthetic Indices"===e.name||/MX/gi.test(t)&&"Synthetic Indices"===e.name||!/MF/gi.test(t)&&!/MLT/gi.test(t)&&!/MX/gi.test(t)}).forEach(function(t){a.push(t.display_name),n[t.display_name]=[],t.submarkets.forEach(function(e){isRestrictedSymbol(e.name)||n[t.display_name].push(e.display_name)})}),{market_names:a,submarket_names:n,getRowsFor:function(t,a){var e=i.filter(function(e){return e.display_name==t})[0],n=e&&e.submarkets.filter(function(e){return e.display_name==a})[0].instruments;return(n||[]).map(function(e){return[e.display_name,e.times.open[0],e.times.close[0],e.times.settlement||e.settlement||"-",e.events&&0<e.events.length?e.events.map(function(e){return e.descrip+": "+e.dates}).join("<br>"):"-"]})}}),t=local_storage.get("active_symbols"),r=(0,h.getObjectMarketSubmarkets)(t),l=(0,h.getSortedMarkets)(t);if(!p.default.isEmptyObject(r)){if(null==f){var o=(0,p.default)("<select />");o.appendTo(m),(f=v.default.makeSelectmenu(o,{list:l,inx:0})).off("selectmenuchange",c),f.on("selectmenuchange",c)}else f.update_list(l),f.off("selectmenuchange",c),f.on("selectmenuchange",c);if(null==g){var u=(0,p.default)("<select />");u.appendTo(m),(g=v.default.makeSelectmenu(u,{list:(0,h.getSortedSubmarkets)(Object.keys(r[f.val()])),inx:0,changed:null})).off("selectmenuchange",c),g.on("selectmenuchange",c)}else g.update_list((0,h.getSortedSubmarkets)(Object.keys(r[f.val()]))),g.off("selectmenuchange",c),g.on("selectmenuchange",c);d(s,f.val(),g.val())}function c(){var e=(0,p.default)(this).val();if((r=(0,h.getObjectMarketSubmarkets)(local_storage.get("active_symbols")))[e]){var t=Object.keys(r[e]).filter(function(e){return!isRestrictedSymbol(e)});g.update_list((0,h.getSortedSubmarkets)(t))}d(s,f.val(),g.val())}}function t(){var e={trading_times:a},t=(0,p.default)("#"+c.attr("id")+"_processing");t.show(),Promise.all([l.default.cached.send(e)]).then(function(e){n(e),t.hide()}).catch(function(e){p.default.growl.error({message:e.message}),t.hide()})}t(),require(["websockets/binary_websockets"],function(e){e.events.on("login",t),e.events.on("logout",t)})}var f=null,g=null;t(o.default.utc().format("YYYY-MM-DD"));var a=o.default.utc().add(1,"years").toDate();d.addDateToHeader({title:"Date: ",date:o.default.utc().toDate(),changed:t,maxDate:a})};e.default={init:m}});