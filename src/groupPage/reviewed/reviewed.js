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
                        p.node.html(tpl.render({
                            projectHtml: projectHtml
                            , companyTypes: companyTypeDictionary[0]
                            , companies: d.data
                        }))
                    }, "json")
                //console.log(companyTypeDictionary[0])
                //console.log(companyDictionary[0])
            }, "json")
    }
}