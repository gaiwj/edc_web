const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config');
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(logger('common', {stream: accessLogStream}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
//数据类型处理接口
app.use('/User/Login',function (req, res, next) {
    config.request({
        req:req,
        callback:function (result) {
            var uc = {};
            if(result.Body) {
                uc.SessionKey = result.Body["SessionKey"];
            }
            res.cookie('usercache',JSON.stringify(uc) , {
                path:'/', maxAge:3600*1000
            });
            res.json(result);
        }
    })
})


// 该路由使用的中间件，所有异步接口入口
app.post("*",function(req, res, next) {
   console.log(req.originalUrl);
    //res.setHeader("Access-Control-Allow-Origin","*");
    config.callback(req, res, next);
});

app.get('/',function (req, res, next) {
    res.redirect("/login.html");

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    //var html = template('index', data);
    res.send("404页面没找到路径");
});

module.exports = app;

