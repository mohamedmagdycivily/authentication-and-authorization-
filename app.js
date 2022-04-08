const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./utils/errorController");
const AppError = require("./utils/appError");

//middleware
app.use(morgan("dev"));
app.use(cors());
// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
    next();
});

// routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;