var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var OVL = require('overlay')
var sbTpl = require('./subMenu-view')
var listProject = require('./listProject/listProject')
var listProjectSubmited = require('./listProject/listProjectSubmited')
var editProject = require('../editProject/editProject')
module.exports = {
    init: function (p) {
        var handleNewProject = function () {
            editProject.render()
        }
        var sbHtml = new XTemplate(sbTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: sbHtml,
            visible: true,
            xy: [50, 40],
            width: '0px',
            height: '0px',
            closable: false,
            zIndex: -1,
            visible: true,
            prefixCls: 'fixed-',
            closeAction: 'hide'
        })
        ol.render()
        $('.subMenu_txt').on('click', function (e) {
            $('.subMenu_txt').replaceClass('subMenuFocus', 'subMenuUnfocus')
            $(e.currentTarget).replaceClass('subMenuUnfocus', 'subMenuFocus')
            if ('true' == $(e.currentTarget).attr('data-showNewProject')) {
                $('#subMenu_u22').show()
                listProject.init({})
                listProjectSubmited.hide()
            } else if ('false' == $(e.currentTarget).attr('data-showNewProject')) {
                $('#subMenu_u22').hide()
                listProjectSubmited.init({})
                listProject.hide()
            }
        })
        $('.J_newProject').on('click', handleNewProject)
        listProject.init({})
    }
}