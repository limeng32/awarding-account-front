var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var sbTpl = require('./subMenu-view')
var listProject = require('./listProject/listProject')
var listProjectSubmited = require('./listProjectSubmited/listProjectSubmited')
var listProjectReturned = require('./listProjectReturned/listProjectReturned')
var editProject = require('../editProject/editProject')
module.exports = {
    init: function (p) {
        var handleNewProject = function () {
            editProject.render(null, true)
        }
        var sbHtml = new XTemplate(sbTpl).render({})
        p.node.html(sbHtml)
        $('#subMenu_u106').offset({
            left: p.criterionLeft + $('#subMenu_u106').offset().left
        })
        $('#subMenu_u108').offset({
            left: p.criterionLeft + $('#subMenu_u108').offset().left
        })
        $('#subMenu_u17').offset({
            left: p.criterionLeft + $('#subMenu_u17').offset().left
        })
        $('#subMenu_u22').offset({
            left: p.criterionLeft + $('#subMenu_u22').offset().left
        })
        $('.subMenu_txt').on('click', function (e) {
            $('.subMenu_txt').replaceClass('subMenuFocus', 'subMenuUnfocus')
            $(e.currentTarget).replaceClass('subMenuUnfocus', 'subMenuFocus')
            var view = $(e.currentTarget).attr('data-show')
            if ('editing' == view) {
                listProject.show({})
                listProjectSubmited.hide()
                listProjectReturned.hide()
            } else if ('submited' == view) {
                listProjectReturned.hide({})
                listProject.hide()
                listProjectSubmited.show()
            } else if ('returned' == view) {
                listProjectReturned.show({})
                listProject.hide()
                listProjectSubmited.hide()
            }
        })
        $('.J_newProject').on('click', handleNewProject)
        listProject.init({})
        listProject.show()
        listProjectSubmited.init({})
        listProjectReturned.init({})
    }
}