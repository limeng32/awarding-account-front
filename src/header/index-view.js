KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function indexView(undefined){
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


buffer.data += '<div id="u29" class="ax_dynamic_panel">\n    <div id="u29_state0" class="panel_state" data-label="State1">\n        <div id="u29_state0_content" class="panel_state_content">\n\n            <div id="u30" class="ax_paragraph headertitle">\n                <img id="u30_img" class="img " src="./account/images/transparent.gif"/>\n                <div id="u31" class="text">\n                    <p><span style="font-family:\'幼圆 Bold\', \'幼圆\';">联通评奖系统</span></p>\n                </div>\n            </div>\n            <form id="formAuth" method="post" >\n                <div id="u32" class="ax_paragraph logintitle">\n                    <img id="u32_img" class="img " src="./account/images/transparent.gif"/>\n                    <div id="u33" class="text">\n                        <p><span style="font-family:\'幼圆 Bold\', \'幼圆\';font-weight:700;">账号</span></p>\n                    </div>\n                </div>\n\n                <div id="u34" class="ax_text_field logininput">\n                    <input id="u34_input" type="text" value="" name="email" iRequired="您的邮件地址" placeholder="您的邮件地址"/>\n                </div>\n\n                <div id="u35" class="ax_paragraph logintitle">\n                    <img id="u35_img" class="img " src="./account/images/transparent.gif"/>\n                    <div id="u36" class="text">\n                        <p><span style="font-family:\'幼圆 Bold\', \'幼圆\';font-weight:700;">密码</span></p>\n                    </div>\n                </div>\n\n                <div id="u37" class="ax_text_field logininput">\n                    <input id="u37_input" type="password" value="" placeholder="请输入密码" iRequired="密码"/>\n                </div>\n\n                <div id="u38" class="ax_shape">\n                    <img id="u38_img" class="img " src="./account/images/index/u38.png"/>\n                    <div id="u39" class="text">\n                        <p><span>提交</span></p>\n                    </div>\n                </div>\n            </form>\n            <div id="u40" class="ax_image">\n                <img id="u40_img" class="img " src="./account/images/index/u40.png"/>\n                <div id="u41" class="text">\n                    <p><span></span></p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});