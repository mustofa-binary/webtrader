define(["common/rivetsExtra","jquery","windows/windows","websockets/binary_websockets","common/util","jquery-growl"],function(a,b,c,d){"use strict";function e(a){return a&&a.__esModule?a:{"default":a}}var f=(e(a),e(b)),g=e(c),h=e(d);h["default"].events.on("login",function(){h["default"].send({get_account_status:1}).then(function(a){var b=a.get_account_status.status,c="";if(-1!==f["default"].inArray("authenticated",b)?-1!==f["default"].inArray("unwelcome",b)?c=f["default"]("<span/>",{html:"Your account is currently suspended. Only withdrawals are now permitted. For further information, please contact %1.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')}):-1!==f["default"].inArray("cashier_locked",b)?c=f["default"]("<span/>",{html:"Deposits and withdrawal for your account is not allowed at this moment. Please contact %1 to unlock it.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')}):-1!==f["default"].inArray("withdrawal_locked",b)&&(c=f["default"]("<span/>",{html:"Withdrawal for your account is not allowed at this moment. Please contact %1 to unlock it.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')})):-1!==f["default"].inArray("unwelcome",b)&&(c=f["default"]("<span/>",{html:"To authenticate your account, kindly email the following to %1:".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')}),c.append(f["default"]('<ul class="checked">').append(f["default"]("<li>",{html:"A scanned copy of your passport, driving licence (provisional or full) or identity card, showing your name and date of birth. Your document must be valid for at least 6 months after this date.".i18n()}),f["default"]("<li>",{html:"A scanned copy of a utility bill or bank statement (no more than 3 months old".i18n()})))),c){c=f["default"]("<div class='notice-msg' />").append(c);var d=g["default"].createBlankWindow(f["default"]("<div/>").append(c).i18n(),{title:"Notice Message".i18n(),dialogClass:"dialog-message",width:700,height:"auto",resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!0,closeOnEscape:!1,modal:!0,ignoreTileAction:!0,close:function(){d.dialog("destroy")}});d.dialog("open")}})})});