define(["charts/chartWindow","common/util"],function(){"use strict";function a(a,b){var c=$("#"+a+"_header").find("li.overlay");isDataTypeClosePriceOnly(b)?c.removeClass("ui-state-disabled"):c.addClass("ui-state-disabled"),c.closest("ul.ui-menu").menu("refresh")}return{init:function(b,c,d){$.get("charts/chartOptions.html",function(e){e=$(e),e.find(".chartMenuHamburgerMenu").hover(function(){$(this).toggleClass("ui-state-hover").toggleClass("ui-state-active")}).click(function(){return $(this).toggleClass("active").next("ul:first").toggle(),!1}).focusout(function(){$(this).removeClass("active").next("ul:first").menu().hide()}),e.find("ul:first").menu(),isTick(c)&&e.find(".candlestick, .ohlc").addClass("ui-state-disabled"),e.find(".chartType li").click(function(){if(!$(this).hasClass("ui-state-disabled")){var c=$(this).attr("class").split(" ")[0].replace(".","").trim();$("#"+b+"_chart").data("type",c),require(["charts/charts"],function(a){a.refresh("#"+b+"_chart")}),a(b,c),$(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()}}),e.find("ul:first > li").each(function(){$(this).click(function(){if(!$(this).hasClass("ui-state-disabled"))if($(this).hasClass("logScaleLI")){var a=$("#"+b+"_chart").highcharts().series[0];a.yAxis.update({type:"logarithmic"==a.yAxis.options.type?"linear":"logarithmic"}),$(this).find("span:first").toggleClass("ui-icon ui-icon-check"),$(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()}else $(this).hasClass("crosshairLI")?(require(["charts/crosshair"],function(a){a.toggleCrossHair("#"+b+"_chart")}),$(this).find("span:first").toggleClass("ui-icon ui-icon-check"),$(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()):$(this).hasClass("refresh")?(require(["charts/charts"],function(a){a.refresh("#"+b+"_chart")}),$(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()):$(this).hasClass("currentPriceLI")&&(require(["currentPriceIndicator"],function(a){var c="#"+b+"_chart",d=$(c).highcharts(),e=!1;$.each(d.series,function(b,c){$.each(a.getCurrentPriceOptions(),function(a,b){b&&c.options&&c.options.id&&b.parentSeriesID==c.options.id&&(c.removeCurrentPrice(a),e=!0)})}),e||$.each(d.series,function(){$(this).data("isInstrument")&&this.addCurrentPrice()})}),$(this).find("span:first").toggleClass("ui-icon ui-icon-check"),$(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click())})}),e.find(".indicators li").click(function(){$(this).hasClass("addInidicators")?require(["charts/indicators/indicators_add"],function(a){a.openDialog("#"+b+"_chart")}):$(this).hasClass("removeIndicators")&&require(["charts/indicators/indicators_remove"],function(a){a.openDialog("#"+b+"_chart")})}),e.find(".overlay li").click(function(){$(this).hasClass("addOverlay")?require(["overlay/overlay_add"],function(a){a.openDialog("#"+b+"_chart")}):$(this).hasClass("removeOverlay")&&require(["overlay/overlay_remove"],function(a){a.openDialog("#"+b+"_chart")})}),e.find(".drawLI li").click(function(){$(this).hasClass("addChartObject")?require(["charts/draw/chartobject_add"],function(a){a.openDialog("#"+b+"_chart")}):$(this).hasClass("removeChartObject")&&require(["charts/draw/chartobject_remove"],function(a){a.openDialog("#"+b+"_chart")})}),$("#"+b+"_header").prepend(e),a(b,d)})},disableEnableLogMenu:function(a,b){var c=$("#"+a+"_header").find("li.logScaleLI");b?c.removeClass("ui-state-disabled"):c.addClass("ui-state-disabled")},triggerToggleLogScale:function(a){$("#"+a+"_header").find("li.logScaleLI").click()},isCurrentViewInLogScale:function(a){var b=$("#"+a+"_header").find("li.logScaleLI");return b.find("span:first").hasClass("ui-icon-check")&&!b.hasClass("ui-state-disabled")},disableEnableCandlestick:function(a,b){var c=$("#"+a+"_header").find("li.candlestick");b?c.removeClass("ui-state-disabled"):c.addClass("ui-state-disabled")},disableEnableOHLC:function(a,b){var c=$("#"+a+"_header").find("li.ohlc");b?c.removeClass("ui-state-disabled"):c.addClass("ui-state-disabled")},disableEnableOverlay:function(b,c){a(b,c)}}});