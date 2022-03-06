const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  nunjucks = require('nunjucks')
var flash = require('connect-flash');
const session = require('express-session');         // Not sure if we will use this?
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/userRouter');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const app = express();

// view engine setup
app.set('view engine', 'html');
// configure
nunjucks.configure(path.resolve(__dirname,'templates'),{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
});

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// 导入 mongoose 模块
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://localhost:27017/my_database';
mongoose.connect(mongoDB);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
// 将连接与错误事件绑定（以获得连接错误的提示）
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// flash messages
app.use(session({
  name : 'codeil',
  secret : 'something',
  resave :false,
  saveUninitialized: true,
  cookie : {
    maxAge:(86400)
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

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
  res.render('error.html', {err:err});
});





app.locals.selectedcourses = []




module.exports = app;
