var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var SP = require('core-front/smartPath/smartPath')
var IO = require('io')
var JSONX = require('core-front/jsonx/jsonx')
var OVL = require('overlay')
var AD = require('kg/agiledialog/1.0.2/index')
var STB = require('kg/stepbar/2.1.0/index')
var containerView = require('./container-view')
module.exports = {
    init: function () {
        var containerTpl = new XTemplate(containerView)
        var containerHtml = containerTpl.render({})
        $('article').html(containerHtml)
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
            KISSY.use('awarding-account-front/projectPage/stepBar/stepBar.css', function (KISSY) {
                renderStep()
            })
        })
    }
}