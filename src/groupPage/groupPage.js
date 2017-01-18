KISSY.use('awarding-account-front/groupPage/groupPage.css', function (S) {
    var header = require('../homePage/header');
    header.init('home_u22');

    var article = require('./article');
    article.init();

    var SP = require('core-front/smartPath/smartPath');
    SP.resolveImgSrc('.img');
})