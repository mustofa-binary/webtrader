define(["jquery","jquery-ui","color-picker","common/loadCSS"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){loadCSS("charts/indicators/trima/trima.css"),a.get("charts/indicators/trima/trima.html",function(e){var f="#cd0a0a";e=a(e),e.appendTo("body"),e.find("input[type='button']").button(),e.find("#trima_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#trima_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted},ok:function(b,c){a("#trima_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted}}),e.dialog({autoOpen:!1,resizable:!1,modal:!0,width:320,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){require(["validation/validation"],function(c){return c.validateNumericBetween(e.find(".trima_input_width_for_period").val(),parseInt(e.find(".trima_input_width_for_period").attr("min")),parseInt(e.find(".trima_input_width_for_period").attr("max")))?(require(["charts/indicators/highcharts_custom/trima"],function(b){b.init();var c={period:parseInt(e.find(".trima_input_width_for_period").val()),stroke:f,strokeWidth:parseInt(e.find("#trima_strokeWidth").val()),dashStyle:e.find("#trima_dashStyle").val(),appliedTo:parseInt(e.find("#trima_appliedTo").val())};a(a(".trima").data("refererChartID")).highcharts().series[0].addTRIMA(c)}),void b.call(e)):void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+e.find(".trima_input_width_for_period").attr("min")+" to "+e.find(".trima_input_width_for_period").attr("max")+" is allowed for "+e.find(".trima_input_width_for_period").closest("tr").find("td:first").text()+"!"})})})}},{text:"Cancel",click:function(){b.call(this)}}]}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".trima").length?void c(b,this.open):void a(".trima").data("refererChartID",b).dialog("open")}}});