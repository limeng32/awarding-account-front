var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var SP = require('core-front/smartPath/smartPath')
var IO = require('io')
var JSONX = require('core-front/jsonx/jsonx')
var OVL = require('overlay')
var AD = require('kg/agiledialog/1.0.2/index')
var containerView = require('./container-view')
module.exports = {
    init: function () {
        var containerTpl = new XTemplate(containerView)
        var containerHtml = containerTpl.render({})
        $('article').html(containerHtml)
    }
}