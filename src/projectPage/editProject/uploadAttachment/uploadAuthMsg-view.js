KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function uploadAuthMsgView(undefined){
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


buffer.data += '您的上传容量还有';
pos.line = 1;
var id0 = ((t=(affix.accountRemainCapacity)) !== undefined ? t:((t = data.accountRemainCapacity) !== undefined ? t :scope.resolveLooseUp(["accountRemainCapacity"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '，当前项目还可以上传';
var id1 = ((t=(affix.projectRemainNumber)) !== undefined ? t:((t = data.projectRemainNumber) !== undefined ? t :scope.resolveLooseUp(["projectRemainNumber"])));
buffer = buffer.writeEscaped(id1);
buffer.data += '个附件';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});