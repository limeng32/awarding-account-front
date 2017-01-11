var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var OVL = require('overlay');
var sbTpl = require('./sideBar-view');
module.exports = {
    init: function (p) {
        var sbHtml = new XTemplate(sbTpl).render({})
        p.node.html(sbHtml)
        $('#aside_u14').offset({
            left: p.criterionLeft + $('#aside_u14').offset().left
        })
        var offset = null
        var currnetOffset = $('#aside_u14').offset().left
        $(window).on('resize', function () {
            if (offset == null) {
                offset = $('#headerContainer').offset()
            }
            $('#aside_u14').offset({
                left: currnetOffset - offset.left + $('#headerContainer').offset().left
            })
        })
    }
}