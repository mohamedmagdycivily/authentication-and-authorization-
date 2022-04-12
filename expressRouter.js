const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ExpressApp = express();
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');

const ErrorResponse = require("./common/utils/errorResponse");
const handleError = require("./common/middleware/handleError");
const userRoutes = require("./server/users/index.js")
const { BASE_URL} = require('./common/constants');
const swaggerDocument = require('./common/swagger/index');
const swaggerHtml = swaggerUi.generateHTML(swaggerDocument);

//middleware
ExpressApp.use(morgan("dev"));
ExpressApp.use(cors());
// Body parser, reading data from body into req.body
ExpressApp.use(express.json());
ExpressApp.use(cookieParser());

//swagger
ExpressApp.use('/docs', swaggerUi.serveFiles(swaggerDocument));
ExpressApp.get('/docs', (req, res) => {
  res.send(swaggerHtml);
});
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