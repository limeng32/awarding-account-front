KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function changePortraitView(undefined){
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


buffer.data += '<div id="J_Uploader">\n   <!-- <img src="';
pos.line = 2;
var id0 = ((t=(affix.portrait)) !== undefined ? t:((t = data.portrait) !== undefined ? t :scope.resolveLooseUp(["portrait"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '" class="portrait">-->\n\n    <div class="uploader-wrapper">\n        <div class="grid">\n            <input type="button" class="ks-button ks-button-info ks-button-shown" id="J_DefaultBtn" value="使用默认头像" >\n            <input type="file" class="g-u" id="J_UploaderBtn" value="上传" name="Filedata" accept="image/*">\n            <input type="hidden" id="J_Urls" name="urls"/>\n            <div class="g-u">\n                <input type="button" value="确定"\n                       class="ks-button ks-button-success ks-button-shown signButton submitPortrait">\n            </div>\n            <ul id="J_UploaderQueue"></ul>\n        </div>\n    </div>\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});