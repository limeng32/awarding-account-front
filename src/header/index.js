var $ = require('node').all;
var tpl = require('./index-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
        });
        $('header').html(html);
    }
}