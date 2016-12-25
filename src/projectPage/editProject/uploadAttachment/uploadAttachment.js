var uploadAttachmentVW = require('./uploadAttachment-view');
var uamView = require('./uploadAuthMsg-view')
var uploadedAttachmentVW = require('./uploadedAttachment-view')
var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
var CBD = require('core-front/callbackDialog/index')
var OVL = require('overlay');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var RAN = require('core-front/random/index');
var SP = require('core-front/smartPath/smartPath');
var AD = require('kg/agiledialog/1.0.2/index');
var UploaderAuth = require('kg/uploader/2.0.3/plugins/auth/auth');
var UrlsInput = require('kg/uploader/2.0.3/plugins/urlsInput/urlsInput');
var ProBars = require('kg/uploader/2.0.3/plugins/proBars/proBars');
var AliUploader = require('gallery/uploader/kissyuploader/5.0.0/index');
var Uploader = require('kg/uploader/2.0.3/index')
var DefaultTheme = require('kg/uploader/2.0.3/themes/default/index')
module.exports = {
    init: function (p) {
        var formatSize = function (fileSize) {
            if (fileSize < 1024) {
                return fileSize + 'B';
            } else if (fileSize < (1024 * 1024)) {
                var temp = fileSize / 1024;
                temp = temp.toFixed(2);
                return temp + 'KB';
            } else if (fileSize < (1024 * 1024 * 1024)) {
                var temp = fileSize / (1024 * 1024);
                temp = temp.toFixed(2);
                return temp + 'MB';
            } else {
                var temp = fileSize / (1024 * 1024 * 1024);
                temp = temp.toFixed(2);
                return temp + 'GB';
            }
        }
        var getTheAttachment = function (o, project) {
            var ret = null
            for (var i = 0; i < project.attachment.length; i++) {
                if (project.attachment[i].id == o.attr('data-id')) {
                    ret = project.attachment[i]
                    break
                }
            }
            return ret
        }
        var handleDelete = function (o, project) {
            var _attachment = getTheAttachment(o, project)
            new AD({
                title: '温馨提示',
                content: '您确定要删除附件 ' + _attachment.name + ' ？',
                onConfirm: function () {
                    IO.post(SP.resolvedIOPath('project/deleteAttachment?_content=json'),
                        {
                            attachmentId: _attachment.id
                        },
                        function (d) {
                            var deleteSuccess = function () {
                                $('#queue-file-' + _attachment.id).fadeOut(0.4, function () {
                                    $('#queue-file-' + _attachment.id).remove()
                                })
                                $('.uploadAuthMsg').html(uamTpl.render({
                                    projectRemainNumber: d.data.projectRemainNumber
                                    , accountRemainCapacity: formatSize(d.data.accountRemainCapacity)
                                }))
                            }
                            new CBD(d, deleteSuccess)
                        }, "json")
                }
                , onCancel: function () {
                }
            })
        }
        var uamTpl = new XTemplate(uamView)
        var uamHtml = uamTpl.render({
            projectRemainNumber: p.uploadAuth.projectRemainNumber
            , accountRemainCapacity: formatSize(p.uploadAuth.accountRemainCapacity)
        })
        var uploadedAttachmentTpl = new XTemplate(uploadedAttachmentVW)
        var uploadedAttachmentHtml = uploadedAttachmentTpl.render({
            project: p.project
            , formatSize: formatSize
        })
        var uploadAttachmentTpl = new XTemplate(uploadAttachmentVW)
        var uploadAttachmentHtml = uploadAttachmentTpl.render({
            p: {
                uamHtml: uamHtml
            }
        })
        p.node.html(uploadAttachmentHtml)
        $('#J_UploaderQueue_uploadAtta').html(uploadedAttachmentHtml)
        var uploader = new Uploader('#J_UploaderBtn_uploadAtta', {
            disabled: true
        });
        uploader.theme(new DefaultTheme({
            queueTarget: '#J_UploaderQueue_uploadAtta'
            , fileTpl: ''
        }))
        this.ol = function () {
            return p.node
        }
        this.setProjectId = function (_projectId) {
            uploader.set('data', {
                projectId: encodeURIComponent(_projectId)
            })
        }
        this.reRender = function (project, editAble) {
            uploadedAttachmentHtml = uploadedAttachmentTpl.render({
                project: project
                , formatSize: formatSize
                , editAble: editAble
            })
            uploadAttachmentHtml = uploadAttachmentTpl.render({
                p: {
                    uamHtml: uamHtml
                }
            })
            $('#editProject_u4').html(uploadAttachmentHtml)
            uploader = new Uploader('#J_UploaderBtn_uploadAtta', {
                action: SP.resolvedIOPath('project/uploadAttachment?_content=json&')
                , type: 'ajax'
                , data: {}
                , name: 'Filedata'
            });
            uploader.set('filter', function (data) {
                data.success = 1;
                return data;
            })
            uploader.theme(new DefaultTheme({
                queueTarget: '#J_UploaderQueue_uploadAtta'
                , fileTpl: ''
            }))
            uploader.plug(new UploaderAuth({
                maxSize: 102400
                , required: true
            })).plug(new UrlsInput({target: '#J_Urls_uploadAtta'}))
                .plug(new ProBars())
            uploader.on('success', function (ev) {
                $('.uploadAuthMsg').html(uamTpl.render({
                    projectRemainNumber: ev.result.data.uploadAuth.projectRemainNumber
                    , accountRemainCapacity: formatSize(ev.result.data.uploadAuth.accountRemainCapacity)
                }))
                $('.J_Download_' + ev.file.id).append('&nbsp;').append(formatSize(ev.file.size)).on('click', function () {
                    window.location.assign(SP.resolvedPath('project/downloadAttachment?attachmentId=' + ev.result.data.id));
                })
                $('.J_Del_' + ev.file.id).detach('click', {
                    '': {
                        deep: true
                    }
                }).on('click', function () {
                    new AD({
                        title: '温馨提示',
                        content: '您确定要删除附件 ' + ev.file.name + ' ？',
                        onConfirm: function () {
                            IO.post(SP.resolvedIOPath('project/deleteAttachment?_content=json'),
                                {
                                    attachmentId: ev.result.data.id
                                },
                                function (d) {
                                    var deleteSuccess = function () {
                                        ev.preventDefault()
                                        var index = ev.file.id
                                        uploader.get('queue').remove(index)
                                        $('.uploadAuthMsg').html(uamTpl.render({
                                            projectRemainNumber: d.data.projectRemainNumber
                                            ,
                                            accountRemainCapacity: formatSize(d.data.accountRemainCapacity)
                                        }))
                                    }
                                    new CBD(d, deleteSuccess)
                                }, "json")
                        }
                        , onCancel: function () {
                        }
                    })
                })
            })
            if (!editAble) {
                uploader.set('disabled', true)
            } else {
                uploader.set('disabled', false)
            }
            $('#J_UploaderQueue_uploadAtta').html(uploadedAttachmentHtml)

            $('.J_uploaded_Del').on('click', function (e) {
                handleDelete($(e.currentTarget), project)
            })
            $('.J_uploaded_Download').on('click', function (e) {
                var _attachment = getTheAttachment($(e.currentTarget))
                window.location.assign(SP.resolvedPath('project/downloadAttachment?attachmentId=' + _attachment.id));
            })
            IO.post(SP.resolvedIOPath('project/initAttachment?_content=json'),
                {
                    projectId: project.id
                },
                function (cb) {
                    uamHtml = uamTpl.render({
                        projectRemainNumber: cb.data.projectRemainNumber
                        , accountRemainCapacity: formatSize(cb.data.accountRemainCapacity)
                    })
                    $('.uploadAuthMsg').html(uamHtml)
                }, "json")
        }
        this.formatSize = function (o) {
            return formatSize(o)
        }
    }
}