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
var detector = require('../detector/detector')
module.exports = {
    init: function (p) {

        var tpl = new XTemplate(view), projectTpl = new XTemplate(projectView), selectorTpl = new XTemplate(selectorView)
        IO.post(SP.resolvedIOPath('group/listCompanyType?_content=json'),
            {},
            function (d) {
                d = JSONX.decode(d)
                var companyDictionary = $({}), companyTypeDictionary = $({}), projectPagination = null
                var initMouseout = function (o) {
                    o.one('.reviewed_u21_txt').show()
                    o.all('.reviewed_button').hide()
                }
                var initMouseover = function (o) {
                    o.one('.reviewed_u21_txt').hide()
                    o.all('.reviewed_button').show()
                }
                var dealMouseover = function (e) {
                    initMouseover($(e.currentTarget))
                }
                var dealMouseout = function (e) {
                    initMouseout($(e.currentTarget))
                }
                var initListProjectButton = function () {
                    $('.reviewed_u20').on('mouseover', function (e) {
                        initMouseover($(e.currentTarget))
                    }).on('mouseout', function (e) {
                        initMouseout($(e.currentTarget))
                    })
                    $('.J_listProjectViewer').on('click', function (e) {
                        var id = $(e.currentTarget).attr('data-id')
                        window.open(SP.resolvedPath('viewProject/' + id))
                    })
                    $('.reviewed_u107_select').on('change',function(e){
                        IO.post(SP.resolvedIOPath('group/assignDetector?_content=json'), {
                                projectId: $(e.currentTarget).attr('data-id')
                                , detectorId: 'scryy'
                            },
                            function (d) {
                                if (d.flag) {
                                    detector.refresh()
                                    refresh($('#reviewed_u11_input'), $('#reviewed_u12_input'))
                                }
                            }, "json")
                    }).on('focus', function (e) {
                        $('.reviewed_u20_' + $(e.currentTarget).attr('data-id')).detach('mouseover')
                        $('.reviewed_u20_' + $(e.currentTarget).attr('data-id')).detach('mouseout')
                    }).on('blur', function (e) {
                        $('.reviewed_u20_' + $(e.currentTarget).attr('data-id')).on('mouseover', function (e) {
                            dealMouseover(e)
                        }).on('mouseout', function (e) {
                            dealMouseout(e)
                        })
                        initMouseout($('.reviewed_u20_' + $(e.currentTarget).attr('data-id')))
                    })
                }
                var renderProjectPagination = function (data, e) {
                    projectPagination.set('currentPage', data.pageNo)
                    projectPagination.set('totalPage', data.maxPageNum < e.toPage ? e.toPage : data.maxPageNum)
                    projectPagination.renderUI()
                    initListProjectButton()
                }
                for (var i = 0; i < d.data.length; i++) {
                    if (d.data[i].length > 0) {
                        companyTypeDictionary.prop(d.data[i][0].companyTypeBean.name, d.data[i][0].companyTypeBean)
                        companyDictionary.prop(d.data[i][0].companyTypeBean.name, d.data[i])
                    }
                }
                var refresh = function (companyType, companies, pageNo) {
                    IO.post(SP.resolvedIOPath('group/listProject?_content=json'),
                        {
                            phase: 'submited'
                            , companyType: companyType[0] == null ? '' : companyType[0].value
                            , company: companies[0] == null ? '' : companies[0].value
                        },
                        function (d2) {
                            d2 = JSONX.decode(d2)
                            var projectHtml = projectTpl.render({
                                data: d2.data
                            })
                            var selectorHtml = selectorTpl.render({
                                companyTypes: companyTypeDictionary[0]
                                , companies: {}
                                , currentValue: companyType[0] == null ? null : companyType[0].value
                            })
                            p.node.html(tpl.render({
                                projectHtml: projectHtml
                                , selectorHtml: selectorHtml
                                , currentValue: ''
                            }))
                            $('#listProjectCount').html(d2.data.totalCount)
                            projectPagination = new PG($('#reviewedProjectPaginationContainer'), {
                                currentPage: d2.data.pageNo, // 默认选中第?页
                                totalPage: d2.data.maxPageNum, // 一共有?页
                                firstPagesCount: 0, // 显示最前面的?页
                                preposePagesCount: 0, // 当前页的紧邻前置页为?页
                                postposePagesCount: 0, // 当前页的紧邻后置页为?页
                                lastPagesCount: 0, // 显示最后面的?页
                                render: true
                            })
                            initListProjectButton()
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
                                        renderProjectPagination(_d2.data, e)
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
                                        $('#listProjectCount').html(_d2.data.totalCount)
                                        renderProjectPagination(_d2.data, e)
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
                                        $('#listProjectCount').html(_d2.data.totalCount)
                                        renderProjectPagination(_d2.data, e)
                                    }, "json")
                                $('#reviewed_u11_input').on('change', reloadSelector)
                                $('#reviewed_u12_input').on('change', reloadProject)
                            }
                            $('#reviewed_u12_input').on('change', reloadProject)
                        }, "json")
                }
                refresh($('#reviewed_u11_input'), $('#reviewed_u12_input'))
            }, "json")
    },

    hide:function(){
        if ($('#reviewed')) {
            $('#reviewed').remove()
        }
    }
}