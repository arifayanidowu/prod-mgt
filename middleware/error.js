const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(error);

  if (err.name === "CastError") {
    const message = `Wrongly formatted id of ${err.value}`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "Error") {
    const message = error.message;
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000) {
    if (Object.keys(err.keyValue)[0] === "email") {
      const message = `Email already taken`;
      error = new ErrorResponse(message, 400);
    } else if (Object.keys(err.keyValue)[0] === "name") {
      const message = `Name already taken`;
      error = new ErrorResponse(message, 400);
    } else {
      const message = `${err.errmsg.split(":").splice(-2)} exists, ${
        Object.keys(err.keyValue)[0]
      } must be unique}`;
      error = new ErrorResponse(message, 400);
    }
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(err.statusCode || error.statusCode || 500)
    .json({ status: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
