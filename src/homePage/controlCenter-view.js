KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function controlCenterView(undefined){
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


buffer.data += '<div id="home_u32" class="ax_dynamic_panel" data-label="menu">\n    <div id="home_u32_state0" class="panel_state" data-label="State1">\n        <div id="home_u32_state0_content" class="panel_state_content">\n\n            <div id="home_u33" class="ax_shape home_cc_img">\n                <div id="home_u34" class="text">\n                    <p><span id="home_u1134">修改头像</span></p>\n                </div>\n            </div>\n\n            <div id="home_u35" class="ax_shape home_cc_img">\n                <div id="home_u36" class="text">\n                    <p><span>私信</span></p>\n                </div>\n            </div>\n\n            <div id="home_u37" class="ax_shape home_cc_img2">\n                <div id="home_u38" class="text">\n                    <p><span>离开</span></p>\n                </div>\n            </div>\n\n            <div id="home_u39" class="ax_shape home_cc_img">\n                <div id="home_u40" class="text">\n                    <p><span>设置</span></p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});