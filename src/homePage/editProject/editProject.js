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
var epTpl = require('./editProject-view');
module.exports = {
    init: function (p) {
        var epHtml = new XTemplate(epTpl).render({
            account: p.account
        });
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: epHtml,
            visible: true,
            xy: [100, 60],
            width: '1000px',
            height: '350px',
            closable: true,
            zIndex: 5,
            visible: false,
            closeAction: 'hide'
        });
        ol.render();
        this.ol = function () {
            return ol;
        };
    }
}