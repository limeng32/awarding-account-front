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
        auth.register('needAFail', function (value, attr, defer, field) {
            var self = this;
            //$('#icpv5').getDOMNode().click();
            defer.reject(self);
            return defer.promise;
        });
        auth.render();
        $('#personConfig_u102').on('click', function () {
            var name = $('#personConfig_name');
            if (name.hasAttr('readonly')) {
                $('#personConfig_u103_txt').html('保存');
                name.removeAttr('readonly');
            } else {
                $('#submitButton1').getDOMNode().click();
                $('#personConfig_u103_txt').html('编辑');
                name.attr('readonly', 'readonly');
            }
        });
        this.ol = function () {
            return ol;
        };
    }
}