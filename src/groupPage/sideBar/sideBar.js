var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var sbTpl = require('./sideBar-view');
module.exports = {
    init: function (p) {
        var sbHtml = new XTemplate(sbTpl).render({})
        p.node.html(sbHtml)
        $('#aside_u14').offset({
            left: $('#headerContainer').offset().left + 200
        })
        $(window).on('resize', function () {
            $('#aside_u14').offset({
                left: $('#headerContainer').offset().left + 200
            })
        })
    }
}