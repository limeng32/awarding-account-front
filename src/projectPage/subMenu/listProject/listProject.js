var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var IO = require('io')
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var PG = require('kg/pagination/2.0.0/index')
var AD = require('kg/agiledialog/1.0.2/index')
var CBD = require('core-front/callbackDialog/index')
var lpTpl = require('./listProject-view')
var editProject = require('../../editProject/editProject')
var uploadAttachment = require('../../editProject/uploadAttachment/uploadAttachment')
module.exports = {
    init: function (p) {
        var projectPagination = null
        var xtpl = new XTemplate(lpTpl)
        var refresh = function () {
            IO.post(SP.resolvedIOPath('project/listProject?_content=json'),
                {
                    phase: 'editing'
                },
                function (d) {
                    d = JSONX.decode(d)
                    refreshPage(d.data)
                }, "json")
        }
        var computeAttachmentCapacity = function (attachmentA) {
            var sum = 0
            for (var i = 0; i < attachmentA.length; i++) {
                sum += attachmentA[i].size
            }
            return uploadAttachment.formatSize(sum)
        }
        var dealSelectedProject = function (e, projectId) {
            if (e == null) {
                if (projectId == editProject.projectIdVal()) {
                    return 'listProjectFocus'
                } else {
                    return ''
                }
            } else {
                var projects = $('.listProject_u20')
                for (var i = 0; i < projects.length; i++) {
                    if ($(e.currentTarget).attr('data-id') == $(projects[i]).attr('data-id')) {
                        $(projects[i]).addClass('listProjectFocus')
                    } else {
                        $(projects[i]).removeClass('listProjectFocus')
                    }
                }
            }
        }
        var renderAction = function () {
            $('.J_listProjectOpener').on('click', function (e) {
                var id = $(e.currentTarget).attr('data-id')
                editProject.render(id)
                dealSelectedProject(e)
            })
            $('.J_listProjectSubmiter').on('click', function (e) {
                var id = $(e.currentTarget).attr('data-id')
                $('#listProject_u99_' + id).getDOMNode().click()
                new AD({
                    title: '温馨提示',
                    content: '您确定要提交此项目？提交后将不能再进行编辑操作。',
                    onConfirm: function () {
                        IO.post(SP.resolvedIOPath('submitProject/submitProject?_content=json'),
                            {
                                id: id
                            },
                            function (d) {
                                d = JSONX.decode(d)
                                new CBD(d, function () {
                                    new AD({
                                        type: 'alert',
                                        content: '项目 ' + d.data.name + ' 已经加入到已申报项目列表中'
                                    })
                                    refresh()
                                    editProject.render()
                                })
                            }, "json")
                    }
                    , onCancel: function () {
                    }
                })
            })
            $('.J_listProjectDeleter').on('click', function (e) {
                var id = $(e.currentTarget).attr('data-id')
                $('#listProject_u99_' + id).getDOMNode().click()
                new AD({
                    title: '温馨提示',
                    content: '您确定要删除此项目？删除时项目的相关附件会一并删除。',
                    onConfirm: function () {
                        IO.post(SP.resolvedIOPath('submitProject/deleteProject?_content=json'),
                            {
                                id: id
                            },
                            function (d) {
                                d = JSONX.decode(d)
                                new CBD(d, function () {
                                    new AD({
                                        type: 'alert',
                                        content: '项目 ' + d.data.name + ' 和相关附件已经被删除'
                                    })
                                    refresh()
                                    editProject.render()
                                })
                            }, "json")
                    }
                    , onCancel: function () {
                    }
                })
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
                    , computeAttachmentCapacity: computeAttachmentCapacity
                    , dealSelectedProject: dealSelectedProject
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
                , computeAttachmentCapacity: computeAttachmentCapacity
                , dealSelectedProject: dealSelectedProject
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
                var lpHtml = xtpl.render({
                    data: d.data
                    , computeAttachmentCapacity: computeAttachmentCapacity
                    , dealSelectedProject: dealSelectedProject
                })
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
            refresh()
        }
        editProject.setListProjectCallback(this.refresh)
    }
}