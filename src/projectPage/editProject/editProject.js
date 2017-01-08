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
var AD = require('kg/agiledialog/5.0.2/index');
var DTP = require('kg/datetimepicker/2.0.3/index')
var SPB = require('spinbox-by-limeng32/index')
var editProjectVW = require('./editProject-view');
var uploadAttachment = require('./uploadAttachment/uploadAttachment')
var stepBar = require('../../viewProjectPage/stepBar/stepBar')
module.exports = {
    init: function (p) {
        var epTpl = new XTemplate(editProjectVW)
        var listProjectCallback = null
        var yearNum = (new Date()).getYear()
        yearNum = yearNum < 1900 ? (yearNum + 1900) : yearNum
        var epHtml = epTpl.render({
            account: p.account
            , editAble: true
            , project: {
                name: '点击右方“编辑”按钮即可编辑项目名称'
                , projectBucket: [{
                    background: '保存项目名称后点击右方“编辑”按钮即可编辑立项背景'
                    , innovation: '保存项目名称后点击右方“编辑”按钮即可编辑创新亮点'
                    , synthesize: '保存项目名称后点击右方“编辑”按钮即可编辑综合背景'
                    , application: '保存项目名称后点击右方“编辑”按钮即可编辑应用情况'
                    , recommendition: '保存项目名称后点击右方“编辑”按钮即可编辑推荐意见'
                }]
            }
        })
        p.node.html(epHtml)
        new SPB('.ks-spinbox', {
            onValueChange: function (e) {
            }
        })
        new DTP({
            start: '#editProject_u121'
            , timepicker: false
            , closeOnDateSelect: true
            , yearStart: 2010
            , yearEnd: yearNum
            , todayButton: false
            , showDateLen: false
        })
        var allFieLdsReadonly = function () {
            var ret = true
            var editProjectFields = $('.J_editProject_textaera')
            for (var i = 0; i < editProjectFields.length; i++) {
                if (!$(editProjectFields[i]).hasAttr('readonly')) {
                    ret = false
                    break
                }
            }
            return ret
        }
        var clearProject = function (project, editAble) {
            epHtml = epTpl.render({
                account: p.account
                , project: project
                , editAble: editAble
            })
            //ol.set('content', epHtml, {force: true})
            p.node.html(epHtml)
            new SPB('.ks-spinbox', {
                onValueChange: function (e) {
                }
            })
            new DTP({
                start: '#editProject_u121'
                , timepicker: false
                , closeOnDateSelect: true
                , yearStart: 2010
                , yearEnd: yearNum
                , todayButton: false
                , showDateLen: false
            })
            auth_name.render()
            $('#editProject_u102').on('click', handleNameButton)
            auth_basic.render()
            $('#editProject_u123').on('click', handleBasicButton)
            auth_lxbj.render()
            $('#editProject_u77').on('click', handleLxbjButton)
            auth_cxd.render()
            $('#editProject_u83').on('click', handleCxdButton)
            auth_zhbj.render()
            $('#editProject_u88').on('click', handleZhbjButton)
            auth_yyqk.render()
            $('#editProject_u93').on('click', handleYyqkButton)
            auth_tjyj.render()
            $('#editProject_u98').on('click', handleTjyjButton)
            stepBar.step(project.phase)
            uploadAttachment.reRender(project, editAble)
            uploadAttachment.setProjectId(project.id)
        }
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
                        uploadAttachment.reRender({}, true)
                        uploadAttachment.setProjectId($('#editProject_id').val())
                        enableTextarea()
                        //刷新右边的项目列表
                        listProjectCallback();
                        //进度条变为“申报中”
                        stepBar.step('editing')
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
        var handleNameButton = function () {
            var name = $('#editProject_u40_input')
            if (name.hasAttr('readonly')) {
                $('#editProject_u103_txt').html('保存');
                name.removeAttr('readonly');
                name.removeAttr('disabled')
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
        }
        $('#editProject_u102').on('click', handleNameButton)

        var auth_basic = new Auth('#project_basic', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_basic = new AuthMsgs()
        auth_basic.plug(authMsgs_basic)
        auth_basic.set('stopOnError', true)
        auth_basic.register('updateProjectBasic-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBasic?_content=json&awardCount=' + encodeURIComponent($('#editProject_u116').val()) + '&patentCount=' + encodeURIComponent($('#editProject_u119').val()) + '&serviceDate=' + encodeURIComponent($('#editProject_u121').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_basic.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_basic.getMsg(field.get('name')).show('success', '基本信息修改成功')
                        }
                        $('#editProject_u121').val(data[0].data.serviceDate)
                        $('#editProject_u123_txt').html('编辑')
                        $('#editProject_u113').replaceClass('editProject_u113_enabled', 'editProject_u113_disabled')
                        $('#editProject_u116').attr('readonly', 'readonly')
                        $('#editProject_u116').attr('disabled', 'disabled')
                        $('#editProject_u119').attr('readonly', 'readonly')
                        $('#editProject_u119').attr('disabled', 'disabled')
                        $('#editProject_u121').attr('readonly', 'readonly')
                        $('#editProject_u121').attr('disabled', 'disabled')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_basic.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self)
            return defer.promise
        }).register('updateProjectBasic-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectBasic-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBasic?_content=json&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_basic.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_basic.getMsg(field.get('name')).show('success', '基本信息没有改变')
                        }
                        $('#editProject_u116').val(data[0].data.awardCount)
                        $('#editProject_u119').val(data[0].data.patentCount)
                        $('#editProject_u121').val(data[0].data.serviceDate)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_basic.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self)
            return defer.promise
        })
        auth_basic.render()
        var handleBasicButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var awardCount = $('#editProject_u116')
            var patentCount = $('#editProject_u119')
            var serviceDate = $('#editProject_u121')
            if (serviceDate.hasAttr('readonly')) {
                $('#editProject_u123_txt').html('保存')
                $('#editProject_u113').replaceClass('editProject_u113_disabled', 'editProject_u113_enabled')
                awardCount.removeAttr('readonly')
                awardCount.removeAttr('disabled')
                patentCount.removeAttr('readonly')
                patentCount.removeAttr('disabled')
                serviceDate.removeAttr('readonly')
                serviceDate.removeAttr('disabled')
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存基本信息？',
                    onConfirm: function () {
                        auth_basic.field('editProject_basic_hidden').set('exclude', 'updateProjectBasic-cancel')
                        auth_basic.test()
                    }
                    , onCancel: function () {
                        auth_basic.field('editProject_basic_hidden').set('exclude', '')
                        auth_basic.field('editProject_basic_hidden').test('updateProjectBasic-cancel')
                        $('#editProject_u123_txt').html('编辑')
                        $('#editProject_u113').replaceClass('editProject_u113_enabled', 'editProject_u113_disabled')
                        awardCount.attr('readonly', 'readonly')
                        awardCount.attr('disabled', 'disabled')
                        patentCount.attr('readonly', 'readonly')
                        patentCount.attr('disabled', 'disabled')
                        serviceDate.attr('readonly', 'readonly')
                        serviceDate.attr('disabled', 'disabled')
                    }
                })
            }
        }
        $('#editProject_u123').on('click',handleBasicButton)

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
                        $('#editProject_u78_txt').html('编辑')
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
        var handleLxbjButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var lxbj = $('#editProject_u45_input')
            if (lxbj.hasAttr('readonly')) {
                $('#editProject_u78_txt').html('保存');
                lxbj.removeAttr('readonly');
                lxbj.removeAttr('disabled')
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
        }
        $('#editProject_u77').on('click', handleLxbjButton)
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
        var handleCxdButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var cxd = $('#editProject_u48_input')
            if (cxd.hasAttr('readonly')) {
                $('#editProject_u83_txt').html('保存');
                cxd.removeAttr('readonly');
                cxd.removeAttr('disabled')
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
        }
        $('#editProject_u83').on('click', handleCxdButton)
        var auth_zhbj = new Auth('#project_zhbj', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_zhbj = new AuthMsgs()
        auth_zhbj.plug(authMsgs_zhbj)
        auth_zhbj.set('stopOnError', true)
        auth_zhbj.register('updateProjectZhbj-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBucket?_content=json&fieldName=zhbj&fieldValue=' + encodeURIComponent($('#editProject_u10_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_zhbj.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_zhbj.getMsg(field.get('name')).show('success', '综合背景修改成功');
                        }
                        $('#editProject_u88_txt').html('编辑')
                        $('#editProject_u10_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_zhbj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectZhbj-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectZhbj-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBucket?_content=json&fieldName=zhbj&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_zhbj.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_zhbj.getMsg(field.get('name')).show('success', '综合背景没有改变')
                        }
                        $('#editProject_u10_input').val(data[0].data)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_zhbj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        })
        auth_zhbj.render()
        var handleZhbjButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var zhbj = $('#editProject_u10_input')
            if (zhbj.hasAttr('readonly')) {
                $('#editProject_u88_txt').html('保存');
                zhbj.removeAttr('readonly');
                zhbj.removeAttr('disabled')
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存综合背景？',
                    onConfirm: function () {
                        auth_zhbj.field('editProject_zhbj_hidden').set('exclude', 'updateProjectZhbj-cancel')
                        auth_zhbj.test()
                    }
                    , onCancel: function () {
                        auth_zhbj.field('editProject_zhbj_hidden').set('exclude', '')
                        auth_zhbj.field('editProject_zhbj_hidden').test('updateProjectZhbj-cancel')
                        $('#editProject_u88_txt').html('编辑')
                        zhbj.attr('readonly', 'readonly')
                    }
                })
            }
        }
        $('#editProject_u88').on('click', handleZhbjButton)
        var auth_yyqk = new Auth('#project_yyqk', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_yyqk = new AuthMsgs()
        auth_yyqk.plug(authMsgs_yyqk)
        auth_yyqk.set('stopOnError', true)
        auth_yyqk.register('updateProjectYyqk-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBucket?_content=json&fieldName=yyqk&fieldValue=' + encodeURIComponent($('#editProject_u7_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_yyqk.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_yyqk.getMsg(field.get('name')).show('success', '应用情况修改成功');
                        }
                        $('#editProject_u93_txt').html('编辑')
                        $('#editProject_u7_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_yyqk.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectYyqk-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectYyqk-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBucket?_content=json&fieldName=yyqk&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_yyqk.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_yyqk.getMsg(field.get('name')).show('success', '应用情况没有改变')
                        }
                        $('#editProject_u7_input').val(data[0].data)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_yyqk.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        })
        auth_yyqk.render()
        var handleYyqkButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var yyqk = $('#editProject_u7_input')
            if (yyqk.hasAttr('readonly')) {
                $('#editProject_u93_txt').html('保存');
                yyqk.removeAttr('readonly');
                yyqk.removeAttr('disabled')
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存应用情况？',
                    onConfirm: function () {
                        auth_yyqk.field('editProject_yyqk_hidden').set('exclude', 'updateProjectYyqk-cancel')
                        auth_yyqk.test()
                    }
                    , onCancel: function () {
                        auth_yyqk.field('editProject_yyqk_hidden').set('exclude', '')
                        auth_yyqk.field('editProject_yyqk_hidden').test('updateProjectYyqk-cancel')
                        $('#editProject_u93_txt').html('编辑')
                        yyqk.attr('readonly', 'readonly')
                    }
                })
            }
        }
        $('#editProject_u93').on('click', handleYyqkButton)
        var auth_tjyj = new Auth('#project_tjyj', {
            fnFilter: function ($field) {
                return $field.attr('type') == 'hidden';
            }
        })
        var authMsgs_tjyj = new AuthMsgs()
        auth_tjyj.plug(authMsgs_tjyj)
        auth_tjyj.set('stopOnError', true)
        auth_tjyj.register('updateProjectTjyj-confirm', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/updateBucket?_content=json&fieldName=tjyj&fieldValue=' + encodeURIComponent($('#editProject_u2_input').val()) + '&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_tjyj.getMsg(field.get('name')).show('success', data[0].message);
                        } else {
                            authMsgs_tjyj.getMsg(field.get('name')).show('success', '推荐意见修改成功');
                        }
                        $('#editProject_u98_txt').html('编辑')
                        $('#editProject_u2_input').attr('readonly', 'readonly')
                    } else {
                        if (data[0].message != null) {
                            authMsgs_tjyj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        }).register('updateProjectTjyj-cancel', function (value, attr, defer, field) {
            field.set('exclude', 'updateProjectTjyj-cancel')
            var self = this;
            IO.post(SP.resolvedIOPath('submitProject/resumeBucket?_content=json&fieldName=tjyj&id=' + encodeURIComponent($('#editProject_id').val())), 'json')
                .then(function (data) {
                    if (data[0].flag) {
                        if (data[0].message != null) {
                            authMsgs_tjyj.getMsg(field.get('name')).show('success', data[0].message)
                        } else {
                            authMsgs_tjyj.getMsg(field.get('name')).show('success', '推荐意见没有改变')
                        }
                        $('#editProject_u2_input').val(data[0].data)
                    } else {
                        if (data[0].message != null) {
                            authMsgs_tjyj.getMsg(field.get('name')).show('error', data[0].message)
                        }
                    }
                })
            defer.reject(self);
            return defer.promise;
        })
        auth_tjyj.render()
        var handleTjyjButton = function () {
            if (!judgeProjectId()) {
                return
            }
            var tjyj = $('#editProject_u2_input')
            if (tjyj.hasAttr('readonly')) {
                $('#editProject_u98_txt').html('保存');
                tjyj.removeAttr('readonly');
                tjyj.removeAttr('disabled')
            } else {
                new AD({
                    title: '温馨提示',
                    content: '您确定要保存推荐意见？',
                    onConfirm: function () {
                        auth_tjyj.field('editProject_tjyj_hidden').set('exclude', 'updateProjectTjyj-cancel')
                        auth_tjyj.test()
                    }
                    , onCancel: function () {
                        auth_tjyj.field('editProject_tjyj_hidden').set('exclude', '')
                        auth_tjyj.field('editProject_tjyj_hidden').test('updateProjectTjyj-cancel')
                        $('#editProject_u98_txt').html('编辑')
                        tjyj.attr('readonly', 'readonly')
                    }
                })
            }
        }
        $('#editProject_u98').on('click', handleTjyjButton)
        var enableTextarea = function () {
            $('.J_editProject_textaera').removeAttr('disabled')
        }
        var judgeProjectId = function () {
            var ret = true;
            if ($('#editProject_id').val() == '') {
                new AD({
                    type: 'alert',
                    content: '请您先编辑并保存项目名称'
                });
                ret = false;
            }
            return ret;
        }
        IO.post(SP.resolvedIOPath('project/initAttachment?_content=json'),
            {
                projectId: $('#editProject_id').val()
            },
            function (d) {
                uploadAttachment.init({
                    uploadAuth: d.data
                    , node: $('#editProject_u4')
                })
            }, "json")
        this.ol = function () {
            return p.node
        }
        this.render = function (id, editAble) {
            if (editAble == null) {
                editAble = false
            }
            if (id == null) {
                var _continue = true
                if (!allFieLdsReadonly()) {
                    new AD({
                        title: '温馨提示',
                        content: '当前项目有处于编辑状态的内容，您确定忽略它并建立新项目么？'
                        , onConfirm: function () {
                            clearProject({}, editAble)
                        }
                    })
                } else {
                    clearProject({}, editAble)
                }
            } else {
            IO.post(SP.resolvedIOPath('project/getProjectWithBucket?_content=json'),
                {
                    id: id
                },
                function (d) {
                    d = JSONX.decode(d)
                    clearProject(d.data, editAble)
                }, "json")
            }
        }
        this.setListProjectCallback = function (f) {
            listProjectCallback = f;
        }
        this.projectIdVal = function () {
            return $('#editProject_id').val()
        }
    }
}