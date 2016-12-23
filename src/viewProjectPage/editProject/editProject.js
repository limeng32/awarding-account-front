var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var SP = require('core-front/smartPath/smartPath')
var editProjectVW = require('../../projectPage/editProject/editProject-view')
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(editProjectVW)
        var html = tpl.render({
            project: p.project
        })
        p.node.html(html)
        SP.resolveImgSrc('.img')
    }
}