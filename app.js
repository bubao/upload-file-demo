let createError = require("http-errors");
let express = require("express");
let path = require("path");
const NotFound = require("./middleware/NotFound");
const ErrorHandler = require("./middleware/ErrorHandler");
// const MyError = require("./utils/error/MyError");

let cookieParser = require("cookie-parser");
let logger = require("morgan");


const indexRouter = require("./routes/index");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

/**
 * 404
 */
app.use(NotFound);

/**
 * 错误处理
 */
app.use(ErrorHandler);

module.exports = app;
