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
        //S.use('kg/uploader/6.2.7/index,kg/uploader/6.2.7/themes/default/index,kg/uploader/6.2.7/themes/default/style.css', function (S, Uploader, DefaultTheme) {
        //    //上传组件插件
        //    var plugins = 'kg/uploader/6.2.7/plugins/auth/auth,' +
        //        'kg/uploader/6.2.7/plugins/urlsInput/urlsInput,' +
        //        'kg/uploader/6.2.7/plugins/proBars/proBars';
        //
        //    S.use(plugins, function (S, Auth, UrlsInput, ProBars) {
        //        var uploader = new Uploader('#J_UploaderBtn', {
        //            //处理上传的服务器端脚本路径
        //            action: "upload"
        //        });
        //        //使用主题
        //        uploader.theme(new DefaultTheme({
        //            queueTarget: '#J_UploaderQueue'
        //        }));
        //        //验证插件
        //        uploader.plug(new Auth({
        //            //最多上传个数
        //            max: 3
        //        }))
        //            //url保存插件
        //            .plug(new UrlsInput({target: '#J_Urls'}))
        //            //进度条集合
        //            .plug(new ProBars())
        //        ;
        //    });
        //})
        var uaHtml = new XTemplate(uaTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: uaHtml,
            visible: true,
            xy: [400, 440],
            width: '600px',
            height: '250px',
            closable: true,
            zIndex: 5,
            visible: false,
            closeAction: 'hide'
        });
        ol.render();
        KISSY.use('kg/uploader/2.0.3/index,kg/uploader/2.0.3/themes/default/index,kg/uploader/2.0.3/themes/default/style.css', function (S, Uploader, DefaultTheme) {
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
                maxSize: 102400,
                required: true,
                //allowExts: ''
            })).plug(new UrlsInput({target: '#J_Urls_uploadAtta'}))
                .plug(new ProBars())
            uploader.on('success', function (ev) {
                console.log(ev.file)
                $('.J_Del_' + ev.file.id).html('asdf')
            })
        })
        this.ol = function () {
            return ol;
        };
    }
}