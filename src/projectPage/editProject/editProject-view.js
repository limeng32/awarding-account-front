KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function editProjectView(undefined){
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


buffer.data += '<input id="editProject_id" name="editProject_id" type="hidden">\n<form class="form-horizontal" id="project_name" method="post" action="a">\n    <!-- project_name (Text Field) -->\n    <div id="editProject_u40" class="ax_text_field" data-label="project_name">\n        <input id="editProject_u40_input" type="text" readonly="readonly" value="" placeholder="请输入项目名称"\n               msg-wrapper="#editProject_v1" max-len="50" max-len-msg="项目名称不能多于50个字符" required="required"\n               required-msg="项目名称不能为空"/>\n        <input hidden="hidden" id="editProject_name_hidden" name="editProject_name_hidden"\n               updateProjectName-cancel="updateProjectName-cancel" updateProjectName-confirm="updateProjectName-confirm"\n               class="" msg-wrapper="#editProject_v1"/>\n    </div>\n\n    <!-- border (Shape) -->\n    <div id="editProject_u38" class="ax_shape" data-label="border">\n        <img id="editProject_u38_img" class="img " src="./account/images/editProject/border_u38.png"/>\n        <!-- Unnamed () -->\n        <div id="editProject_u39" class="text">\n            <p><span></span></p>\n        </div>\n    </div>\n\n\n    <!-- Unnamed (Shape) -->\n    <div id="editProject_u41" class="ax_paragraph">\n        <img id="editProject_u41_img" class="img " src="./account/images/transparent.gif"/>\n        <!-- Unnamed () -->\n        <div id="editProject_u42" class="text">\n            <p><span>项目名称</span></p>\n        </div>\n    </div>\n\n    <!-- project_name_button (Dynamic Panel) -->\n                <!-- Unnamed (Shape) -->\n    <div id="editProject_u102" class="ax_shape">\n        <img id="editProject_u102_img" class="img "\n             src="./account/images/editProject/add_project_button_u73.png"/>\n        <!-- Unnamed () -->\n        <div id="editProject_u103" class="text">\n            <p><span id="editProject_u103_txt">编辑</span></p>\n        </div>\n    </div>\n    <input hidden="hidden" needAFail="needAFail"/>\n\n    <div id="editProject_v1" class="ax_paragraph "/>\n</form>\n<form class="form-horizontal" id="project_lxbj" method="post" action="b">\n<!-- Unnamed (Shape) -->\n<div id="editProject_u43" class="ax_paragraph">\n    <img id="editProject_u43_img" class="img " src="./account/images/transparent.gif"/>\n    <!-- Unnamed () -->\n    <div id="editProject_u44" class="text">\n        <p><span>立项背景</span></p>\n    </div>\n</div>\n\n    <!-- Unnamed (Shape) -->\n    <div id="editProject_u55" class="ax_paragraph">\n        <img id="editProject_u55_img" class="img " src="./account/images/transparent.gif"/>\n        <!-- Unnamed () -->\n        <div id="editProject_u56" class="text">\n            <p><span>（5000字以内）</span></p>\n        </div>\n    </div>\n\n<!-- lxbj_border (Shape) -->\n<div id="editProject_u11" class="ax_shape" data-label="lxbj_border">\n    <img id="editProject_u11_img" class="img " src="./account/images/editProject/tjyj_border_u0.png"/>\n    <!-- Unnamed () -->\n    <div id="editProject_u12" class="text">\n        <p><span></span></p>\n    </div>\n</div>\n\n<!-- lxbj (Text Area) -->\n<div id="editProject_u45" class="ax_text_area" data-label="lxbj">\n    <textarea type="text" id="editProject_u45_input" value="" readonly="readonly" placeholder="请输入立项背景"\n              msg-wrapper="#editProject_v2" required="required" required-msg="立项背景不能为空" max-len="5000"\n              max-len-msg="立项背景不能多于5000个字符"/>\n    <input hidden="hidden" id="editProject_lxbj_hidden" name="editProject_lxbj_hidden"\n           updateProjectLxbj-cancel="updateProjectLxbj-cancel" updateProjectLxbj-confirm="updateProjectLxbj-confirm"\n           class="" msg-wrapper="#editProject_v2"/>\n</div>\n\n    <!-- Unnamed (Shape) -->\n    <div id="editProject_u77" class="ax_shape">\n        <img id="editProject_u77_img" class="img " src="./account/images/editProject/add_project_button_u73.png"/>\n        <!-- Unnamed () -->\n        <div id="editProject_u78" class="text">\n            <p><span id="editProject_u78_txt">编辑</span></p>\n        </div>\n    </div>\n    <input hidden="hidden" needAFail="needAFail"/>\n\n    <div id="editProject_v2" class="ax_paragraph "/>\n</form>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});