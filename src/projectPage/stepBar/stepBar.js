var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var IO = require('io')
var STB = require('kg/stepbar/2.1.0/index')
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var stbTpl = require('./stepBar-view')
module.exports = {
    init: function (p) {
        var renderStep = function (p) {
            var step = new STB('#projectPhase', {'color': 'blue'})
            step.render()
        }
        var stbHtml = new XTemplate(stbTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: stbHtml,
            visible: true,
            xy: [25, 115],
            width: '0px',
            height: '0px',
            closable: false,
            zIndex: -1,
            visible: true,
            prefixCls: 'absolute-',
            closeAction: 'hide'
        })
        ol.render()
        renderStep()
    }
}