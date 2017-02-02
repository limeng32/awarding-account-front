var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var sbTpl = require('./subMenu-view');
var inviteView = require('../expertInvite/expertInvite')
var manageView = require('../expertManage/expertManage')
var avoidView = require('../expertAvoid/expertAvoid')
var MasterView = require('../expertMaster/expertMaster')
//var listProject = require('./listProject/listProject')
//var listProjectSubmited = require('./listProjectSubmited/listProjectSubmited')
//var listProjectReturned = require('./listProjectReturned/listProjectReturned')
//var editProject = require('../editProject/editProject')
module.exports = {
    init: function (p) {
        //var handleNewProject = function () {
        //    editProject.render(null, true)
        //}

        var sbHtml = new XTemplate(sbTpl).render({})
        p.node.html(sbHtml)
        $('#subMenu_u').offset({
            left: $('#headerContainer').offset().left + 15
        })
        $(window).on('resize', function () {
            $('#subMenu_u').offset({
                left: $('#headerContainer').offset().left + 15
            })
        })
        $('.subMenu_txt').on('click', function (e) {
            $('.subMenu_txt').replaceClass('subMenuFocus', 'subMenuUnfocus')
            $(e.currentTarget).replaceClass('subMenuUnfocus', 'subMenuFocus')
            var view = $(e.currentTarget).attr('data-show')
            if ('invite' == view) {
                manageView.hide()
                avoidView.hide()
                MasterView.hide()
                //渲染待分配列表到$('.reviewedContainer')
                inviteView.init({
                    node: $('.reviewedContainer')
                    , account: null
                })

            } else if ('manage' == view) {
                inviteView.hide()
                avoidView.hide()
                MasterView.hide()
                manageView.init({
                    node: $('.reviewedContainer')
                });

            }else if('avoid' == view){
                manageView.hide()
                inviteView.hide()
                MasterView.hide()
                avoidView.init({
                    node: $('.reviewedContainer')

                })
            }else if('master' == view){
                manageView.hide()
                inviteView.hide()
                avoidView.hide()
                MasterView.init({
                    node: $('.reviewedContainer')

                })
            }
        })


        inviteView.init({
         node: $('.reviewedContainer')
         , account: null
         });



        //reviewedExport.show();
        //$('.J_newProject').on('click', handleNewProject)
        //listProject.init({
        //    node: $('#listProjectAndPaginationContainer')
        //})
        //listProject.show()
        //listProjectSubmited.init({
        //    node: $('#listProjectAndPaginationContainer')
        //})
        //listProjectReturned.init({
        //    node: $('#listProjectAndPaginationContainer')
        //})
    }
}