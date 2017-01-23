var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var inviteView = require('./expertInvite-view')
var addExpertView = require('./addExpert')
var Bidi = require('gallery/bidi/1.3/');
var OverLay = require('overlay')
var Auth = require('kg/auth/2.0.6/')
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/')
require('kg/auth/2.0.6/plugin/msgs/style.css')
require('./expertInvite.css')




var addTpl= new XTemplate(addExpertView).render()

var overlay = new OverLay({
    effect: 'slide',    // {String} - 可选, 默认为'none', 'none'(无特效), 'fade'(渐隐显示), 'slide'(滑动显示).
    easing: 'linear',        // {String} - 可选, 同 KISSY.Anim 的 easing 参数配置.
    duration: 10,        // {Number} - 可选, 动画持续时间, 以秒为单位.
    target: '.expertInviteWrap',
    content: addTpl,
    visible: true,
    closeAction: 'hide',
    mask:true,
    elCls:{"class":"absCenter"},
})

module.exports = {
    init: function (p) {
        var EXPERT_INVITE={
            data:[{expertName:'范济安',expertPart:'北京分公司',isInvite:"0"},{expertName:'陈淑平',expertPart:'天津分公司',isInvite:"0"},{expertName:'哈特我',expertPart:'北京分公司',isInvite:"0"}],
            InvitedData:[{expertName:'范济安',expertPart:'北京分公司',isEmail:'1',isConfirm:'0'},{expertName:'陈淑平',expertPart:'天津分公司',isEmail:'0',isConfirm:'1'}],
            openWindow:"1",
            handle:{
                inviteExpert:function(e,data){
                    console.log(e)
                    console.log(data)
                    if(data.isInvite=='0'){
                        this.set('isInvite', '1', data)
                        e.target.innerText='已邀请'
                    }
                    data.isEmail='0'
                    data.isConfirm='0'
                    this.add(data,'InvitedData')
                },
                addExpert:function(data){
                    var expertName=$('#expertName').val(),
                        expertEmail=$('#expertEmail').val(),
                        expertPart=$('#expertPart').val()
                    this.add({ expertName: expertName, expertPart: expertPart, expertEmail:expertEmail,isEmail:'0',isConfirm:'0'}, 'data')
                    $('#expertName').val(''),expertEmail=$('#expertEmail').val(''),expertPart=$('#expertPart').val('')
                    this.set('openWindow', '1', data)

                },
                sendEmail:function(e,data){
                    if(data.isEmail=='0'){
                        this.set('isEmail', '1', data)
                        e.target.innerText='再发送'
                    }
                },
                confirmExpert:function(e,data){
                    if(data.isConfirm=='0'){
                        this.set('isConfirm', '1', data)
                        e.target.innerText='已确认'
                    }
                },
                InvitedDel: function (data) {
                    this.remove(data)
                },
                overlayShow:function(data){
                    /*overlay.show()
                    overlay.on('afterRenderUI',function(){
                        var auth = new Auth('#J_Auth');
                        auth.plug(new AuthMsgs());
                        auth.render();


                        $('#closeOverlay').on('click',function(){
                            overlay.hide()
                        })
                        $('#subExpertForm').on('click',function(){
                            var expertName=$('#expertName').val(),
                                expertEmail=$('#expertEmail').val(),
                                expertPart=$('#expertPart').val()
                            this.addExpert(expertName)
                        })

                    })
                    $('#closeOverlay').on('click',function(){
                        overlay.hide()
                    })
                    $('#subExpertForm').on('click',function(){
                        this.attributes.handle.addExpert()
                    }.bind(this))*/
                    this.set('openWindow', '0', data)
                },
                overlayHide:function(data){
                    this.set('openWindow', '1', data)
                },
            }
        }



        var invite = new XTemplate(inviteView).render()
        p.node.html(invite)
        Bidi.active(['action', 'class', 'attr', 'text', 'click', 'value'])
        Bidi.xbind('expertInviteList',EXPERT_INVITE,EXPERT_INVITE.handle,invite)
        Bidi.init()
        var auth = new Auth('#J_Auth');
        auth.plug(new AuthMsgs());
        auth.render();

    }
}