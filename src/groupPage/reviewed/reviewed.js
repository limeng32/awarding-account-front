var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var IO = require('io')
var Node = require('node')
var PG = require('kg/pagination/2.0.0/index')
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
                var companyDictionary = $({}), companyTypeDictionary = $({}), projectPagination = null
                for (var i = 0; i < d.data.length; i++) {
                    if (d.data[i].length > 0) {
                        companyTypeDictionary.prop(d.data[i][0].companyTypeBean.name, d.data[i][0].companyTypeBean)
                        companyDictionary.prop(d.data[i][0].companyTypeBean.name, d.data[i])
                    }
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
                        var selectorHtml = selectorTpl.render({
                            companyTypes: companyTypeDictionary[0]
                            , companies: {}
                        })
                        p.node.html(tpl.render({
                            projectHtml: projectHtml
                            , selectorHtml: selectorHtml
                            , currentValue: ''
                        }))
                        projectPagination = new PG($('#reviewedProjectPaginationContainer'), {
                            currentPage: d2.data.pageNo, // 默认选中第?页
                            totalPage: d2.data.maxPageNum, // 一共有?页
                            firstPagesCount: 0, // 显示最前面的?页
                            preposePagesCount: 0, // 当前页的紧邻前置页为?页
                            postposePagesCount: 0, // 当前页的紧邻后置页为?页
                            lastPagesCount: 0, // 显示最后面的?页
                            render: true
                        })
                        projectPagination.on('switch', function (e) {
                            IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                                {
                                    phase: 'submited'
                                    , company: $('#reviewed_u12_input')[0].value
                                    , companyType: $('#reviewed_u11_input')[0].value
                                    , pageNo: e.toPage
                                },
                                function (_d2) {
                                    _d2 = JSONX.decode(_d2)
                                    var projectHtml = projectTpl.render({
                                        data: _d2.data
                                    })
                                    $('#listProjectContainer').html(projectHtml)
                                    projectPagination.set('currentPage', _d2.data.pageNo)
                                    projectPagination.set('totalPage', _d2.data.maxPageNum < e.toPage ? e.toPage : _d2.data.maxPageNum)
                                    projectPagination.renderUI()
                                }, "json")
                        })
                        var reloadSelector = function (e) {
                            var selectorHtml = selectorTpl.render({
                                companyTypes: companyTypeDictionary[0]
                                , companies: companyDictionary.prop(e.currentTarget.value)
                                , currentValue: e.currentTarget.value
                            })
                            $('#reviewed_u11').html(selectorHtml)
                            IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                                {
                                    phase: 'submited'
                                    , company: $('#reviewed_u12_input')[0].value
                                    , companyType: $('#reviewed_u11_input')[0].value
                                },
                                function (_d2) {
                                    _d2 = JSONX.decode(_d2)
                                    var projectHtml = projectTpl.render({
                                        data: _d2.data
                                    })
                                    $('#listProjectContainer').html(projectHtml)
                                    projectPagination.set('currentPage', _d2.data.pageNo)
                                    projectPagination.set('totalPage', _d2.data.maxPageNum < e.toPage ? e.toPage : _d2.data.maxPageNum)
                                    projectPagination.renderUI()
                                }, "json")
                            $('#reviewed_u11_input').on('change', reloadSelector)
                            $('#reviewed_u12_input').on('change', reloadProject)
                        }
                        $('#reviewed_u11_input').on('change', reloadSelector)
                        var reloadProject = function (e) {
                            IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                                {
                                    phase: 'submited'
                                    , company: $('#reviewed_u12_input')[0].value
                                    , companyType: $('#reviewed_u11_input')[0].value
                                },
                                function (_d2) {
                                    _d2 = JSONX.decode(_d2)
                                    var projectHtml = projectTpl.render({
                                        data: _d2.data
                                    })
                                    $('#listProjectContainer').html(projectHtml)
                                    projectPagination.set('currentPage', _d2.data.pageNo)
                                    projectPagination.set('totalPage', _d2.data.maxPageNum < e.toPage ? e.toPage : _d2.data.maxPageNum)
                                    projectPagination.renderUI()
                                }, "json")
                            $('#reviewed_u11_input').on('change', reloadSelector)
                            $('#reviewed_u12_input').on('change', reloadProject)
                        }
                        $('#reviewed_u12_input').on('change', reloadProject)
                    }, "json")
            }, "json")
    }
}