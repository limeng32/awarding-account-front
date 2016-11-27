var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
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
        })
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: epHtml,
            visible: true,
            xy: [0, 60],
            width: '0px',
            height: '0px',
            closable: false,
            zIndex: -1,
            visible: false,
            prefixCls: 'absolute-',
            closeAction: 'hide'
        })
        ol.render()
        var auth_name = new Auth('#project_name', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_name = new AuthMsgs()
        auth_name.plug(authMsgs_name)
        auth_name.set('stopOnError', true)
        auth_name.register('max-len', function (value, attr, defer, field) {
            var self = this;
            var max = Number(attr);
            if (value.length <= max) {
                defer.resolve(self);
            } else {
                defer.reject(self);
            }
            return defer.promise;
        }).register('updateProjectName-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateName?_content=json&name=' + encodeURIComponent($('#editProject_u40_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_name.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_name.getMsg(field.get('name')).show('success', '项目名称修改成功');
                        }
                        $('#editProject_id').val(data[0].data.id)
                        $('#editProject_u103_txt').html('编辑')
                        $('#editProject_u40_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_name.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectName-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectName-cancel')
            var self = this;
            if ($('#editProject_id').val() == '') {
                authMsgs_name.getMsg(field.get('name')).show('success', '项目没有建立');
                $('#editProject_u40_input').val('')
            } else {
                IO.post(SP.resolvedIOPath('submitProject/resumeName?_content=json&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                    .then(function (data) {
                        if (data[0].flag) {
                            if (data[0].message != null) {
                                authMsgs_name.getMsg(field.get('name')).show('success', data[0].message);
                            } else {
                                authMsgs_name.getMsg(field.get('name')).show('success', '项目名称没有改变');
                            }
                            $('#editProject_u40_input').val(data[0].data.name)
                        } else {
                            if (data[0].message != null) {
                                authMsgs_name.getMsg(field.get('name')).show('error', data[0].message);
                            }
                        }
                    })
            }
            defer.reject(self);
            return defer.promise;
        })
        auth_name.render()
        $('#editProject_u102').on('click', function () {
            var name = $('#editProject_u40_input')
            if (name.hasAttr('readonly')) {
                $('#editProject_u103_txt').html('保存');
                name.removeAttr('readonly');
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存新的名称？',
                    onConfirm: function () {
                        auth_name.field('editProject_name_hidden').set('exclude', 'updateProjectName-cancel')
                        auth_name.test()
                    }
                    , onCancel: function () {
                        auth_name.field('editProject_name_hidden').set('exclude', '')
                        auth_name.field('editProject_name_hidden').test('updateProjectName-cancel')
                        $('#editProject_u103_txt').html('编辑')
                        name.attr('readonly', 'readonly')
                    }
                })
            }
        })
        var auth_lxbj = new Auth('#project_lxbj', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_lxbj = new AuthMsgs()
        auth_lxbj.plug(authMsgs_lxbj)
        auth_lxbj.set('stopOnError', true)
        auth_lxbj.register('updateProjectLxbj-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBucket?_content=json&fieldName=lxbj&fieldValue=' + encodeURIComponent($('#editProject_u45_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_lxbj.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_lxbj.getMsg(field.get('name')).show('success', '立项背景修改成功');
                        }
                        $('#editProject_u77_txt').html('编辑')
                        $('#editProject_u45_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_lxbj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectLxbj-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectLxbj-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBucket?_content=json&fieldName=lxbj&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_lxbj.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_lxbj.getMsg(field.get('name')).show('success', '立项背景没有改变')
                        }
                        $('#editProject_u45_input').val(data[0].data)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_lxbj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self)
            return defer.promise
        })
        auth_lxbj.render()
        $('#editProject_u77').on('click', function () {
            var lxbj = $('#editProject_u45_input')
            if (lxbj.hasAttr('readonly')) {
                $('#editProject_u78_txt').html('保存');
                lxbj.removeAttr('readonly');
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存立项背景？',
                    onConfirm: function () {
                        auth_lxbj.field('editProject_lxbj_hidden').set('exclude', 'updateProjectLxbj-cancel')
                        auth_lxbj.test()
                    }
                    , onCancel: function () {
                        auth_lxbj.field('editProject_lxbj_hidden').set('exclude', '')
                        auth_lxbj.field('editProject_lxbj_hidden').test('updateProjectLxbj-cancel')
                        $('#editProject_u78_txt').html('编辑')
                        lxbj.attr('readonly', 'readonly')
                    }
                })
            }
        })
        var auth_cxd = new Auth('#project_cxd', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_cxd = new AuthMsgs()
        auth_cxd.plug(authMsgs_cxd)
        auth_cxd.set('stopOnError', true)
        auth_cxd.register('updateProjectCxd-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBucket?_content=json&fieldName=cxd&fieldValue=' + encodeURIComponent($('#editProject_u48_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_cxd.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_cxd.getMsg(field.get('name')).show('success', '创新亮点修改成功');
                        }
                        $('#editProject_u83_txt').html('编辑')
                        $('#editProject_u48_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_cxd.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectCxd-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectCxd-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBucket?_content=json&fieldName=cxd&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_cxd.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_cxd.getMsg(field.get('name')).show('success', '创新亮点没有改变')
                        }
                        $('#editProject_u48_input').val(data[0].data)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_cxd.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        })
        auth_cxd.render()
        $('#editProject_u83').on('click', function () {
            var cxd = $('#editProject_u48_input')
            if (cxd.hasAttr('readonly')) {
                $('#editProject_u83_txt').html('保存');
                cxd.removeAttr('readonly');
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存创新亮点？',
                    onConfirm: function () {
                        auth_cxd.field('editProject_cxd_hidden').set('exclude', 'updateProjectCxd-cancel')
                        auth_cxd.test()
                    }
                    , onCancel: function () {
                        auth_cxd.field('editProject_cxd_hidden').set('exclude', '')
                        auth_cxd.field('editProject_cxd_hidden').test('updateProjectCxd-cancel')
                        $('#editProject_u83_txt').html('编辑')
                        cxd.attr('readonly', 'readonly')
                    }
                })
            }
        })
        this.ol = function () {
            return ol
        }
    }
}