var uaTpl = require('./uploadAttachment-view');
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
        var uaHtml = new XTemplate(uaTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: uaHtml,
            visible: true,
            xy: [150, 1010],
            width: '0',
            height: '0',
            closable: false,
            zIndex: -1,
            prefixCls: 'absolute-',
            visible: true,
            closeAction: 'hide'
        })
        ol.render()
        var projectId = null
        var uploader = new Uploader('#J_UploaderBtn_uploadAtta', {
            action: SP.resolvedIOPath('project/uploadAttachment?_content=json&')
            , type: 'auto'
            , data: {
                projectId: p == null ? null : p.projectId
            }
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
                                }
                                new CBD(d, deleteSuccess)
                            }, "json")
                    }
                    , onCancel: function () {
                    }
                })
            })
        })
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
        this.ol = function () {
            return ol;
        }
        this.setProjectId = function (_projectId) {
            uploader.set('data', {
                projectId: encodeURIComponent(_projectId)
            })
        }
    }
}