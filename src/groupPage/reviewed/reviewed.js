var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var IO = require('io')
var Node = require('node')
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var view = require('./reviewed-view')
var projectView = require('./reviewedProject-view')
var selectorView = require('./reviewedSelector-view')
module.exports = {
    init: function (p) {
        var tpl = new XTemplate(view), projectTpl = new XTemplate(projectView), selectorTpl = new XTemplate(selectorView)
        IO.post(SP.resolvedIOPath('group/listCompanyType?_content=json'),
            {},
            function (d) {
                d = JSONX.decode(d)
                var companyDictionary = $({}), companyTypeDictionary = $({})
                for (var i = 0; i < d.data.length; i++) {
                    if (d.data[i].length > 0) {
                        companyTypeDictionary.prop(d.data[i][0].companyTypeBean.flag, d.data[i][0].companyTypeBean)
                        companyDictionary.prop(d.data[i][0].companyTypeBean.flag, d.data[i])
                    }
                }
                IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                    {
                        phase: 'submited'
                    },
                    function (d2) {
                        var projectHtml = projectTpl.render({
                            data: d2.data
                        })
                        var selectorHtml = selectorTpl.render({
                            companyTypes: companyTypeDictionary[0]
                            , companies: {}
                        })
                        p.node.html(tpl.render({
                            projectHtml: projectHtml
                            , selectorHtml: selectorHtml
                            , currentValue: ''
                        }))
                        var reloadSelector = function (e) {
                            var selectorHtml = selectorTpl.render({
                                companyTypes: companyTypeDictionary[0]
                                , companies: companyDictionary.prop(e.currentTarget.value)
                                , currentValue: e.currentTarget.value
                            })
                            $('#reviewed_u11').html(selectorHtml)
                            console.log($('#reviewed_u11_input')[0].value)
                            IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                                {
                                    phase: 'editing'
                                    , company: $('#reviewed_u12_input')[0].value
                                    , companyType: $('#reviewed_u11_input')[0].value
                                },
                                function (_d2) {
                                    var projectHtml = projectTpl.render({
                                        data: _d2.data
                                    })
                                    $('#listProjectContainer').html(projectHtml)
                                }, "json")
                            $('#reviewed_u11_input').on('change', reloadSelector)
                        }
                        $('#reviewed_u11_input').on('change', reloadSelector)
                    }, "json")
            }, "json")
    }
}