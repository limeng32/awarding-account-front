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
        var _step
        var _relation = $({
            editing: 1
            , submited: 2
            , checking: 3
            , pass: 4
        })
        var renderStep = function (p) {
            _step = new STB('#projectPhase', {'color': 'blue'})
            _step.render()
        }
        KISSY.use('kg/stepbar/2.1.0/stepbar.css', function (KISSY) {
            KISSY.use('awarding-account-front/projectPage/stepBar/stepBarAffix.css', function (KISSY) {
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
            })
        })
        this.step = function (n) {
            var a = _relation.prop(n)
            if (a == null) {
                _step.set('act', -1)
            }
            else if (_step.get('act') != a) {
                _step.set('act', a);
            }
        }
    }
}