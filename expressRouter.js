const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ExpressApp = express();
const cookieParser = require("cookie-parser");

const ErrorResponse = require("./common/utils/errorResponse");
const handleError = require("./common/middleware/handleError");
const userRoutes = require("./server/users/index.js")
const { BASE_URL} = require('./common/constants');

//middleware
ExpressApp.use(morgan("dev"));
ExpressApp.use(cors());
// Body parser, reading data from body into req.body
ExpressApp.use(express.json());
ExpressApp.use(cookieParser());

// Test middleware
ExpressApp.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
    next();
});

// routes
ExpressApp.use(`${BASE_URL}/users`, userRoutes)


ExpressApp.all("*", (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});

ExpressApp.use(handleError());

module.exports = ExpressApp;