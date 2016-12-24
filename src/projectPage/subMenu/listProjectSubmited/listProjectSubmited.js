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
var lpTpl = require('./../listProjectSubmited/listProjectSubmited-view')
var editProject = require('../../editProject/editProject')
var uploadAttachment = require('../../editProject/uploadAttachment/uploadAttachment')
module.exports = {
    init: function (p) {
        var projectPagination = null
        var xtpl = new XTemplate(lpTpl)
        var offsetLeft = p.criterionLeft + $('#listProjectAndPaginationContainer').offset().left
        var refresh = function () {
            IO.post(SP.resolvedIOPath('project/listProject?_content=json'),
                {
                    phase: 'submited'
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
            $('.J_listProjectViewer').on('click', function (e) {
                var id = $(e.currentTarget).attr('data-id')
                window.open(SP.resolvedPath('viewProject/' + id))
            })
            $('.J_listProjectReediter').on('click', function (e) {
                var id = $(e.currentTarget).attr('data-id')
                $('#listProject_u99_' + id).getDOMNode().click()
                new AD({
                    title: '温馨提示',
                    content: '您确定要重新编辑此退回项目？',
                    onConfirm: function () {
                        IO.post(SP.resolvedIOPath('submitProject/reeditProject?_content=json'),
                            {
                                id: id
                            },
                            function (d) {
                                d = JSONX.decode(d)
                                new CBD(d, function () {
                                    new AD({
                                        type: 'alert',
                                        content: '项目 ' + d.data.name + ' 已经加入到 本届编辑项目列表 中'
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
            projectPagination = new PG($('#projectPaginationSubmitedContainer'), {
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
                $('#listProjectSubmitedContainer').html(html)
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
                    , phase: 'submited'
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
            $('#listProjectSubmitedContainer').html(html)
            initListProjectButton()
            renderAction()
        }
        this.refresh = function () {
            refresh()
        }
        this.hide = function () {
            if ($('#listProjectSubmitedContainer')) {
                $('#listProjectSubmitedContainer').remove()
            }
            if ($('#projectPaginationSubmitedContainer')) {
                $('#projectPaginationSubmitedContainer').remove()
            }
        }
        this.show = function () {
            IO.post(SP.resolvedIOPath('project/listProject?_content=json'),
                {
                    phase: 'submited'
                },
                function (d) {
                    d = JSONX.decode(d)
                    var lpHtml = xtpl.render({
                        data: d.data
                        , computeAttachmentCapacity: computeAttachmentCapacity
                        , dealSelectedProject: dealSelectedProject
                    })
                    p.node.html(lpHtml)
                    $('#listProjectAndPaginationContainer').offset({
                        left: offsetLeft
                    })
                    renderPage(d.data)
                }, "json")
        }
    }
}