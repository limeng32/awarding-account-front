var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var view = require('./detector-view');
module.exports = {
    init: function (p) {
        var html = new XTemplate(view).render({})
        p.node.html(html)
    }
}