KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function searchBarView(undefined){
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


buffer.data += '<span class="ks-combobox" id="home_u8">\n    <div class="ks-combobox-input-wrap"  id="home_u8_input">\n        <input style="width:600px;height:12px;" aria-haspopup="true"\n               aria-combobox="list" role="combobox" combobox="off"\n               class="ks-combobox-input" tabindex="0"\n               placeholder=" 多个关键字可用空格分隔"\n                />\n    </div>\n</span>\n<!-- Unnamed (Shape) -->\n<div id="home_u9" class="ax_shape">\n    <img id="home_u9_img" class="img " src="./account/images/home/home_u9.png"/>\n    <!-- Unnamed () -->\n    <div id="home_u10" class="text">\n        <p><span>搜索</span></p>\n    </div>\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});