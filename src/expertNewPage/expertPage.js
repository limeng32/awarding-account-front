KISSY.add('awarding-account-front/groupPage/groupPage.css', ["awarding-account-front/homePage/header", "awarding-account-front/expertPage/article", "core-front/smartPath/smartPath"], function (S, require, exports, module) {
    KISSY.use('awarding-account-front/groupPage/groupPage.css', function (S) {
        var header = require('awarding-account-front/homePage/header');
        header.init('home_u18');

        var article = require('awarding-account-front/expertNewPage/article');
        article.init();

        var SP = require('core-front/smartPath/smartPath');
        SP.resolveImgSrc('.img');
    })
});
