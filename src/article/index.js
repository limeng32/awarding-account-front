var $ = require('node').all;
var tpl = require('./index-view1');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
var SP = require('core-front/smartPath/smartPath');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
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
          console.log(cutterDivs[j])
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
    }
}