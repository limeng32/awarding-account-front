var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var IO = require('io')
var SP = require('core-front/smartPath/smartPath')
var JSONX = require('core-front/jsonx/jsonx')
var PG = require('kg/pagination/2.0.0/index')
var lpTpl = require('./listProject-view')
module.exports = {
    init: function (p) {
        var projectPagination = null
        var renderPage = function (p) {
            projectPagination = new PG($('#projectPaginationContainer'), {
                currentPage: p.pageNo, // 默认选中第?页
                totalPage: p.maxPageNum, // 一共有?页
                firstPagesCount: 0, // 显示最前面的?页
                preposePagesCount: 0, // 当前页的紧邻前置页为?页
                postposePagesCount: 0, // 当前页的紧邻后置页为?页
                lastPagesCount: 0, // 显示最后面的?页
                render: true
            });
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
                    visible: true,
                    xy: [880, 135],
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
    }
}