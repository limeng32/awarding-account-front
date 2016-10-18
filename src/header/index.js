var $ = require('node').all;
var tpl = require('./index-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
        });
        $('header').html(html);
        KISSY.use('kg/auth/2.0.6/plugin/msgs/style.css', function (S) {
            var formAuth = new Auth('#formAuth');
            formAuth.plug(new AuthMsgs());
            formAuth.set('stopOnError',true);
            formAuth.register('iRequired', function (value, attr, defer, field) {
                var self = this;
                if (value != '') {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: attr + '不可以为空'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            }).register('iEmail', function (value, attr, defer, field) {
                var self = this;
                var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (value.match(reg)) {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: '请输入正确的邮件地址'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            }).register('email-max-len', function (value, attr, defer, field) {
                var self = this;
                if (value.length<=Number(attr)) {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: '邮件地址不要多于' + Number(attr) + '个字符'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            }).register('safe-password', function (value, attr, defer, field) {
                var self = this;
                var reg = /^(?!.*?&).*$/;
                if (value.match(reg)) {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: '密码不能含有字符”&“'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            }).register('password-max-len', function (value, attr, defer, field) {
                var self = this;
                if (value.length<=Number(attr)) {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: '密码不要多于' + Number(attr) + '个字符'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            }).register('password-min-len', function (value, attr, defer, field) {
                var self = this;
                if (value.length>=Number(attr)) {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: '密码不要少于' + Number(attr) + '个字符'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            });
            formAuth.render();
        })
        $('#u39').on('click',function(){
            $('#submitButton').getDOMNode().click();
        });
    }
}