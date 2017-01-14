var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var IO = require('io')
var Node = require('node');
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var view = require('./reviewed-view');
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(view)
        IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
            {
                phase: 'submited'
            },
            function (d) {
                d = JSONX.decode(d)
                p.node.html(tpl.render({
                    data: d.data
                }))
            }, "json")

    }
}