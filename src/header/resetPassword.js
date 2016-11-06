var $ = require('node').all;
var tpl = require('./index_no_login-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
var IO = require('io');
var SP = require('core-front/smartPath/smartPath');
var RAN = require('core-front/random/index');
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
        });
        $('header').html(html);
        KISSY.use('', function (S) {
        })
    }
}