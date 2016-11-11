var $ = require('node').all;
var tpl = require('./article-view');
var index_changePassTpl = require('./index_changePass-view');
var signUpTpl = require('./signUp-view');
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
        var p = {size: 6, useTimestamp: true}
        var ran = new RAN(p);
        KISSY.use('', function (S) {
            var html = new XTemplate(tpl).render({});
            var index_changePass = new XTemplate(index_changePassTpl).render({});
            var signUp = new XTemplate(signUpTpl).render({});
            var changePasstoken = '', oldChangePassToken = '', signUptoken = '', oldSignUpToken = '';
            var token = '', oldToken = '';
            $('article').html(html);
            SP.resolveImgSrc('.img');
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
                target: '#v2',
                content: index_changePass,
                visible: true,
                xy: [1050, 105],
                width: '290px',
                height: '270px',
                closeAction: 'hide'
            });
            ol.show();
            ol.close();
            $('#v2').on('click', function (e) {
                if (ol.get('visible')) {
                    $('#v3').removeClass('focus');
                    ol.close();
                } else {
                    $('#v3').addClass('focus');
                    ol.show();
                }
                if (ol2.get('visible')) {
                    $('#v6').removeClass('focus');
                    ol2.close();
                }
            })
            var auth = new Auth('#J_Auth', {
                fnFilter: function ($field) {
                    return $field.attr('type') == 'hidden';
                }
            });
            var authMsgs = new AuthMsgs();
            auth.plug(authMsgs);
            auth.set('stopOnError', true);
            auth.register('max-len', function (value, attr, defer, field) {
                var self = this;
                var max = Number(attr);
                if (value.length <= max) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '请您输入不超过' + max + '个字符');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('changePass-email-exist', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/checkExist?_content=json&email=' + value), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', '您输入的邮箱并不存在');
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('changePass-checkCaptcha', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/testCaptcha?_content=json&value=' + $('#icpv1').val() + '&token=' + changePasstoken), 'json').then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            self.msg('success', data[0].message);
                        }
                        defer.resolve(self);
                    } else {
                        if (data[0].message != null) {
                            self.msg('error', data[0].message);
                        }
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('sendEmail', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/resetPassword?_content=json&email=' + $('#icpv2').val() + '&token=' + changePasstoken), 'json').then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            self.msg('success', data[0].message);
                            authMsgs.getMsg(field.get('name')).show('success', data[0].message);
                        }
                        defer.resolve(self);
                    } else {
                        if (data[0].message != null) {
                            authMsgs.getMsg(field.get('name')).show('error', data[0].message);
                        }
                        defer.reject(self);
                    }
                });
                defer.resolve(self);
                return defer.promise;
            }).register('needAFail', function (value, attr, defer, field) {
                var self = this;
                $('#icpv5').getDOMNode().click();
                defer.reject(self);
                return defer.promise;
            });
            auth.render();
            var refreshCaptcha = function () {
                oldChangePassToken = changePasstoken;
                changePasstoken = ran.generate();
                $('#icpv6_img').prop({src: SP.resolvedPath('signIn/captchaImage?token=' + changePasstoken + '&oldToken=' + oldChangePassToken)});
            }
            $('#icpv5').on('click', function () {
                if ($('#icpv5').attr('hidden') != 'hidden') {
                    $('#icpv6_img').removeAttr('hidden');
                    $('#icpv5').attr('hidden', 'hidden');
                    $('#icpv1').removeAttr('disabled');
                    refreshCaptcha();
                } else {
                    $('#icpv5').removeAttr('hidden');
                    $('#icpv6_img').attr('hidden', 'hidden');
                    $('#icpv1').getDOMNode().value = '';
                    $('#icpv1').attr('disabled', 'disabled');
                }
            })
            $('#icpv6_img').on('click', function () {
                refreshCaptcha();
            })

            var ol2 = new OVL({
                effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
                easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
                duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
                target: '#v5',
                content: signUp,
                visible: true,
                xy: [1040, 105],
                width: '290px',
                height: '420px',
                closeAction: 'hide'
            });
            ol2.show();
            ol2.close();
            $('#v5').on('click', function (e) {
                if (ol2.get('visible')) {
                    $('#v6').removeClass('focus');
                    ol2.close();
                } else {
                    $('#v6').addClass('focus');
                    ol2.show();
                }
                if (ol.get('visible')) {
                    $('#v3').removeClass('focus');
                    ol.close();
                }
            })
            var auth2 = new Auth('#signUp', {
                fnFilter: function ($field) {
                    return $field.attr('type') == 'hidden';
                }
            });
            var authMsgs2 = new AuthMsgs();
            auth2.plug(authMsgs2);
            auth2.set('stopOnError', true);
            auth2.register('min-len', function (value, attr, defer, field) {
                var self = this;
                var min = Number(attr);
                if (value.length >= min) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '请您输入不少于' + min + '个字符');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('safe-password2', function (value, attr, defer, field) {
                var self = this;
                var reg = /^(?!.*?&).*$/;
                if (value.match(reg)) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '密码不能含有字符”&“');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('changePass-checkCaptcha2', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/testCaptcha?_content=json&value=' + $('#isuv1').val() + '&token=' + signUptoken), 'json').then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            self.msg('success', data[0].message);
                        }
                        defer.resolve(self);
                    } else {
                        if (data[0].message != null) {
                            self.msg('error', data[0].message);
                        }
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('email-not-exist', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signUp/checkNotExist?_content=json&email=' + value), 'json').then(function (data) {
                    if (data[0].flag) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', data[0].message);
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('needAFail2', function (value, attr, defer, field) {
                var self = this;
                $('#isuv5').getDOMNode().click();
                defer.reject(self);
                return defer.promise;
            }).register('sendEmail2', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signUp/sendEmail?_content=json&email=' + $('#isuv2').val() + '&password=' + $('#isuv7').val() + '&token=' + signUptoken), 'json').then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            self.msg('success', data[0].message);
                            authMsgs2.getMsg(field.get('name')).show('success', data[0].message);
                        }
                        defer.resolve(self);
                    } else {
                        if (data[0].message != null) {
                            authMsgs2.getMsg(field.get('name')).show('error', data[0].message);
                        }
                        defer.reject(self);
                    }
                });
                defer.resolve(self);
                return defer.promise;
            });
            auth2.render();
            $('#isuv5').on('click', function () {
                if ($('#isuv5').attr('hidden') != 'hidden') {
                    $('#isuv6_img').removeAttr('hidden');
                    $('#isuv5').attr('hidden', 'hidden');
                    $('#isuv1').removeAttr('disabled');
                    refreshCaptcha2();
                } else {
                    $('#isuv5').removeAttr('hidden');
                    $('#isuv6_img').attr('hidden', 'hidden');
                    $('#isuv1').getDOMNode().value = '';
                    $('#isuv1').attr('disabled', 'disabled');
                }
            })
            var refreshCaptcha2 = function () {
                oldSignUpToken = signUptoken;
                signUptoken = ran.generate();
                $('#isuv6_img').prop({src: SP.resolvedPath('signIn/captchaImage?token=' + signUptoken + '&oldToken=' + oldSignUpToken)});
            }
            $('#isuv6_img').on('click', function () {
                refreshCaptcha2();
            })

            var formAuth = new Auth('#formAuth');
            formAuth.plug(new AuthMsgs());
            formAuth.set('stopOnError', true);
            formAuth.register('iRequired', function (value, attr, defer, field) {
                var self = this;
                if (value != '') {
                    defer.resolve(self);
                } else {
                    self.msg('error', attr + '不可以为空');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('iEmail', function (value, attr, defer, field) {
                var self = this;
                var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (value.match(reg)) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '请输入正确的邮件地址');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('email-max-len', function (value, attr, defer, field) {
                var self = this;
                if (value.length <= Number(attr)) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '邮件地址不要多于' + Number(attr) + '个字符');
                    defer.reject(self);
                }
                return defer.promise;
            }).register('safe-password', function (value, attr, defer, field) {
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
            }).register('email-exist', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/checkExist?_content=json&email=' + value), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        self.msg('error', '您输入的邮箱并不存在');
                        defer.reject(self);
                    }
                });
                return defer.promise;
            }).register('signIn-test-hidden', function (value, attr, defer, field) {
                var self = this;
                IO.post(SP.resolvedIOPath('signIn/signInTest?_content=json&email=' + $('#u134_input').val() + '&password=' + $('#u137_input').val()), 'json').then(function (data) {
                    if (data[0]) {
                        defer.resolve(self);
                    } else {
                        needCaptcha3();
                        refreshCaptcha3();
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
                IO.post(SP.resolvedIOPath('signIn/testCaptcha?_content=json&value=' + $('#v137_input').val() + '&token=' + token), 'json').then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            self.msg('success', data[0].message);
                        }
                        defer.resolve(self);
                    } else {
                        self.msg('error', data[0].message);
                        defer.reject(self);
                    }
                });
                return defer.promise;
            });
            $('#formAuth').prop({
                action: SP.resolvedPath('signIn/submit')
            });
            formAuth.render();
            $('#u139').on('click', function () {
                $('#submitButton1').getDOMNode().click();
            });
            var refreshCaptcha3 = function () {
                oldToken = token;
                token = ran.generate();
                $('#v133_img').prop({src: SP.resolvedPath('signIn/captchaImage?token=' + token + '&oldToken=' + oldToken)});
            }
            var needCaptcha3 = function () {
                if ($('#v137_input').attr('disabled') == 'disabled') {
                    $('#v133').removeAttr('hidden');
                    $('#v137_input').removeAttr('hidden');
                    $('#v137_input').prop({disabled: ''});
                }
            }
            token = ran.generate();
            $('#v133_img').prop({src: SP.resolvedPath('signIn/captchaImage?token=' + token + '&oldToken=')});
            $('#v133_img').on('click', function () {
                refreshCaptcha3();
            })
        })
    }
}