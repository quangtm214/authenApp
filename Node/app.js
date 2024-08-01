var createError = require("http-errors");
var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");

var logger = require("morgan");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/authenProject";
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("connect success");
});
var indexRouter = require("./routes/index");
const authRoute = require("./routes/authRoute");

const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/auth", authRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
