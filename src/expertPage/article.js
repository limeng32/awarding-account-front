/**
 * Created by K550JK on 2017/1/22.
 */
var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var container = require('./container-view')
var subMenu = require('./subMenu/subMenu')
module.exports = {
    init: function () {
        var containerTpl = new XTemplate(container)
        var containerHtml = containerTpl.render({})
        $('article').html(containerHtml)

        subMenu.init({
            node: $('.subMenuContainer')
        })
    }
}