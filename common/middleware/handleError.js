const { INTERNAL_SERVER_ERROR } = require('http-status');

const handleError = () =>
  function (err, req, res, next) {
    return res.status(err.status || INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
      data: null,
      //Should be removed in production.
      stack: err.stack,
    });
  };

module.exports = handleError;