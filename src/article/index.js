var $ = require('node').all;
var tpl = require('./index-view');
var index_changePassTpl = require('./index_changePass-view');
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
    init:function(){
    var p = {size:6,useTimestamp:true}
    var ran = new RAN(p);
    KISSY.use('', function (S) {
        var html = new XTemplate(tpl).render({
        });
        var index_changePass = new XTemplate(index_changePassTpl).render({
        });
        var changePasstoken = '',oldChangePassToken = '';
        $('article').html(html);
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
            target:'#v2',
            content: index_changePass,
            visible: true,
            xy: [1050, 85],
            width: '290px',
            height:'256px',
            closeAction: 'hide'
        });
        ol.show();
        ol.close();
        $('#v2').on('click', function (e) {
            if(ol.get('visible')){
                $('#v3').removeClass('focus');
                ol.close();
            }else{
                $('#v3').addClass('focus');
                ol.show();
            }
        })
        var auth = new Auth('#J_Auth',{
            fnFilter:function($field){
                return $field.attr('type') == 'hidden';
            }
        });
        var authMsgs = new AuthMsgs();
        auth.plug(authMsgs);
        auth.set('stopOnError',true);
        auth.register('max-len', function (value, attr, defer, field) {
            var self = this;
            var max = Number(attr);
            if (value.length<max) {
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
                if (data[0]) {
                    defer.resolve(self);
                } else {
                    self.msg('error', '您输入的验证码有误');
                    defer.reject(self);
                }
            });
            return defer.promise;
        }).register('sendEmail', function (value, attr, defer, field) {
            var self = this;
            //IO.post(SP.resolvedIOPath('signIn/testCaptcha?_content=json&value=' + $('#icpv1').val() + '&token=' + changePasstoken), 'json').then(function (data) {
            //    if (data[0]) {
            //        defer.resolve(self);
            //    } else {
            //        self.msg('error', '您输入的验证码有误');
            //        defer.reject(self);
            //    }
            //});
            defer.resolve(self);
            return defer.promise;
        }).register('needAFail', function (value, attr, defer, field) {
            var self = this;
            $('#icpv5').getDOMNode().click();
            authMsgs.getMsg('icpv3').hide();
            authMsgs.getMsg('icpv3').show('success','修改密码的邮件已发送,请您查收');
            defer.reject(self);
            return defer.promise;
        });
        auth.render();
        var refreshCaptcha = function(){
            oldChangePassToken = changePasstoken;
            changePasstoken = ran.generate();
            $('#icpv6_img').prop({src: SP.resolvedPath('signIn/captchaImage?token='+changePasstoken+'&oldToken='+oldChangePassToken)});
        }
        $('#icpv5').on('click',function(){
            if($('#icpv5').attr('hidden') != 'hidden'){
                $('#icpv6_img').removeAttr('hidden');
                $('#icpv5').attr('hidden','hidden');
                refreshCaptcha();
            }else{
                 $('#icpv5').removeAttr('hidden');
                 $('#icpv6_img').attr('hidden','hidden');
                 $('#icpv1').getDOMNode().value = '';
            }
        })
        $('#icpv6_img').on('click',function(){
            refreshCaptcha();
        })
    })
    }
}