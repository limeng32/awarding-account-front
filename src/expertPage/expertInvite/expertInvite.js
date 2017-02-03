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
            data:[{expertName:'范济安',expertPart:'北京分公司',isInvite:"1",isEmail:'0',isConfirm:'0',expertEmail:'xxx@gg.com',expertID:'1'},
                {expertName:'陈淑平',expertPart:'天津分公司',isInvite:"1",isEmail:'0',isConfirm:'0',expertEmail:'hjj@gg.com',expertID:'2'},
                {expertName:'哈特我',expertPart:'北京分公司',isInvite:"0",isEmail:'0',isConfirm:'0',expertEmail:'erty@gg.com',expertID:'3'}],
            openWindow:"1",
            isEdit:'0',
            handle:{
                inviteExpert:function(e,data){

                    if(data.isInvite=='0'){
                        //发ajax请求回掉函数里执行this.set
                        this.set('isInvite', '1', data)

                    }

                },
                addExpert:function(data){
                    var expertName=$("input[name='expertName']").val(),
                        expertEmail=$("input[name='expertEmail']").val(),
                        expertPart=$("input[name='expertPart']").val()

                    //发ajax请求回掉函数里执行this.add
                    this.add({ expertName: expertName, expertPart: expertPart, expertEmail:expertEmail,isEmail:'0',isConfirm:'0',isInvite:'0',expertID:'5'}, 'data')
                    //清空标签   关闭窗口
                    $('#expertName').val(''),expertEmail=$('#expertEmail').val(''),expertPart=$('#expertPart').val('')
                    this.set('openWindow', '1', data)
                    this.set('isEdit', '0')
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
                    //发ajax请求回掉函数里执行this.set

                    this.set('isInvite', '0', data)
                },
                expertDel:function(data){
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
                    this.set('isEdit', '1', data)
                },    //打开弹窗
                overlayHide:function(data){
                    $("input[name='expertName']").val('')
                    $("input[name='expertEmail']").val('')
                    $("input[name='expertPart']").val('')
                    $("#J_Auth").removeAttr('name')
                    this.set('openWindow', '1')
                    this.set('isEdit', '0')
                },    //关闭弹窗
                infoEditShow:function(e,data){
                    this.set('openWindow', '0')
                    $("input[name='expertName']").val(data.expertName)
                    $("input[name='expertEmail']").val(data.expertEmail)
                    $("input[name='expertPart']").val(data.expertPart)
                    $("#J_Auth").attr('name',data.expertID)
                },
                infoEdit:function(e,data){
                    var tName=e.target.name
                    if(e.target.innerText=='修改'){
                        $("input[name='"+tName+"']").removeAttr('readonly')
                        e.target.innerText='确定'
                    }else{
                        $("input[name='"+tName+"']").attr('readonly','readonly')
                        e.target.innerText='修改'
                        var eData=this.get('data'),eID=$("#J_Auth").attr('name')
                        //回掉里执行for循环
                        for(var i = 0; i<eData.length;i++){
                            if(eID==eData[i].expertID){
                                this.set(tName,$("input[name='"+tName+"']").val(),eData[i])
                            }
                        }

                    }


                }
            }
        }



        var invite = new XTemplate(inviteView).render()
        p.node.html(invite)
        Bidi.active(['action', 'class', 'attr', 'text', 'click', 'value'])
        function inviteText(isInvite){
            return parseInt(isInvite) ? "已邀请"  : "邀请";
        }
        //注册个助手方法
        Bidi.pipe('inviteText', inviteText);
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