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
var pcTpl = require('./personConfig-view');
module.exports = {
    init: function (p) {
        var pcHtml = new XTemplate(pcTpl).render({
            account: p.account
        });
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: pcHtml,
            visible: true,
            xy: [400, 140],
            width: '600px',
            height: '250px',
            closable: true,
            zIndex: 5,
            visible: false,
            closeAction: 'hide'
        });
        ol.render();
        var auth = new Auth('#personConfig', {
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
                //self.msg('error', '请您输入不超过' + max + '个字符');
                defer.reject(self);
            }
            return defer.promise;
        }).register('min-len', function (value, attr, defer, field) {
            var self = this;
            var min = Number(attr);
            if (value.length >= min) {
                defer.resolve(self);
            } else {
                //self.msg('error', '请您输入不少于' + min + '个字符');
                defer.reject(self);
            }
            return defer.promise;
        }).register('safe-name', function (value, attr, defer, field) {
            var self = this;
            var reg = '^[\u4e00-\u9fa5_a-zA-Z0-9]+$';
            if (value.match(reg)) {
                defer.resolve(self);
            } else {
                self.msg('error', '只能输入中文英文字母和下横线');
                defer.reject(self);
            }
            return defer.promise;
        }).register('needAFail', function (value, attr, defer, field) {
            var self = this;
            defer.reject(self);
            return defer.promise;
        }).register('updateName-Cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateName-Cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('personConfig/resumeName?_content=json'), 'json').then(function (data) {
                if (data[0].flag) {
                    self.msg('success', data[0].message);
                    if (data[0].message != null) {
                        authMsgs.getMsg(field.get('name')).show('success', data[0].message);
                    } else {
                        authMsgs.getMsg(field.get('name')).show('success', '用户名称已经恢复');
                    }
                    $('#personConfig_name').val(data[0].data.name);
                } else {
                    if (data[0].message != null) {
                        authMsgs.getMsg(field.get('name')).show('error', data[0].message);
                    }
                }
            });
            defer.reject(self);
            return defer.promise;
        }).register('updateName-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('personConfig/updateName?_content=json&name=' + encodeURIComponent($('#personConfig_name').val())), 'json')
                .then(function (data) {
                if (data[0].flag) {
                    self.msg('success', data[0].message);
                    if (data[0].message != null) {
                        authMsgs.getMsg(field.get('name')).show('success', data[0].message);
                    } else {
                        authMsgs.getMsg(field.get('name')).show('success', '用户名称修改成功');
                    }
                    $('#home_u31_txt').html(data[0].data.name);
                    $('#personConfig_u103_txt').html('编辑');
                    $('#personConfig_name').attr('readonly', 'readonly');
                } else {
                    if (data[0].message != null) {
                        authMsgs.getMsg(field.get('name')).show('error', data[0].message);
                    }
                }
            });
            defer.reject(self);
            return defer.promise;
        })
        auth.render();
        $('#personConfig_u102').on('click', function () {
            var name = $('#personConfig_name');
            if (name.hasAttr('readonly')) {
                $('#personConfig_u103_txt').html('保存');
                name.removeAttr('readonly');
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存新的名称？',
                    onConfirm: function () {
                        auth.field('personConfig_name_hidden').set('exclude', 'updateName-Cancel')
                        auth.test()
                    }
                    , onCancel: function () {
                        auth.field('personConfig_name_hidden').set('exclude', '')
                        auth.field('personConfig_name_hidden').test('updateName-Cancel')
                        $('#personConfig_u103_txt').html('编辑');
                        $('#personConfig_name').attr('readonly', 'readonly');
                    }
                });
            }
        });
        var auth2 = new Auth('#personConfig2', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        });
        var authMsgs2 = new AuthMsgs();
        auth2.plug(authMsgs2);



        this.ol = function () {
            return ol;
        };
    }
}