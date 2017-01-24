var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var inviteView = require('./expertInvite-view')

var Bidi = require('gallery/bidi/1.3/');

var Auth = require('kg/auth/2.0.6/')
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/')
require('kg/auth/2.0.6/plugin/msgs/style.css')
require('./expertInvite.css')



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
                        //发ajax请求回掉函数里执行this.set  到 this.add（添加到右侧列表）
                        this.set('isInvite', '1', data)
                        e.target.innerText='已邀请'
                        data.isEmail='0'
                        data.isConfirm='0'
                        this.add(data,'InvitedData')
                    }

                },
                addExpert:function(data){
                    var expertName=$('#expertName').val(),
                        expertEmail=$('#expertEmail').val(),
                        expertPart=$('#expertPart').val()


                    //发ajax请求回掉函数里执行this.add
                    this.add({ expertName: expertName, expertPart: expertPart, expertEmail:expertEmail,isEmail:'0',isConfirm:'0'}, 'data')
                    //清空标签   关闭窗口
                    $('#expertName').val(''),expertEmail=$('#expertEmail').val(''),expertPart=$('#expertPart').val('')
                    this.set('openWindow', '1', data)

                },
                sendEmail:function(e,data){
                    if(data.isEmail=='0'){
                        //发ajax请求回掉函数里执行this.set   和 e.target.innerText='再发送'
                        this.set('isEmail', '1', data)
                        e.target.innerText='再发送'
                    }
                },
                confirmExpert:function(e,data){
                    if(data.isConfirm=='0'){
                        //发ajax请求回掉函数里执行this.set   和 e.target.innerText='已确认'
                        this.set('isConfirm', '1', data)
                        e.target.innerText='已确认'
                    }
                },
                InvitedDel: function (data) {
                    //发ajax请求回掉函数里执行this.remove
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
                },    //打开弹窗
                overlayHide:function(data){
                    this.set('openWindow', '1', data)
                }    //关闭弹窗
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

    },
    hide : function (p) {
        if ($('#expertInviteWrap')) {
            $('#expertInviteWrap').remove()
        }
    }
}