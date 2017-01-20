var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var IO = require('io')
var Node = require('node');
var JSONX = require('core-front/jsonx/jsonx')
var SP = require('core-front/smartPath/smartPath')
var view = require('./detector-view');
var projectView = require('./detectorProject-view')
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(view), projectTpl = new XTemplate(projectView)
        var initListProjectButton = function () {
            $('.detector_u20').on('mouseover', function (e) {
                $(e.currentTarget).one('.detector_u21_txt').hide()
                $(e.currentTarget).all('.detector_button').show()
            })
                .on('mouseout', function (e) {
                $(e.currentTarget).one('.detector_u21_txt').show()
                $(e.currentTarget).all('.detector_button').hide()
            })
            //$('.J_listProjectViewer').on('click', function (e) {
            //    var id = $(e.currentTarget).attr('data-id')
            //    window.open(SP.resolvedPath('viewProject/' + id))
            //})
        }
        IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
            {
                phase: 'submited'
            },
            function (d2) {
                d2 = JSONX.decode(d2)
                var projectHtml = projectTpl.render({
                    data: d2.data
                })
                var html = tpl.render({projectHtml: projectHtml})
                p.node.html(html)
                initListProjectButton()
            }, "json")
    }
}