/** Express app for auth-api. */

const express = require('express')
const app = express();

app.use(express.json());

/** 404 catch --- passes to next handler. */

app.use(function (req, res, next) {
  const err = "Not found!";
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    }
  });
});

module.exports = app