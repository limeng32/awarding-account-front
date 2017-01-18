var $ = require('node').all;
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
var SP = require('core-front/smartPath/smartPath');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
var OVL = require('overlay');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var RAN = require('core-front/random/index');
var SP = require('core-front/smartPath/smartPath');
var AD = require('kg/agiledialog/5.0.2/index');
var CB = require('combobox');
var sbTpl = require('./searchBar-view');
module.exports = {
    init: function () {
        var sbHtml = new XTemplate(sbTpl).render({})
        var ol = new OVL({
            effect: 'slide',
            easing: 'linear',
            duration: 10,
            target: '',
            content: sbHtml,
            visible: true,
            xy: [$('#headerContainer').offset().left + 220, 18],
            width: '296px',
            height: '21px',
            zIndex: 4,
            visible: true,
            prefixCls: 'fixed-',
            closeAction: 'hide'
        })
        ol.render()
        $(window).on('resize', function () {
            ol.set('xy', [$('#headerContainer').offset().left + 220, 18])
        })
        var combo = new CB({
            dataSource: new CB.LocalDataSource({
                data: ['asd']
            })
            , maxItemCount: 10
            , matchElWidth: true
            , format: function (query, data) {
                var ret = [];
                for (var i = 0; i < 10; i++) {
                    ret[i] = {
                        content: 'asd'
                    }
                }
                return ret;
            }
            , srcNode: '.ks-combobox'
        })
        combo.render();
    }
}