var $ = require('node').all;
var tpl = require('./header-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
var IO = require('io');
var SP = require('core-front/smartPath/smartPath');
var AI = require('core-front/authIdentify/index');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                var html = new XTemplate(tpl).render({
                    account: account
                });
                $('header').html(html);
                SP.resolveImgSrc('.img');
                KISSY.use('', function (S) {

                })
            });
        }
    }
}