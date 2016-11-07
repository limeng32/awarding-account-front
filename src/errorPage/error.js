KISSY.use('awarding-account-front/errorPage/error.css', function (S) {
//初始化header模块
    var header = require('./header');
    header.init();

//初始化article模块
    var article = require('./article');
    article.init();
})