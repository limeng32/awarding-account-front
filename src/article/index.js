var $ = require('node').all;
var tpl = require('./index-view');
var index_changePassTpl = require('./index_changePass-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
var SP = require('core-front/smartPath/smartPath');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
var OVL = require('overlay');
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
        });
        var index_changePass = new XTemplate(index_changePassTpl).render({
        });
        $('article').html(html);
        var C = new Slide('slides', {
            autoSlide: true,
            effect: 'hSlide',
            timeout: 3000,
            speed: 700,
            eventType: 'mouseover',
            triggerDelay: 400,
            selectedClass: 'current',
            carousel: true,
            touchmove: true,
            invisibleStop: true
        });
        S.one('#J_pre').on('click', function (e) {
            e.halt();
            C.previous().stop().play();
        });
        S.one('#J_next').on('click', function (e) {
            e.halt();
            C.next();
        });
        var cutterDivs = KISSY.all('#slides .cutter-mojo');
        var cutterContents = KISSY.all('#slides .cutter-content');
        for (var j = 0; j < cutterDivs.length; j++) {
          var c = new Cutter(cutterDivs[j], {
                animout_easing: 'easeOut',
                in_speed: 0.5
            });
        }
        cutterContents.on('mouseover', function (e) {
            C.stop();
        }).on('mouseout', function (e) {
            C.play();
        });
        var ol = new OVL({
            effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
            easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
            duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
            //mask: true,
            //closable: true,
            //closeOnClick: true,
            target:'#v2',
            content: index_changePass,
            visible: true,
            xy: [1140, 85],
            width: '200px',
            height:'200px',
            closeAction: 'hide'
        });
        ol.show();
        $('#v2').on('click', function (e) {
            if(ol.get('visible')){
                ol.close();
            }else{
                ol.show();
            }
        })
    }
}