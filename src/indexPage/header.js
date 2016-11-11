var $ = require('node').all;
var tpl = require('./header-view');
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
        var p = {size:6,useTimestamp:true}
        var ran = new RAN(p);
        var html = new XTemplate(tpl).render({
        });
        var token = '',oldToken = '';
        $('header').html(html);
        KISSY.use('', function (S) {

        })
    }
}