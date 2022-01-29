const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  nunjucks = require('nunjucks')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
// configure
nunjucks.configure(path.resolve(__dirname,'templates'),{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
});
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 导入 mongoose 模块
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
// 将连接与错误事件绑定（以获得连接错误的提示）
mongoose.connection.on('error', console.error.bind(console, 'MongoDB 连接错误：'));


module.exports = app;
