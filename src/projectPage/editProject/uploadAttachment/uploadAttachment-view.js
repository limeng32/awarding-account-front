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


buffer.data += '<div id="uploadAttachmentContainer">\n    <div id="J_Uploader_uploadAtta">\n        <div class="uploader-wrapper">\n            <div class="grid">\n                <input type="file" class="g-u g-u-button" id="J_UploaderBtn_uploadAtta" value="上传" name="Filedata"\n                       accept="image/*"><span class="uploadAuthMsg">';
pos.line = 6;
var id0 = ((t=(affix.p)) !== undefined ? affix.p.uamHtml:((t = data.p) !== undefined ? (t.uamHtml) :scope.resolveLooseUp(["p","uamHtml"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '</span>\n                <input type="hidden" id="J_Urls_uploadAtta" name="urls"/>\n                <ul id="J_UploaderQueue_uploadAtta">\n                    <script type="text/uploader-theme">\n                    <li id="queue-file-{id}" class="grid" data-name="{name}">\n                        <div class="g-u sprite file-icon"></div>\n                        <div class="g-u"><a class="g-u-download J_Download_{id}" target="_blank">{name}</a></div>\n                        <div class="g-u status-wrapper grid">\n                            <div class="status waiting-status">正在上传，请您等待</div>\n                            <div class="status start-status progress-status success-status clearfix">\n                                <div class="J_ProgressBar_{id} g-u uploader-progress"><img class="loading" src="http://img01.taobaocdn.com/tps/i1/T1F5tVXjRfXXXXXXXX-16-16.gif" alt="loading" /></div>\n                                <a class="J_Cancel_{id} g-u upload-cancel" href="#uploadCancel">取消</a>\n                                <a class="uploadDelete g-u J_Del_{id}" style="display:none;">删除</a>\n                            </div>\n                            <div class="status cancel-status">已经取消上传，<a href="#reUpload" id="J_ReUpload_{id}" class="J_Upload_{id}">点此重新上传</a> </div>\n                            <div class="status error-status upload-error"><span class="J_ErrorMsg_{id} uploadErrorMsg"></span><a href="#fileDel" class="J_Del_{id}">删除</a></div>\n                        </div>\n                    </li>\n                    </script>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});