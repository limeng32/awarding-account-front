var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var OVL = require('overlay');
var lpTpl = require('./listProject-view');
module.exports = {
    init: function (p) {
        var lpHtml = new XTemplate(lpTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: lpHtml,
            visible: true,
            xy: [880, 194],
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