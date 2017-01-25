/**
 * Created by K550JK on 2017/1/19.
 */
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var $ = require('node').all;
var view = require('./reviewedExport-view');

module.exports = {
    init:function(p){
        var tpl = new XTemplate(view).render({
            exportData:[{exportName:'报奖项目信息汇总表',exportUrl:'1111111'},{exportName:'各公司接口人汇总表',exportUrl:'2222222'}]
        });
        p.node.html(tpl)
        p.node.all('.exportButton').on('click',function(e){
            //alert(e.target.attr.resUrl)
        })

    },
    hide : function (p) {
        if ($('#reExport')) {
            $('#reExport').remove()
        }
    }
};