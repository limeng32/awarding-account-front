KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function signUpView(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];


buffer.data += '<form class="form-horizontal" method="post" action="" id="signUp">\r\n    <div class="control-group">\r\n        <label class="control-label">邮件地址：</label>\r\n\r\n        <div class="controls">\r\n            <input type="text" required="" required-msg="邮件地址不能为空" max-len="100" email="email"\r\n                   email-not-exist="email-not-exist" id="isuv2" placeholder="请输入邮件地址作为账号">\r\n        </div>\r\n    </div>\r\n    <div class="control-group">\r\n        <label class="control-label">密码：</label>\r\n\r\n        <div class="controls">\r\n            <input type="password" required="" required-msg="密码不能为空" id="isuv7" placeholder="您的密码"\r\n                   safe-password2="safe-password2" min-len="6" max-len="10">\r\n        </div>\r\n    </div>\r\n    <div class="control-group">\r\n        <label class="control-label">密码确认：</label>\r\n\r\n        <div class="controls">\r\n            <input type="password" required-msg="密码确认不能为空" id="isuv8" placeholder="再次输入密码" equal-field="isuv7"\r\n                   required="required" equal-field-msg="密码确认和密码需相同">\r\n        </div>\r\n    </div>\r\n    <div class="control-group">\r\n        <label class="control-label">验证码：</label>\r\n\r\n        <div class="controls">\r\n            <input type="text" required="" required-msg="验证码不能为空" id="isuv1"\r\n                   changePass-checkCaptcha2="changePass-checkCaptcha2" placeholder="见右方" disabled="disabled">\r\n            <span id="isuv5">获取验证码</span>\r\n            <span id="isuv6">\r\n                <img id="isuv6_img" src="" title="点我可刷新" hidden="hidden">\r\n            </span>\r\n        </div>\r\n    </div>\r\n    <div class="">\r\n        <label class="control-label"></label>\r\n\r\n        <div class="controls-hidden">\r\n            <input hidden="hidden" id="isuv3" sendEmail2="sendEmail2" sendEmail-msg="#sendEmailMsg">\r\n        </div>\r\n    </div>\r\n    <input id="isuv4" hidden="hidden" needAFail2="needAFail2"/>\r\n\r\n    <div class="form-actions">\r\n        <input class="ks-button ks-button-primary ks-button-shown" type="submit" value="发送">\r\n    </div>\r\n</form>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});