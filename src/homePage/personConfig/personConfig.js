var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
var SP = require('core-front/smartPath/smartPath');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
var OVL = require('overlay');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var RAN = require('core-front/random/index');
var SP = require('core-front/smartPath/smartPath');
var AD = require('kg/agiledialog/1.0.2/index');
var pcTpl = require('./personConfig-view');
module.exports = {
    init: function (p) {
        var pcHtml = new XTemplate(pcTpl).render({
            account: p.account
        });
        var _ol3 = new OVL({
            effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
            easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
            duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
            target: '',
            content: pcHtml,
            visible: true,
            xy: [400, 140],
            width: '500px',
            height: '400px',
            closable: true,
            closeAction: 'close'
        });
        _ol3.show();
        _ol3.close();
        this.ol3 = function () {
            return _ol3;
        };
    }
}