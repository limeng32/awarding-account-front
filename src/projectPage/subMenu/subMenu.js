var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var OVL = require('overlay');
var sbTpl = require('./subMenu-view');
module.exports = {
    init: function (p) {
        var sbHtml = new XTemplate(sbTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: sbHtml,
            visible: true,
            xy: [50, 60],
            width: '0px',
            height: '0px',
            closable: false,
            zIndex: -1,
            visible: true,
            prefixCls: 'fixed-',
            closeAction: 'hide'
        })
        ol.render()
    }
}