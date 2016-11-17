KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function headerView(undefined){
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


buffer.data += '<div id="u29" class="ax_dynamic_panel">\r\n    <div id="u29_state0" class="panel_state" data-label="State1">\r\n        <div id="u29_state0_content" class="panel_state_content">\r\n\r\n            <div id="u30" class="ax_paragraph headertitle">\r\n                <img id="u30_img" class="img " src="./account/images/transparent.gif"/>\r\n\r\n                <div id="u31" class="text">\r\n                    <p><span style="font-family:\'幼圆 Bold\', \'幼圆\';">联通评奖系统</span></p>\r\n                </div>\r\n            </div>\r\n            <div id="u40" class="ax_image">\r\n                <img id="u40_img" class="img " src="./account/images/index/u40.png"/>\r\n\r\n                <div id="u41" class="text">\r\n                    <p><span></span></p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- Unnamed (Text Field) -->\r\n    <div id="home_u8" class="ax_text_field">\r\n        <input id="home_u8_input" type="text" value=""/>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u9" class="ax_shape">\r\n        <img id="home_u9_img" class="img " src="./account/images/home/home_u9.png"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u10" class="text">\r\n            <p><span>搜索</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- menuProject (Shape) -->\r\n    <div id="home_u11" class="ax_paragraph headershift" data-label="menuProject" selectiongroup="u7menu">\r\n        <img id="home_u11_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u12" class="text">\r\n            <p><span>项目</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u13" class="ax_paragraph headershift" selectiongroup="u7menu">\r\n        <img id="home_u13_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u14" class="text">\r\n            <p><span>消息</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u15" class="ax_paragraph headershift" selectiongroup="u7menu">\r\n        <img id="home_u15_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u16" class="text">\r\n            <p><span>指定</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u17" class="ax_paragraph headershift" selectiongroup="u7menu">\r\n        <img id="home_u17_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u18" class="text">\r\n            <p><span>专家</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u19" class="ax_paragraph headershift" selectiongroup="u7menu">\r\n        <img id="home_u19_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u20" class="text">\r\n            <p><span>管理</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- menuAppraisal (Shape) -->\r\n    <div id="home_u21" class="ax_paragraph headershift" data-label="menuAppraisal" selectiongroup="u7menu">\r\n        <img id="home_u21_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u22" class="text">\r\n            <p><span>分组</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u23" class="ax_paragraph headershift" selectiongroup="u7menu">\r\n        <img id="home_u23_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u24" class="text">\r\n            <p><span>评审</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- menuAppraisal (Shape) -->\r\n    <div id="home_u41" class="ax_paragraph headershift" data-label="menuAppraisal" selectiongroup="u7menu">\r\n        <img id="home_u41_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u42" class="text">\r\n            <p><span>审查</span></p>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- HeaderPortrait (Dynamic Panel) -->\r\n    <div id="home_u25" class="ax_dynamic_panel" data-label="HeaderPortrait">\r\n        <div id="home_u25_state0" class="panel_state" data-label="State1">\r\n            <div id="home_u25_state0_content" class="panel_state_content">\r\n\r\n                <!-- Unnamed (Shape) -->\r\n                <div id="home_u26" class="ax_shape">\r\n                    <img id="home_u26_img" class="img " src="./account/images/transparent.gif"/>\r\n                    <!-- Unnamed () -->\r\n                    <div id="home_u27" class="text">\r\n                        <p><span></span></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Unnamed (Image) -->\r\n                <div id="home_u28" class="ax_image portraitheader">\r\n                    <img id="home_u28_img" class="" src="';
pos.line = 123;
var id0 = ((t=(affix.portraitUrl)) !== undefined ? t:((t = data.portraitUrl) !== undefined ? t :scope.resolveLooseUp(["portraitUrl"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '"/>\r\n                    <!-- Unnamed () -->\r\n                    <div id="home_u29" class="text">\r\n                        <p><span></span></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- user_name (Shape) -->\r\n                <div id="home_u30" class="ax_paragraph usernameheader" data-label="user_name">\r\n                    <img id="home_u30_img" class="img " src="./account/images/transparent.gif"/>\r\n                    <!-- Unnamed () -->\r\n                    <div id="home_u31" class="text">\r\n                        <p><span id="home_u31_txt">';
pos.line = 135;
var id1 = ((t=(affix.account)) !== undefined ? affix.account.name:((t = data.account) !== undefined ? (t.name) :scope.resolveLooseUp(["account","name"])));
buffer = buffer.writeEscaped(id1);
buffer.data += '</span></p>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Unnamed (Shape) -->\r\n    <div id="home_u43" class="ax_paragraph">\r\n        <img id="home_u43_img" class="img " src="./account/images/transparent.gif"/>\r\n        <!-- Unnamed () -->\r\n        <div id="home_u44" class="text">\r\n            <p><span></span></p>\r\n        </div>\r\n    </div>\r\n\r\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});