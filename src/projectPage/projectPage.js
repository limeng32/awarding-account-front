KISSY.use('awarding-account-front/projectPage/projectPage.css', function (S) {
    var header = require('../homePage/header');
    header.init('home_u12');

    var article = require('./article');
    article.init();

    var SP = require('core-front/smartPath/smartPath');
    SP.resolveImgSrc('.img');
})