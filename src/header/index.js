var $ = require('node').all;
var tpl = require('./index-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var AD = require('kg/agiledialog/1.0.2/index');
var UA = require('ua');
module.exports = {
    init:function(){
        var html = new XTemplate(tpl).render({
        });
        $('header').html(html);
        KISSY.use('kg/auth/2.0.6/plugin/msgs/style.css', function (S) {
            var formAuth = new Auth('#formAuth');
            formAuth.plug(new AuthMsgs());
            formAuth.register('iRequired', function (value, attr, defer, field) {
                var self = this;
                if (value != '') {
                    defer.resolve(self);
                } else {
                    new AD({
                        type: 'alert',
                        content: attr + '不可以为空'
                    });
                    defer.reject(self);
                }
                return defer.promise;
            });
            formAuth.render();
        })
    }
}