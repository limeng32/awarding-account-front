var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var SP = require('core-front/smartPath/smartPath')
var editProjectVW = require('../../projectPage/editProject/editProject-view')
var uploadAttachment = require('./uploadAttachment/uploadAttachment')
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(editProjectVW)
        var html = tpl.render({
            project: p.project
        })
        p.node.html(html)
        uploadAttachment.init({
            node: $('#editProject_u4')
            , project: p.project
        })
        SP.resolveImgSrc('.img')
    }
}