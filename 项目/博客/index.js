// Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架
//引入expeess模块
var express = require('express');
//引入解析post请求附加的数据模块bodyParser
var bodyParser = require('body-parser');
// 服务器运行就链接数据库
var db = require('./lib/mongoose').db;
//引入session模块，session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。
var session = require("express-session");
// 该模块用于将session存入mongo中
var MongoStore = require('connect-mongo')(session);
// connect-flash是nodejs中的一个模块，flash是一个暂存器，而且暂存器里面的值使用过一次便被清空，适合用来做网站的提示信息。
// https://www.jianshu.com/p/29607cb427d4
var flash = require("connect-flash");
//启用express模块
var app = express()

// 使用静态托管
app.use(express.static('public'));

// 使用模板引擎
app.set('views', './views/');
app.set('view engine', 'ejs');

// 使用body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。
// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// 使用 session
// https://www.jianshu.com/p/5a0ccd1ee27e
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
        store: new MongoStore({
            mongooseConnection: db
        })  
    })
);

// 使用 flash
app.use(flash());

// set flash 每一次响应请求 带的参数
app.use((req, res, next) => {
    res.locals.user = req.session.user
    res.locals.success = req.flash("success").toString();
    res.locals.error = req.flash("error").toString();
    next();
});

// 路由
app.use('/', require('./routes/indexRouter'));
app.use('/login', require('./routes/loginRouter'));
app.use('/logout', require('./routes/logoutRouter'));
app.use('/register', require('./routes/registerRouter'));
app.use('/posts', require('./routes/postsRouter'));
app.use('/comments', require('./routes/commentsRouter'));


app.listen(8080, () => {
    console.log('App listening on port 8080!');
});