const createError = require('http-errors');
const express = require('express');
<<<<<<< HEAD
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  nunjucks = require('nunjucks')
=======
//const session = require('express-session');         // Not sure if we will use this?
const nunjucks = require('nunjucks')
>>>>>>> main

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

<<<<<<< HEAD
// view engine setup
// configure
nunjucks.configure(path.resolve(__dirname,'templates'),{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
});
// app.set('view engine', 'pug');
=======
// Set app to use the nunjucks engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.set('view engine', 'html')
>>>>>>> main

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

<<<<<<< HEAD

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
=======
app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


app.get('/planner', (req, res) => {
  res.render('planner.html');
});


app.get('/choosecourse', (req, res) => {
    res.render('choosecourse.html');
});



app.get('/choosemajor', (req, res) => {
    res.render('choosemajor');
});


app.get('/majordetail', (req, res) => {
    res.render('majordetail', {major:req.query.major});

});

app.locals.selectedcourses = []
app.get('/selectedmajor', (req, res) => {
    if (app.locals.selectedcourses.indexOf(req.query.course) === -1 ){
        app.locals.selectedcourses.push(req.query.course)
    }
    res.render('selectedmajor', {courses: app.locals.selectedcourses});

});


// Listen to port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
>>>>>>> main
