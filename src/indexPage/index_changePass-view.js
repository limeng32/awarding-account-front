KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function index_changePassView(undefined){
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


buffer.data += '<form class="form-horizontal" method="post" action="" id="J_Auth">\n    <div class="control-group">\n        <label class="control-label">邮件地址：</label>\n\n        <div class="controls">\n            <input type="text" required="" required-msg="邮件地址不能为空" max-len="100" email="email"\n                   changePass-email-exist="changePass-email-exist" id="icpv2">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">验证码：</label>\n\n        <div class="controls">\n            <input type="text" required="" required-msg="验证码不能为空" id="icpv1"\n                   changePass-checkCaptcha="changePass-checkCaptcha">\n            <span id="icpv5">获取验证码</span>\n            <span id="icpv6">\n                <img id="icpv6_img" src="" title="点我可刷新" hidden="hidden">\n            </span>\n        </div>\n    </div>\n    <div class="">\n        <label class="control-label"></label>\n        <div class="controls-hidden">\n            <input hidden="hidden" id="icpv3" sendEmail="sendEmail" sendEmail-msg="#sendEmailMsg">\n        </div>\n    </div>\n    <input id="icpv4" hidden="hidden" needAFail="needAFail"/>\n    <div class="form-actions">\n        <input class="ks-button ks-button-primary ks-button-shown" type="submit" value="发送">\n    </div>\n</form>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});