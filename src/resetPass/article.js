var $ = require('node').all;
var tpl = require('./../resetPass/resetPassword-view');
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
var AD = require('kg/agiledialog/5.0.2/index');
var AI = require('core-front/authIdentify/index');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                var html = new XTemplate(tpl).render({
                    account: account,
                    rplId: rplId,
                    rplToken: rplToken
                });
                var mainDiv = new Node('<div>').addClass('articleMiddle');
                $('article').append(mainDiv);
                mainDiv.append(html);
                var auth = new Auth('#resetPass',{
                    fnFilter:function($field){
                        return $field.attr('type') == 'hidden';
                    }
                });
                var authMsgs = new AuthMsgs();
                auth.plug(authMsgs);
                auth.set('stopOnError',true);
                auth.register('safe-password', function (value, attr, defer, field) {
                    var self = this;
                    var reg = /^(?!.*?&).*$/;
                    if (value.match(reg)) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', '密码不能含有字符”&“');
                        defer.reject(self);
                    }
                    return defer.promise;
                }).register('password-max-len', function (value, attr, defer, field) {
                    var self = this;
                    if (value.length <= Number(attr)) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', '密码不要多于' + Number(attr) + '个字符');
                        defer.reject(self);
                    }
                    return defer.promise;
                }).register('password-min-len', function (value, attr, defer, field) {
                    var self = this;
                    if (value.length >= Number(attr)) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', '密码不要少于' + Number(attr) + '个字符');
                        defer.reject(self);
                    }
                    return defer.promise;
                });
                auth.render();
                $('#resetPass').prop({
                    action: SP.resolvedPath('account/resetPassword')
                })
            });
            SP.resolveImgSrc('.img');
        }
    }
}