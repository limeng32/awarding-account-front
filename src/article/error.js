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
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var RAN = require('core-front/random/index');
var SP = require('core-front/smartPath/smartPath');
var AD = require('kg/agiledialog/1.0.2/index');
module.exports = {
    init: function () {
        SP.resolveImgSrc('.img');
        var mainDiv = new Node('<div>').addClass('articleMiddle');
        $('article').append(mainDiv);
        if (reason == '') {
            reason = '未知异常';
        }
        mainDiv.html(reason);
    }
}