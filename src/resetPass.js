KISSY.use('awarding-account-front/resetPass.css', function (S) {
//初始化header模块
    var header = require('./header/resetPassword');
    header.init();

//初始化article模块
    var article = require('./article/resetPassword');
    article.init();
})