/**
 * Created by K550JK on 2017/1/20.
 */
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var $ = require('node').all;
var view = require('./reviewedReport-view');
var Bidi = require('gallery/bidi/1.3/');
module.exports = {
    init:function(p){
        /*var tpl = new XTemplate(view).render({
            reportData:[{pType:'网络组',pCount:'4',pData:['001-网络-安徽-巢湖本地网网络拆分技术及应用','002-网络-安徽-HLR和HSS融合的4G网络建设和应用']},
                {pType:'业务与终端组',pCount:'6',pData:['001-网络-安徽-巢湖本地网网络拆分技术及应用','002-网络-安徽-HLR和HSS融合的4G网络建设和应用','003-网络123dsdfsdfsd用']},
                {pType:'IT支撑组',pCount:'5'},
                {pType:'运维与节能减排',pCount:'2'}]
        });*/
        var tpl = new XTemplate(view).render();
        p.node.html(tpl);


        Bidi.xbind('reportList',
            {reportData:[
                {pType:'网络组',pCount:'4',pData:['001-网络-安徽-巢湖本地网网络拆分技术及应用','002-网络-安徽-HLR和HSS融合的4G网络建设和应用']},
                {pType:'业务与终端组',pCount:'6',pData:['001-网络-安徽-巢湖本地网网络拆分技术及应用','002-网络-安徽-HLR和HSS融合的4G网络建设和应用','003-网络123dsdfsdfsd用']},
                {pType:'IT支撑组',pCount:'5'},
                {pType:'运维与节能减排',pCount:'2'}]

            },{},tpl)
        Bidi.init()


    },

    hide : function (p) {
        if ($('#reportListWrap')) {
            $('#reportListWrap').remove()
        }
    }
};