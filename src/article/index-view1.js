KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function indexView1(undefined){
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


buffer.data += '<div id="example">\n    <div id="slides"><!--Slide�ؼ���ʼ-->\n        <div class="slides_container tab-content">\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-1.jpg">\n                    <div class="cutter-content">\n                        <p>content</p>\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\ttext info\n\t\t\t\t\t\t\t</span>\n                    </div>\n                </div>\n            </div>\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-2.jpg">\n                </div>\n            </div>\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-3.jpg">\n                </div>\n            </div>\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-4.jpg">\n                </div>\n            </div>\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-5.jpg">\n                </div>\n            </div>\n            <div class="tab-pannel">\n                <div class="cutter-mojo">\n                    <img src="http://jayli.github.com/gallery/yuislide/assets/slide-6.jpg">\n                </div>\n            </div>\n        </div>\n        <a href="javascript:void(0);" class="prev" id="J_pre"><img\n                src="http://jayli.github.com/gallery/yuislide/assets/arrow-prev.png" width="24" height="43"\n                alt="Arrow Prev"></a>\n        <a href="javascript:void(0);" class="next" id="J_next"><img\n                src="http://jayli.github.com/gallery/yuislide/assets/arrow-next.png" width="24" height="43"\n                alt="Arrow Next"></a>\n        <ul class="tab-nav pagination">\n            <li>\n                <a href="javascript:void(0);">1</a>\n            </li>\n            <li>\n                <a href="javascript:void(0);">2</a>\n            </li>\n            <li>\n                <a href="javascript:void(0);">3</a>\n            </li>\n            <li>\n                <a href="javascript:void(0);">4</a>\n            </li>\n            <li>\n                <a href="javascript:void(0);">5</a>\n            </li>\n            <li>\n                <a href="javascript:void(0);">6</a>\n            </li>\n        </ul>\n    </div>\n    <!--Slide�ؼ�����-->\n    <img src="http://jayli.github.com/gallery/yuislide/assets/example-frame.png" width="739" height="341"\n         alt="Example Frame" id="frame">\n</div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});