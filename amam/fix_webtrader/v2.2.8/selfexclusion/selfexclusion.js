define(["exports","jquery","windows/windows","websockets/binary_websockets","lodash","common/rivetsExtra","moment","text!selfexclusion/selfexclusion.html","accountstatus/accountstatus","jquery-growl","common/util"],function(e,t,i,l,n,a,u,s,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var d=g(t),r=g(i),m=g(l),c=g(n),f=g(a),_=g(u),x=g(s),h=g(o);function g(e){return e&&e.__esModule?e:{default:e}}var v=null,y=null,w=null,p={max_balance:{limit:1e20,set:!1,name:"Maximum balance".i18n()},max_turnover:{limit:1e20,set:!1,name:"Daily turnover limit".i18n()},max_losses:{limit:1e20,set:!1,name:"Daily limit on losses".i18n()},max_7day_turnover:{limit:1e20,set:!1,name:"7-day turnover limit".i18n()},max_7day_losses:{limit:1e20,set:!1,name:"7-day limit on losses".i18n()},max_30day_turnover:{limit:1e20,set:!1,name:"30-day turnover limit".i18n()},max_30day_losses:{limit:1e20,set:!1,name:"30-day limit on losses".i18n()},max_open_bets:{limit:101,set:!1,name:"Maximum open positions".i18n()},session_duration_limit:{limit:60480,set:!1,name:"Session duration limit".i18n()},exclude_until:{limit:null,set:!1,name:"Exclude time".i18n()},timeout_until:{limit:null,set:!1,name:"Time out until".i18n()}},b={max_balance:null,max_turnover:null,max_losses:null,max_7day_turnover:null,max_7day_losses:null,max_30day_turnover:null,max_30day_losses:null,max_open_bets:null,session_duration_limit:null,exclude_until:null,has_exclude_until:null,is_iom_malta:null,is_gamstop_client:null,timeout_until_date:null,timeout_until_time:null,binary_url_contact:getBinaryUrl("contact"),trimString:function(e,t){var i=(0,d.default)(e.target),l=currencyFractionalDigits(),n=(i.attr("maxlength"),new RegExp("[\\d]{0,20}(\\.[\\d]{1,"+l+"})?","g")),a=(i.val().toString().match(n)||[])[0];t[i.attr("rv-value")]=a},update:function(e,i){var l={set_self_exclusion:1},n=[];if(i.timeout_until_date){var t=(0,_.default)(i.timeout_until_date);if(i.timeout_until_time){var a=(0,_.default)(i.timeout_until_time,"HH:mm");t.add(a.format("HH"),"hours").add(a.format("mm"),"minutes")}t.isAfter((0,_.default)().add(6,"weeks"))&&n.push("Please enter a value less than 6 weeks for time out until.".i18n()),t.isAfter((0,_.default)())||n.push("Exclude time must be after today.".i18n()),i.timeout_until=t.unix()}else i.timeout_until_time&&n.push("Please select a date for time out until.".i18n());if(d.default.each(p,function(e,t){if(i[e]=i[e]&&i[e].toString(),i[e]||t.set){if("exclude_until"===e){if(_.default.utc(i.exclude_until,"YYYY-MM-DD").isBefore(_.default.utc().startOf("day").add(6,"months")))return void n.push("Exclude until time cannot be less than 6 months.".i18n());if(_.default.utc(i.exclude_until,"YYYY-MM-DD").isAfter(_.default.utc().startOf("day").add(5,"years")))return void n.push("Exclude until time cannot be more than 5 years.".i18n())}if(i[e]&&-1!==i[e].indexOf("e"))return void n.push("Please enter a valid value for ".i18n()+t.name);if(!i[e]||i[e]<=0||t.limit&&i[e]>t.limit)return void n.push("Please enter a value between 0 and ".i18n()+t.limit+" for ".i18n()+t.name);l[e]=i[e]}else i[e]=void 0}),0<n.length)n.forEach(function(e,t){d.default.growl.error({message:e,fixed:!0})});else{if(l.timeout_until||l.exclude_until)if(0==window.confirm('When you click "Ok" you will be excluded from trading on the site until the selected date.'.i18n()))return;m.default.send(l).then(function(e){d.default.growl.notice({message:"Your changes have been updated".i18n()}),Y(),H(),M()}).catch(function(e){d.default.growl.error({message:e.message,fixed:!0})})}}};function Y(){var e=local_storage.get("authorize");b.exclude_until?_.default.utc(b.exclude_until,"YYYY-MM-DD").isAfter(_.default.utc().startOf("day"))&&(local_storage.set("excluded",!0),h.default.recheckStatus(e),c.default.defer(function(){d.default.growl.error({message:"You have excluded yourself until ".i18n()+b.exclude_until})})):b.timeout_until?_.default.unix(b.timeout_until).isAfter((0,_.default)().unix().valueOf())&&(local_storage.set("excluded",!0),h.default.recheckStatus(e),d.default.growl.error({message:"You have excluded yourself until ".i18n()+_.default.unix(b.timeout_until).utc().format("YYYY-MM-DD HH:mm")+"GMT"})):(local_storage.set("excluded",!1),h.default.recheckStatus(e))}function k(){v&&v.dialog("destroy"),v=null,y&&clearTimeout(y),w=y=null,b.max_balance=null,b.max_turnover=null,b.max_losses=null,b.max_7day_turnover=null,b.max_7day_losses=null,b.max_30day_turnover=null,b.max_30day_losses=null,b.max_open_bets=null,b.session_duration_limit=null,(b.exclude_until=null,d.default)(".resources a.selfexclusion").addClass("disabled")}var M=function(){return d.default.growl.notice({message:"Loading self-exclusion settings.".i18n()}),m.default.send({get_self_exclusion:1}).then(function(i){if(i.get_self_exclusion){d.default.each(p,function(e,t){b[e]=i.get_self_exclusion[e],i.get_self_exclusion[e]&&(p[e].limit=i.get_self_exclusion[e],p[e].set=!0)}),b.has_exclude_until=i.get_self_exclusion.exclude_until;var e=D();b.is_iom_malta=e.has_iom_malta,b.is_gamstop_client=e.has_uk&&e.has_iom_malta,Y()}}).catch(function(e){d.default.growl.error({message:e.message,fixed:!0})})},D=function(){var e=local_storage.get("authorize");return{has_iom_malta:/iom|malta/.test(e.landing_company_name),has_uk:/gb/.test(e.country)}},H=function(){if(!c.default.isUndefined(b.session_duration_limit)&&!c.default.isNull(b.session_duration_limit)&&c.default.isFinite(c.default.toNumber(b.session_duration_limit))){y&&clearTimeout(y);var e=60*b.session_duration_limit*1e3;(e-=c.default.now()-w)>Math.pow(2,32)&&(e=Math.pow(2,32)),y=setTimeout(function(){d.default.growl.warning({message:"Logging out because of self-exclusion session time out!".i18n()}),m.default.invalidate()},e)}};m.default.events.on("login",function(e){m.default.cached.authorize().then(function(e){e.authorize.is_virtual?k():(w=c.default.now(),M().then(function(){H()}),(0,d.default)("#nav-menu a.selfexclusion").removeClass("disabled"))}).catch(function(e){k()})}),m.default.events.on("logout",k);var E=e.init=function(e){e.click(function(){(0,d.default)(this).hasClass("disabled")||m.default.cached.authorize().then(function(){v?(M(),v.moveToTop()):(require(["css!selfexclusion/selfexclusion.css"]),new Promise(function(e){var t=(0,d.default)(x.default).i18n();t.find(".datepicker").datepicker({dateFormat:"yy-mm-dd",minDate:_.default.utc().toDate(),maxDate:_.default.utc().add(6,"weeks").toDate()}),t.find(".timepicker").timepicker({timeFormat:"HH:MM"}),v=r.default.createBlankWindow((0,d.default)("<div/>"),{title:"Self-Exclusion Facilities".i18n(),dialogClass:"self-exclusion",width:900,minHeight:500,height:500,"data-authorized":"true",destroy:function(){v=null}}),t.appendTo(v),f.default.bind(t[0],b),M(),e()}).then(function(){v.dialog("open")}))}).catch(function(e){})})};e.default={init:E}});