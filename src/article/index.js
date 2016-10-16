var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
            title:'this is article1',
            content:'render by kg/xtemplate'
        });
        $('article').html(html);
    }
}