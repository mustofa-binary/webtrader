define(["lodash","jquery","moment","windows/windows","common/rivetsExtra","websockets/binary_websockets","charts/chartingRequestMap","text!trade/tradeDialog.html","css!trade/tradeDialog.css","timepicker","jquery-ui"],function(a,b,c,d,e,f,g,h){function i(b){return a(b).filter({contract_category_display:"Up/Down",barrier_category:"euro_atm",contract_display:"higher"}).each(m("contract_display","rise")),a(b).filter({contract_category_display:"Up/Down",barrier_category:"euro_atm",contract_display:"lower"}).each(m("contract_display","fall")),a(b).filter(["contract_category_display","Stays In/Goes Out"]).each(m("contract_category_display","In/Out")),a(b).filter(["contract_category_display","Ends In/Out"]).each(m("contract_category_display","In/Out")),a(b).filter(["contract_category_display","Digits"]).each(m("barriers",0)),a(b).filter(["contract_display","ends outside"]).each(m("contract_display","ends out")),a(b).filter(["contract_display","ends between"]).each(m("contract_display","ends in")),a(b).filter(["contract_display","stays between"]).each(m("contract_display","stays in")),a(b).filter(["contract_display","goes outside"]).each(m("contract_display","goes out")),a(b).filter(["contract_display","touches"]).each(m("contract_display","touch")),a(b).filter(["contract_display","does not touch"]).each(m("contract_display","no touch")),b=a.sortBy(b,function(a){var b={"Up/Down":1,"Touch/No Touch":2,"In/Out":3,Digits:4,Asians:5,Spreads:6}[a.contract_category_display];return 4===b&&(b={odd:4,even:4.5}[a.contract_display]||3.5),b})}function j(a,b){return f.cached.send({trading_times:a}).then(function(a){var c={open:"--",close:"--"};return a.trading_times.markets.forEach(function(a){a.submarkets.forEach(function(a){a.symbols.forEach(function(a){a.symbol===b&&(c={open:a.times.open[0],close:a.times.close[0]})})})}),c})["catch"](function(a){return{open:"--",close:"--"}})}function k(d,e,g,h){var i={duration:{array:["Duration","End Time"],value:"Duration"},duration_unit:{array:[""],ranges:[{min:1,max:365}],value:""},duration_count:{value:1,min:1,max:365},date_start:{value:"now",array:[{text:"Now",value:"now"}],visible:!1},date_expiry:{value_date:c.utc().format("YYYY-MM-DD"),value_hour:c.utc().format("HH:mm"),value:0,today_times:{open:"--",close:"--",disabled:!1},onHourShow:function(a){var b=i.date_expiry.today_times;if("--"===b.open)return!0;var d=c.utc(),e=c(b.close,"HH:mm:ss").hour(),f=c(b.open,"HH:mm:ss").hour();return d.hour()>=f&&d.hour()<=e&&(f=d.hour()),a>=f&&e>=a||e>=a&&f>=e||a>=f&&f>=e},onMinuteShow:function(a,b){var d=i.date_expiry.today_times;if("--"===d.open)return!0;var e=c.utc(),f=c(d.close,"HH:mm:ss").hour(),g=c(d.close,"HH:mm:ss").minute(),h=c(d.open,"HH:mm:ss").hour(),j=c(d.open,"HH:mm:ss").minute();return e.hour()>=h&&e.hour()<=f&&(h=e.hour(),j=e.minute()),h===a?b>=j:f===a?g>=b:a>h&&f>a||f>a||a>h}},categories:{array:[],value:"",paddingTop:function(){var a={Asians:"26px","Up/Down":"16px",Digits:"14px","In/Out":"4px","Touch/No Touch":"16px",Spreads:"5px"};return a[i.categories.value]||"3px"}},category_displays:{array:[],selected:""},barriers:{barrier_count:0,barrier:"",high_barrier:"",low_barrier:"",barrier_live:function(){return 1*this.barrier+1*i.tick.quote},high_barrier_live:function(){return 1*this.high_barrier+1*i.tick.quote},low_barrier_live:function(){return 1*this.low_barrier+1*i.tick.quote}},digits:{array:["0","1","2","3","4","5","6","7","8","9"],value:"0",visible:!1,text:"Last Digit Prediction"},currency:{array:["USD"],value:"USD"},basis:{array:["Payout","Stake"],value:"payout",amount:10,limit:null},spreads:{amount_per_point:1,stop_type:"point",stop_loss:10,stop_profit:10,spread:0,spot:"0.0",spot_time:"0",deposit_:function(){return"point"===this.stop_type?this.stop_loss*this.amount_per_point:this.stop_loss}},tick:{epoch:"0",quote:"0",perv_quote:"0",down:function(){var a=1*this.quote<1*this.perv_quote;return a}},ticks:{array:[],loading:!0},proposal:{symbol:h.symbol,symbol_name:h.display_name,ids:[],req_id:-1,ask_price:"0.0",date_start:0,display_value:"0.0",message:"Loading ...",payout:0,spot:"0.0",spot_time:"0",error:"",loading:!0,netprofit_:function(){return i.currency.value+" "+(this.payout-this.ask_price||0).toFixed(2)},return_:function(){var a=((this.payout-this.ask_price)/this.ask_price||0).toFixed(2);return(100*a|0)+"%"}},purchase:{loading:!1},tooltips:{barrier:{my:"left-215 top+10",at:"left bottom",collision:"flipfit"},barrier_p:{my:"left-5 top+10",at:"left bottom",collision:"flipfit"}}};i.barriers.root=i,i.date_expiry.update_times=function(){j(i.date_expiry.value_date,i.proposal.symbol).then(function(b){var d=i.date_expiry;d.today_times.open=b.open,d.today_times.close=b.close;var e=a(i.duration_unit.ranges).filter(["type","minutes"]).head();d.today_times.disabled=!e;var f=e?c.utc().add(e.min+1,"m").format("HH:mm"):"00:00";d.value_hour=f>d.value_hour?f:d.value_hour})},i.categories.update=function(){var b=i.categories.value;i.category_displays.array=a(d).filter(["contract_category_display",b]).map("contract_display").uniq().value(),i.category_displays.selected=a.head(i.category_displays.array)},i.category_displays.onclick=function(a){i.category_displays.selected=b(a.target).attr("data")},i.date_start.update=function(){var b=a(d).filter({contract_category_display:i.categories.value,contract_display:i.category_displays.selected,start_type:"forward"}).head();if(!b)return void a.assign(i.date_start,{visible:!1,array:[],value:"now"});b=b.forward_starting_options;var c=(i.date_start,[{text:"Now",value:"now"}]),e=((new Date).getTime()+3e5)/1e3;a.each(b,function(a){var b=300,d=Math.ceil(Math.max(e,a.open)/b)*b;to=a.close;for(var f=d;f<to;f+=b){var g=new Date(1e3*f),h=("00"+g.getUTCHours()).slice(-2)+":"+("00"+g.getUTCMinutes()).slice(-2)+" "+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][g.getUTCDay()];c.push({text:h,value:f})}});var f={value:"now",array:c,visible:!0};a.some(c,{value:1*i.date_start.value})&&(f.value=i.date_start.value),a.assign(i.date_start,f)},i.date_expiry.update=function(a){var b=i.date_expiry,d=!c.utc(b.value_date).isAfter(c.utc(),"day");d?(a!==b.value_hour&&b.update_times(),b.value=c.utc(b.value_date+" "+b.value_hour).unix(),n(b.value,i.proposal.onchange)):(b.today_times.disabled=!0,j(b.value_date,i.proposal.symbol).then(function(a){var d="--"!==a.close?a.close:"00:00:00";b.value_hour=c(d,"HH:mm:ss").format("HH:mm"),b.value=c.utc(b.value_date+" "+d).unix(),n(b.value,i.proposal.onchange)}))},i.duration.update=function(){var b=i.categories.value;a(["Up/Down","In/Out","Touch/No Touch"]).includes(b)?2!==i.duration.array.length&&(i.duration.array=["Duration","End Time"]):(i.duration.value="Duration",1!==i.duration.array.length&&(i.duration.array=["Duration"]))},i.duration_unit.update=function(){var b="now"!==i.date_start.value?"forward":"spot",c=a(d).filter({contract_category_display:i.categories.value,contract_display:i.category_displays.selected,start_type:b}).map(function(a){return{min:a.min_contract_duration+"",max:a.max_contract_duration+"",type:a.expiry_type}}).value(),e=[],f=[];a.each(c,function(b){if(a(["tick","daily"]).includes(b.type))return e.push({tick:"ticks",daily:"days"}[b.type]),void f.push({min:0|b.min.replace("d","").replace("t",""),max:0|b.max.replace("d","").replace("t",""),type:{tick:"ticks",daily:"days"}[b.type]});var c=b.min.replace("s","").replace("m","").replace("h",""),d=b.max.replace("s","").replace("m","").replace("h","").replace("d",""),g=a(b.min).last(),h=a(b.max).last();c*={s:1,m:60,h:3600}[g],d*={s:1,m:60,h:3600,d:86400}[h],"s"===g&&(e.push("seconds"),f.push({min:c,max:d,type:"seconds"})),a(["s","m"]).includes(g)&&d>=60&&(e.push("minutes"),f.push({min:Math.max(c/60,1),max:d/60,type:"minutes"})),a(["s","m","h"]).includes(g)&&d>=3600&&(e.push("hours"),f.push({min:Math.max(c/3600,1),max:d/3600,type:"hours"}))});var g={ticks:0,seconds:1,minutes:2,hours:3,days:4};return e.sort(function(a,b){return g[a]-g[b]}),f.sort(function(a,b){return g[a.type]-g[b.type]}),e.length?(i.duration_unit.ranges=f,a.includes(e,i.duration_unit.value)?i.duration_count.update(!0):i.duration_unit.value=a.head(e),i.duration_unit.array=e,i.barriers.update(),void i.date_expiry.update_times()):void i.barriers.update()},i.duration_count.update=function(b){var c=a(i.duration_unit.ranges).filter({type:i.duration_unit.value}).head();c&&(i.duration_count.min=c.min,i.duration_count.max=c.max,b!==!0?i.duration_count.value=c.min:(i.duration_count.value<c.min||i.duration_count.value>c.max)&&(i.duration_count.value=c.min))},i.digits.update=function(){var b=i.category_displays.selected;if("Digits"!==i.categories.value||"odd"===b||"even"===b)return void(i.digits.visible=!1);var c={matches:["0","1","2","3","4","5","6","7","8","9"],differs:["0","1","2","3","4","5","6","7","8","9"],under:["1","2","3","4","5","6","7","8","9"],over:["0","1","2","3","4","5","6","7","8"]}[b],d={matches:"Last Digit Prediction",differs:"Last Digit Prediction",under:"Last Digit is Under",over:"Last Digit is Over"}[b];a.includes(c,i.digits.value)||(i.digits.value=c[0]),i.digits.array=c,i.digits.text=d,i.digits.visible=!0},i.barriers.update=function(){var b=i.duration_unit.value,c=a(["seconds","minutes","hours"]).includes(b)?"intraday":"days"===b?"daily":"tick",e=a(d).filter({contract_category_display:i.categories.value,contract_display:i.category_displays.selected,expiry_type:c}).filter(function(a){return a.barriers>=1}).head();i.barriers.barrier_count=e?e.barriers:0,e&&(e.barrier&&(i.barriers.barrier="+"+1*(i.barriers.barrier||e.barrier)),e.high_barrier&&(i.barriers.high_barrier="+"+1*(i.barriers.high_barrier||e.high_barrier)),e.low_barrier&&(i.barriers.low_barrier=1*(i.barriers.low_barrier||e.low_barrier)))},i.basis.update_limit=function(){var b=i.basis,c=a(d).filter({contract_category_display:i.categories.value,contract_display:i.category_displays.selected}).head();c=c&&c.payout_limit||null,b.limit=c?1*c:null,b.limit&&(b.amount=Math.min(b.amount,b.limit))},i.proposal.onchange=function(){var b=i.duration_unit.value,c=a(["seconds","minutes","hours"]).includes(b)?"intraday":"days"===b?"daily":"tick";"Spreads"===i.categories.value&&(c="intraday");var e=a(d).filter({contract_category_display:i.categories.value,contract_display:i.category_displays.selected,expiry_type:c}).head(),g={proposal:1,subscribe:1,contract_type:e.contract_type,currency:i.currency.value,symbol:i.proposal.symbol};if("Spreads"!==i.categories.value?(g.amount=1*i.basis.amount,g.basis=i.basis.value):(g.amount_per_point=i.spreads.amount_per_point,g.stop_type=i.spreads.stop_type,g.stop_loss=i.spreads.stop_loss,g.stop_profit=i.spreads.stop_profit),1==i.barriers.barrier_count&&(g.barrier=i.barriers.barrier),2==i.barriers.barrier_count&&(g.barrier=i.barriers.high_barrier,g.barrier2=i.barriers.low_barrier+""),"Digits"===i.categories.value&&(g.barrier=i.digits.value+""),"now"!==i.date_start.value&&(g.date_start=1*i.date_start.value),"Duration"===i.duration.value){if(g.duration_unit=a(i.duration_unit.value).head(),i.duration_count.value<1)return void(i.duration_count.value=1);g.duration=1*i.duration_count.value}else g.date_expiry=i.date_expiry.value;for(i.proposal.loading=!0;i.proposal.ids.length;){var h=i.proposal.ids.shift();f.send({forget:h})}f.send(g).then(function(a){var b=a.proposal.id;i.proposal.ids.push(b),i.proposal.error="",i.proposal.req_id=a.req_id})["catch"](function(a){i.proposal.error=a.message,i.proposal.message=""})},i.purchase.onclick=function(){i.purchase.loading=!0;var c=function(a){a.appendTo(e),e.find(".trade-fields").css({left:"350px"}),e.find(".trade-conf").css({left:"0"})},d=function(a){e.find(".trade-fields").css({left:"0"}),e.find(".trade-conf").css({left:"-350px"}),i.purchase.loading=!1,a.remove(),i.proposal.onchange()},g={currency:i.currency.value,symbol:i.proposal.symbol,symbol_name:i.proposal.symbol_name,category:i.categories.value,category_display:i.category_displays.selected,duration_unit:i.duration_unit.value};g.show_tick_chart=!1,a(["Digits","Up/Down","Asians"]).includes(g.category)&&"Duration"===i.duration.value&&"ticks"===g.duration_unit&&(g.digits_value=i.digits.value,g.tick_count=1*i.duration_count.value,"Digits"!==g.category&&(g.tick_count+=1,g.show_tick_chart=!0)),f.is_authenticated()?f.send({buy:a(i.proposal.ids).last(),price:1*i.proposal.ask_price}).then(function(a){require(["trade/tradeConf"],function(b){g.contract_id=a.buy.contract_id,g.transaction_id=a.buy.transaction_id,b.init(a,g,c,d)})})["catch"](function(a){i.purchase.loading=!1,b.growl.error({message:a.message}),i.proposal.onchange()}):(b.growl.warning({message:"Please login with real account in order to Purchase"}),i.purchase.loading=!1)},i.categories.array=a(d).map("contract_category_display").uniq().value(),i.categories.value=a(i.categories.array).includes("Up/Down")?"Up/Down":a(i.categories.array).head();var k=!1;return f.events.on("tick",function(a){a.tick&&a.tick.symbol==i.proposal.symbol&&(k=!0,i.tick.perv_quote=i.tick.quote,i.tick.epoch=a.tick.epoch,i.tick.quote=a.tick.quote,i.ticks.loading=!1,i.ticks.array.length>30&&i.ticks.array.shift(),i.ticks.array.push(a.tick))}),f.events.on("proposal",function(a){if(a.req_id===i.proposal.req_id){if(a.error)return i.proposal.error=a.error.message,void(i.proposal.message="");if(!i.purchase.loading){var b=a.proposal;i.proposal.ask_price=b.ask_price,i.proposal.date_start=b.date_start,i.proposal.display_value=b.display_value,i.proposal.message=b.longcode,i.proposal.payout=b.payout,i.proposal.spot=b.spot,i.proposal.spot_time=b.spot_time,i.spreads.spread=b.spread||0,i.spreads.spot=b.spot||"0.0",i.spreads.spot_time=b.spot_time||"0",i.proposal.loading=!1,k||(i.tick.epoch=b.spot_time,i.tick.quote=b.spot)}}}),f.is_authenticated()&&f.send({payout_currencies:1}).then(function(a){i.currency.value=a.payout_currencies[0],i.currency.array=a.payout_currencies})["catch"](function(a){}),i}function l(c,j){var l=b(h),m=i(j.available),n=d.createBlankWindow(l,{title:c.display_name,resizable:!1,collapsable:!0,minimizable:!0,maximizable:!1,"data-authorized":"true",close:function(){for(;q.proposal.ids.length;){var a=q.proposal.ids.shift();f.send({forget:a})}g.unregister(o),r.unbind()}}),o=g.keyFor(c.symbol,0),p=a(m).map("min_contract_duration").some(function(b){return/^\d+$/.test(b)||"t"===a.last(b)});g[o]?g.subscribe(o):g.register({symbol:c.symbol,subscribe:1,granularity:0,count:1e3,style:"ticks"})["catch"](function(c){p&&(b.growl.error({message:c.message}),a.delay(function(){n.dialog("close")},2e3))});var q=k(m,l,n,c);p||(q.ticks.loading=!1);var r=e.bind(l[0],q);q.categories.update(),n.dialog("open")}require(["trade/tradeConf"]);var m=function(a,b){return function(c){return c[a]=b,c}},n=e.formatters.debounce;return{init:l}});