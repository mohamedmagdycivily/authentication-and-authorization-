module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    //Should be removed in production.
    stack: err.stack,
  });
};
