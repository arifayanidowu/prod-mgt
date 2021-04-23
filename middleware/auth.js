const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//User Protect routes
exports.protect = async (req, res, next) => {
  let token;
  const tk = req.headers.authorization;
  if (tk && tk.startsWith("Bearer")) {
    token = tk.split(" ")[1];
  }
  if (!token) {
    return next(
      new ErrorResponse("You must be logged in to access this route", 401)
    );
  }

  //verify token
  try {
    var decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new ErrorResponse("Page expired, please login again", 401));
    } else {
      return next(new ErrorResponse("Invalid token", 401));
    }
  }

  try {
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    next(new ErrorResponse("Not Authorized to access this route", 401));
  }
};
