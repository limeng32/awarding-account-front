var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var IO = require('io')
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var PG = require('kg/pagination/2.0.0/index')
var lpTpl = require('./listProject-view')
var editProject = require('../../editProject/editProject')
module.exports = {
    init: function (p) {
        var projectPagination = null
        var xtpl = new XTemplate(lpTpl)
        var renderAction = function () {
            $('.J_listProjectRepeater').on('click', function (e) {
                var id = $(e.currentTarget).attr('data')
                editProject.render(id)
            })
        }
        var initListProjectButton = function () {
            $('.listProject_u20').on('mouseover', function (e) {
                $(e.currentTarget).one('.listProject_u21_txt').hide()
                $(e.currentTarget).all('.listProject_button').show()
            }).on('mouseout', function (e) {
                $(e.currentTarget).one('.listProject_u21_txt').show()
                $(e.currentTarget).all('.listProject_button').hide()
            })
        }
        var renderPage = function (p) {
            initListProjectButton()
            projectPagination = new PG($('#projectPaginationContainer'), {
                currentPage: p.pageNo, // 默认选中第?页
                totalPage: p.maxPageNum, // 一共有?页
                firstPagesCount: 0, // 显示最前面的?页
                preposePagesCount: 0, // 当前页的紧邻前置页为?页
                postposePagesCount: 0, // 当前页的紧邻后置页为?页
                lastPagesCount: 0, // 显示最后面的?页
                render: true
            })
            var renderProject = function (p) {
                var html = xtpl.render({
                    data: p
                })
                $('#listProjectContainer').html(html)
                renderAction()
            }
            var reRenderPage2 = function (p) {
                if (p.maxPageNum < p.pageNo) {
                    projectPagination.set('currentPage', p.pageNo)
                    projectPagination.set('totalPage', p.pageNo)
                    projectPagination.renderUI()
                }
            }
            projectPagination.on('switch', function (e) {
                IO.post(SP.resolvedIOPath('project/listProject?_content=json'), {
                    pageNo: e.toPage
                    , phase: 'editing'
                }, function (d) {
                    d = JSONX.decode(d);
                    renderProject(d.data)
                    reRenderPage2(d.data);
                    initListProjectButton()
                }, "json");
            })
            renderAction()
        }
        var refreshPage = function (p) {
            projectPagination.set('currentPage', p.pageNo)
            projectPagination.set('totalPage', p.maxPageNum < p.pageNo ? p.pageNo : p.maxPageNum)
            projectPagination.renderUI()
            var html = xtpl.render({
                data: p
            })
            $('#listProjectContainer').html(html)
            initListProjectButton()
            renderAction()
        }
        IO.post(SP.resolvedIOPath('project/listProject?_content=json'),
            {
                phase: 'editing'
            },
            function (d) {
                d = JSONX.decode(d)
                var lpHtml = new XTemplate(lpTpl).render({data: d.data})
                var ol = new OVL({
                    effect: 'slide',
                    easing: 'linear',
                    duration: 10,
                    target: '',
                    content: lpHtml,
                    xy: [880, 155],
                    width: '0px',
                    height: '0px',
                    closable: false,
                    zIndex: -1,
                    visible: true,
                    prefixCls: 'fixed-',
                    closeAction: 'hide'
                })
                ol.render()
                renderPage(d.data)
            }, "json")
        this.refresh = function () {
            IO.post(SP.resolvedIOPath('project/listProject?_content=json'),
                {
                    phase: 'editing'
                },
                function (d) {
                    d = JSONX.decode(d)
                    refreshPage(d.data)
                }, "json")
        }
        editProject.setListProjectCallback(this.refresh)
    }
}