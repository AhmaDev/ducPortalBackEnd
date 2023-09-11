var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var sqlinjection = require("sql-injection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user.route");
var sectionsRouter = require("./routes/section.route");
var lessonRouter = require("./routes/lesson.route");
var postRouter = require("./routes/post.route");
var uploadRouter = require("./routes/upload.route");
var staffRouter = require("./routes/staff.route");
var fileRouter = require("./routes/file.route");
var pageRouter = require("./routes/page.route");
var pageImageRouter = require("./routes/pageImage.route");
var menuRouter = require("./routes/menu.route");
var gallaryRouter = require("./routes/gallary.route");
var studentsRouter = require("./routes/student.route");
var request = require("request");
const connection = require("./helpers/db");
var app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }),
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// app.use(sqlinjection);  // add sql-injection middleware here

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,POST,OPTIONS,UPDATE,DELETE",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token",
  );
  next();
});

app.use("v1/", indexRouter);
app.use("v1/users", usersRouter);
app.use("v1/sections", sectionsRouter);
app.use("v1/lessons", lessonRouter);
app.use("v1/posts", postRouter);
app.use("v1/uploads", uploadRouter);
app.use("v1/staff", staffRouter);
app.use("v1/files", fileRouter);
app.use("v1/pages", pageRouter);
app.use("v1/pageImages", pageImageRouter);
app.use("v1/menus", menuRouter);
app.use("v1/photos", gallaryRouter);
app.use("v1/students", studentsRouter);
// app.use("/", require("./routes/blockReason.route"));

app.get("/years", (req, res) => {
  var options = {
    method: "GET",
    url: "http://109.224.31.12:3100/api/yearStudies",
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.get("/studySections", (req, res) => {
  connection.query("SELECT * FROM studySection", (err, result) => {
    res.send(result);
  });
});
module.exports = app;
