var $ = require('node').all;
var tpl = require('./header-view');
var ccTpl = require('./controlCenter-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
var IO = require('io');
var SP = require('core-front/smartPath/smartPath');
var AI = require('core-front/authIdentify/index');
var OVL = require('overlay');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                var html = new XTemplate(tpl).render({
                    account: account
                });
                var ccHtml = new XTemplate(ccTpl).render({});
                $('header').html(html);
                var ol = new OVL({
                    effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
                    easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
                    duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
                    target: '#home_u28',
                    content: ccHtml,
                    visible: true,
                    xy: [890, 10],
                    width: '0px',
                    height: '0px',
                    closeAction: 'hide'
                });
                ol.show();
                ol.close();
                $('#home_u28').on('mouseover', function () {
                    ol.show();
                }).on('mouseout', function () {
                    ol.close();
                });
                $('#home_u32').on('mouseover', function () {
                    ol.show();
                }).on('mouseout', function () {
                    ol.close();
                });
                SP.resolveImgSrc('.img');
            });
        }
    }
}