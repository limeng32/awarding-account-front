var $ = require('node').all
var XTemplate = require("kg/xtemplate/3.3.3/runtime")
var manageView = require('./expertManage-view')

var Bidi = require('gallery/bidi/1.3/');

var Auth = require('kg/auth/2.0.6/')
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/')
require('kg/auth/2.0.6/plugin/msgs/style.css')
require('./expertManage.css')

module.exports = {
    init: function (p) {
        var EXPERT_INVITE={
            data:[
                {expertName:'范济安',expertPart:'北京分公司',isConfirm:"0",group:'网络组'},
                {expertName:'陈淑平',expertPart:'天津分公司',isConfirm:"1",group:'IT支撑组'},
                {expertName:'哈特我',expertPart:'北京分公司',isConfirm:"0",group:'0'}],
            groups:[
                {name:'网络组',expertData:[{expertName:'范济安',expertPart:'北京分公司',isConfirm:"0"}]},
                {name:'业务终端组',expertData:[{expertName:'陈淑平',expertPart:'天津分公司',isConfirm:"1",group:'IT支撑组'}]},
                {name:'IT支撑组',expertData:[]}
            ],
            InvitedData:[{expertName:'范济安',expertPart:'北京分公司',isEmail:'1',isConfirm:'0'},{expertName:'陈淑平',expertPart:'天津分公司',isEmail:'0',isConfirm:'1'}],
            openWindow:"1",
            handle:{

                doGroup:function(e,data) {
                    var gName = e.target.value
                    this.set('group', gName, data)
                    var groups = this.get('groups');
                    for(item in groups){
                        if (item.name==gName){
                            this.add(data,item)
                        }
                    }
                }
            }
        }



        var manage = new XTemplate(manageView).render()
        p.node.html(manage)
        Bidi.active(['action', 'class', 'attr', 'text', 'click', 'value','change'])
        Bidi.xbind('expertManageList',EXPERT_INVITE,EXPERT_INVITE.handle,manage)
        Bidi.init()
        var auth = new Auth('#J_Auth');
        auth.plug(new AuthMsgs());


    },
    hide : function (p) {
        if ($('#expertManageWrap')) {
            $('#expertManageWrap').remove()
        }
    }
}