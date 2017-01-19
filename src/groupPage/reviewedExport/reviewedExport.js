/**
 * Created by K550JK on 2017/1/19.
 */
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var $ = require('node').all;
var view = require('./reviewedExport-view');

module.exports = {
    init:function(p){
        var tpl = new XTemplate(view).render({});

        this.hide = function () {
            if ($('#reExport')) {
                $('#reExport').remove()
            }
        };
        this.show = function (){
            if ($('#reExport')) {
                p.node.html(tpl)
            }
        }
    }
};