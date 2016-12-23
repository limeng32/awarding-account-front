var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var UploaderAuth = require('kg/uploader/2.0.3/plugins/auth/auth');
var UrlsInput = require('kg/uploader/2.0.3/plugins/urlsInput/urlsInput');
var ProBars = require('kg/uploader/2.0.3/plugins/proBars/proBars');
var AliUploader = require('gallery/uploader/kissyuploader/5.0.0/index');
var Uploader = require('kg/uploader/2.0.3/index')
var DefaultTheme = require('kg/uploader/2.0.3/themes/default/index')
var SP = require('core-front/smartPath/smartPath')
var uploadAttachmentVW = require('../../../projectPage/editProject/uploadAttachment/uploadAttachment-view')
var uploadedAttachmentVW = require('../../../projectPage/editProject/uploadAttachment/uploadedAttachment-view')
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
        var getTheAttachment = function (o) {
            var ret = null
            for (var i = 0; i < p.project.attachment.length; i++) {
                if (p.project.attachment[i].id == o.attr('data-id')) {
                    ret = p.project.attachment[i]
                    break
                }
            }
            return ret
        }
        var uploadedAttachmentTpl = new XTemplate(uploadedAttachmentVW)
        var uploadedAttachmentHtml = uploadedAttachmentTpl.render({
            project: p.project
            , formatSize: formatSize
            , editAble: false
        })
        var uploadAttachmentTpl = new XTemplate(uploadAttachmentVW)
        var uploadAttachmentHtml = uploadAttachmentTpl.render({
            p: {
                project: p.project
                , formatSize: formatSize
            }
        })
        p.node.html(uploadAttachmentHtml)
        $('#J_UploaderQueue_uploadAtta').html(uploadedAttachmentHtml)
        var uploader = new Uploader('#J_UploaderBtn_uploadAtta', {
            action: SP.resolvedIOPath('project/uploadAttachment?_content=json&')
            , type: 'ajax'
            , name: 'Filedata'
            , disabled: true
        })
        uploader.set('filter', function (data) {
            data.success = 1;
            return data;
        })
        uploader.theme(new DefaultTheme({
            queueTarget: '#J_UploaderQueue_uploadAtta'
            , fileTpl: ''
        }))
        $('.J_uploaded_Download').on('click', function (e) {
            var _attachment = getTheAttachment($(e.currentTarget))
            window.location.assign(SP.resolvedPath('project/downloadAttachment?attachmentId=' + _attachment.id));
        })
        SP.resolveImgSrc('.img')
    }
}