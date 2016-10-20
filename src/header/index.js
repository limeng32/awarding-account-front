var $ = require('node').all;
var tpl = require('./index-view');
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
            }).register('email-exist', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/checkExist?_content=json&email=' + value), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        new AD({
                            type: 'alert',
                            content: '您输入的邮箱并不存在'
                        });
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('signIn-test-hidden', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/signInTest?_content=json&email=' + $('#u34_input').val() + '&password=' + $('#u37_input').val()), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        //captDiv.removeAttr('hidden');
                        //captImageDiv.removeAttr('hidden');
                        //captValue.prop({disabled: ''});
                        //hiddenRuleInput.prop({disabled: 'disabled'});
                        new AD({
                            type: 'alert',
                            content: '您输入的邮箱和密码不匹配'
                        });
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('checkCaptcha', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/testCaptcha?_content=json&value=' + $('#v37_input').val() + '&token=' + token), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        new AD({
                            type: 'alert',
                            content: '您输入的验证码有误'
                        });
                        defer.reject(self);
                    }
                });
                return defer.promise;
            });
            formAuth.render();
        })
        $('#u39').on('click',function(){
            $('#submitButton').getDOMNode().click();
        });
        token = ran.generate();
        $('#v33_img').prop({src: SP.resolvedPath('signIn/captchaImage?token='+token+'&oldToken=')});
        $('#v33_img').on('click',function(){
            oldToken = token;
            token = ran.generate();
            $('#v33_img').prop({src: SP.resolvedPath('signIn/captchaImage?token='+token+'&oldToken='+oldToken)});
        })
    }
}