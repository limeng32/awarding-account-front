KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function uploadAttachmentView(undefined){
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


buffer.data += '<div id="J_Uploader_uploadAtta">\n    <div class="uploader-wrapper">\n        <div class="grid">\n            <input type="file" class="g-u" id="J_UploaderBtn_uploadAtta" value="上传" name="Filedata" accept="image/*">\n            <input type="hidden" id="J_Urls_uploadAtta" name="urls"/>\n            <ul id="J_UploaderQueue_uploadAtta">\n                <!--<script type="text/uploader-theme">-->\n                  <!--<li id="queue-file-{id}" class="g-u" data-name="{name}">-->\n                      <!--<div class="pic-wrapper">-->\n                         <!--<div class="pic">-->\n                             <!--<span><img class="J_Pic_{id} preview-img" src="" /></span>-->\n                         <!--</div>-->\n                         <!--<div class=" J_Mask_{id} pic-mask"></div>-->\n                         <!--<div class="status-wrapper J_FileStatus">-->\n                             <!--<div class="status waiting-status"><p>等待上传</p></div>-->\n                             <!--<div class="status start-status progress-status success-status">-->\n                                 <!--<div class="J_ProgressBar_{id}">上传中...</div>-->\n                             <!--</div>-->\n                             <!--<div class="status error-status">-->\n                                 <!--<p class="J_ErrorMsg_{id}">上传失败，请重试！</p></div>-->\n                         <!--</div>-->\n                     <!--</div>-->\n                     <!--<div>-->\n                         <!--<a class="J_Del_{id} del-pic" href="#">删除1</a>-->\n                     <!--</div>-->\n                 <!--</li>-->\n                <!--</script>-->\n            </ul>\n        </div>\n    </div>\n</div>\n';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});