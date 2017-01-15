var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var IO = require('io')
var Node = require('node');
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var view = require('./reviewed-view');
var projectView = require('./reviewedProject-view');
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(view), projectTpl = new XTemplate(projectView)
        IO.post(SP.resolvedIOPath('group/listCompanyType?_content=json'),
            {},
            function (d) {
                d = JSONX.decode(d)
                var projectHtml
                IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                    {
                        phase: 'submited'
                    },
                    function (d2) {
                        projectHtml = projectTpl.render({
                            data: d2.data
                        })
                        p.node.html(tpl.render({
                            projectHtml: projectHtml
                        }))
                    }, "json")
                console.log(d.data)
            }, "json")
    }
}