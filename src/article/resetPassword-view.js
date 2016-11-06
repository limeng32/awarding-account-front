KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function resetPasswordView(undefined){
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


buffer.data += '<form class="form-horizontal" id="J_Auth" method="post" action="">\n    <div class="control-group">\n        <label class="control-label" for="user">账号名称</label>\n\n        <div class="controls">\n            <input type="text" class="input-xlarge" name="user" id="user" value="';
pos.line = 6;
var id0 = ((t=(affix.account)) !== undefined ? affix.account.email:((t = data.account) !== undefined ? (t.email) :scope.resolveLooseUp(["account","email"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '" required>\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label">输入密码</label>\n\n        <div class="controls">\n            <input type="text" class="input-xlarge" name="again-user" equal-field="user">\n        </div>\n    </div>\n    <div class="control-group">\n        <label class="control-label" for="money">再次输入密码</label>\n\n        <div class="controls">\n            <input type="text" class="input-xlarge" name="money" id="money" number="true" max="200" min="100">\n        </div>\n    </div>\n    <div class="form-actions">\n        <input class="ks-button ks-button-primary ks-button-shown" type="submit" value="提交">\n    </div>\n</form>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});