KISSY.use('awarding-account-front/error.css', function (S) {
//初始化header模块
    var header = require('./header/index');
    header.init();

//初始化article模块
    var article = require('./article/error');
    article.init();
})