var $ = require('node').all;
var tpl = require('./header-view');
var ccTpl = require('./controlCenter-view');
var cpTpl = require('./changePortrait-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
var IO = require('io');
var SP = require('core-front/smartPath/smartPath');
var AI = require('core-front/authIdentify/index');
var OVL = require('overlay');
var UrlsInput = require('kg/uploader/2.0.3/plugins/urlsInput/urlsInput');
var ProBars = require('kg/uploader/2.0.3/plugins/proBars/proBars');
var Filedrop = require('kg/uploader/2.0.3/plugins/filedrop/filedrop');
var ImgCrop = require('kg/uploader/2.0.3/plugins/imgcrop/imgcrop');
var AliUploader = require('gallery/uploader/kissyuploader/5.0.0/index');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                var html = new XTemplate(tpl).render({
                    account: account
                });
                var ccHtml = new XTemplate(ccTpl).render({});
                var cpHtml = new XTemplate(cpTpl).render({
                    account: account
                });
                $('header').html(html);
                var ol = new OVL({
                    effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
                    easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
                    duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
                    target: '#home_u28',
                    content: ccHtml,
                    visible: true,
                    xy: [890, 10],
                    width: '0px',
                    height: '0px',
                    closeAction: 'hide'
                });
                ol.show();
                ol.close();
                $('#home_u28').on('mouseover', function () {
                    ol.show();
                }).on('mouseout', function () {
                    ol.close();
                });
                $('#home_u32').on('mouseover', function () {
                    ol.show();
                }).on('mouseout', function () {
                    ol.close();
                });
                $('#home_u34').on('click', function () {
                    ol2.show();
                })
                var ol2 = new OVL({
                    effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
                    easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
                    duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
                    target: '',
                    content: cpHtml,
                    visible: true,
                    xy: [400, 150],
                    width: '400px',
                    height: '390px',
                    closable: true,
                    closeAction: 'hide'
                });
                ol2.show();
                ol2.close();


                KISSY.use('kg/uploader/2.0.3/themes/cropUploader/index,kg/uploader/2.0.3/themes/imageUploader/style.css,kg/uploader/2.0.3/themes/cropUploader/style.css', function (S, ImageUploader) {
                    var uploader = new AliUploader('#J_UploaderBtn', {
                        action: SP.resolvedIOPath('uploadPortrait?_content=json'),
                        multiple: false,
                        type: 'ajax',
                        name: 'Filedata'
                    });
                    uploader.set('filter', function (data) {
                        data.success = 1;
                        return data;
                    })
                    uploader.theme(new ImageUploader({queueTarget: '#J_UploaderQueue'}));
                    var imgCrop = new ImgCrop({
                        initialXY: [10, 10], //初始坐标
                        initWidth: 200, //初始宽度
                        initHeight: 200, //初始高度
                        minHeight: 100, //最小高度
                        minWidth: 100, //最小宽度
                        touchable: true, //支持touch、pinch
                        ratio: true, //固定比例缩放
                        resizable: true//可以缩放
                    });
                    uploader.plug(new UrlsInput({target: '#J_Urls'}))
                        .plug(new ProBars())
                        .plug(new Filedrop())
                        .plug(imgCrop)
                    ;
                    uploader.on('error', function (ev) {
                        var result = ev.result;
                        alert('上传失败,错误消息为' + result);
                    });
                    uploader.on('success', function (ev) {
                    });
                    var computeModifyH = function () {
                        var crop = imgCrop.get('crop');
                        return parseInt(crop.getCropCoords().h * crop.getOriginalSize().height / crop.getDisplaySize().height);
                    };
                    var computeModifyW = function () {
                        var crop = imgCrop.get('crop');
                        return parseInt(crop.getCropCoords().w * crop.getOriginalSize().width / crop.getDisplaySize().width);
                    };
                    var computeModifyX = function () {
                        var crop = imgCrop.get('crop');
                        return parseInt(crop.getCropCoords().x * crop.getOriginalSize().width / crop.getDisplaySize().width);
                    };
                    var computeModifyY = function () {
                        var crop = imgCrop.get('crop');
                        return parseInt(crop.getCropCoords().y * crop.getOriginalSize().height / crop.getDisplaySize().height);
                    };
                    $('.submitPortrait').on('click', function () {
                        //if (imgCrop.get('crop').get('url') != '') {
                        //    IO.post(SP.resolvedIOPath('edit/savePortraitModify?_content=json'),
                        //        {
                        //            id: account.accountBucket[0].id,
                        //            portraitModify: account.accountBucket[0].portraitModify,
                        //            portraitModifyH: computeModifyH(),
                        //            portraitModifyW: computeModifyW(),
                        //            portraitModifyX: computeModifyX(),
                        //            portraitModifyY: computeModifyY()
                        //        },
                        //        function (d) {
                        //            d = JSONX.decode(d);
                        //            $('.portrait').prop('src', d.portrait);
                        //        }, "json");
                        //} else {
                        //    new AD({
                        //        type: 'alert',
                        //        content: "您还没有上传新头像"
                        //    });
                        //}
                    })
                })

                SP.resolveImgSrc('.img');
            });
        }
    }
}