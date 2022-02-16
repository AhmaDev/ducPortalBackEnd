var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var sqlinjection = require('sql-injection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.route');
var sectionsRouter = require('./routes/section.route');
var lessonRouter = require('./routes/lesson.route');
var postRouter = require('./routes/post.route');
var uploadRouter = require('./routes/upload.route');
var staffRouter = require('./routes/staff.route');
var fileRouter = require('./routes/file.route');
var pageRouter = require('./routes/page.route');
var pageImageRouter = require('./routes/pageImage.route');
var menuRouter = require('./routes/menu.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(sqlinjection);  // add sql-injection middleware here

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sections', sectionsRouter);
app.use('/lessons', lessonRouter);
app.use('/posts', postRouter);
app.use('/uploads', uploadRouter);
app.use('/staff', staffRouter);
app.use('/files', fileRouter);
app.use('/pages', pageRouter);
app.use('/pageImages', pageImageRouter);
app.use('/menus', menuRouter);

module.exports = app;
