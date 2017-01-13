var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var Node = require('node')
var Slide = require('kg/slide/2.0.2/')
var Cutter = require('kg/cutter/2.0.0/')
var SP = require('core-front/smartPath/smartPath')
var IO = require('io')
var JSONX = require('core-front/jsonx/jsonx')
var OVL = require('overlay')
var Auth = require('kg/auth/2.0.6/')
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/')
var RAN = require('core-front/random/index')
var SP = require('core-front/smartPath/smartPath')
var AD = require('kg/agiledialog/5.0.2/index')
var AI = require('core-front/authIdentify/index')
var containerView = require('./container-view')
//var editProject = require('../projectPage/editProject/editProject')
var sideBar = require('../groupPage/sideBar/sideBar')
//var subMenu = require('../projectPage/subMenu/subMenu')
//var stepBar = require('../viewProjectPage/stepBar/stepBar')
module.exports = {
    init: function () {
        var offset = $('#headerContainer').offset()
        var ai = new AI(token);
        if (ai.existChecked()) {
            var containerTpl = new XTemplate(containerView)
            var containerHtml = containerTpl.render({})
            $('article').html(containerHtml)
            sideBar.init({
                node: $('.sideBarContainer')
            })
            //stepBar.init({
            //    node: $('.stepBarContainer')
            //})
            //editProject.init({
            //    node: $('.editProjectContainer')
            //    , account: null
            //})
            //subMenu.init({
            //    node: $('.subMenuContainer')
            //})
        }
    }
}