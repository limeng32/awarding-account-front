var uaTpl = require('./uploadAttachment-view');
var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
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
        });
        ol.render();
        KISSY.use('kg/uploader/2.0.3/index,kg/uploader/2.0.3/themes/default/index', function (S, Uploader, DefaultTheme) {
            var uploader = new Uploader('#J_UploaderBtn_uploadAtta', {
                action: SP.resolvedIOPath('project/uploadAttachment?_content=json'),
                type: 'auto',
                name: 'Filedata'
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
                //,allowExts: ''
            })).plug(new UrlsInput({target: '#J_Urls_uploadAtta'}))
                .plug(new ProBars())
            uploader.on('success', function (ev) {
                console.log(ev.file.result.url)
                $('.J_Download_' + ev.file.id).prop({
                    href: ev.file.result.url
                })
            })
        })
        this.ol = function () {
            return ol;
        };
    }
}