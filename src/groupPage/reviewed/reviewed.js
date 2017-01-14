var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var view = require('./reviewed-view');
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(view)
        var html = tpl.render({
            data: {
                maxPageNum: 11
                , pageItems: [{
                    name: "新1"
                }, {name: "新2"}, {name: "新3"}, {name: "新4"}, {name: "新5"}]
                , pageNo: 1
            }
        })
        p.node.html(html)
    }
}