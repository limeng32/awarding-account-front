var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var STB = require('kg/stepbar/2.1.0/index')
var SP = require('core-front/smartPath/smartPath')
var stepBarVW = require('../../projectPage/stepBar/stepBar-view')
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(stepBarVW)
        var html = tpl.render({})
        p.html(html)
        var _step
        var _relation = $({
            editing: 1
            , submited: 2
            , checking: 3
            , pass: 4
        })
        var renderStep = function () {
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