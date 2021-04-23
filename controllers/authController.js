const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const sendTokenResponse = require("../utils/sendTokenResponse");
const UrlHandler = require("../utils/urlHandler");
/**
 * @description Register New User Account
 * @method POST
 * @access PUBLIC
 * @route /api/auth/register
 */

const registerUser = asyncHandler(async (req, res, next) => {
  const data = { ...req.body };
  try {
    if (!data.email || !data.address || !data.password || !data.username) {
      return next(
        new ErrorResponse("Please provide all required credentials", 400)
      );
    }
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const user = await User.create({
      ...data,
    });

    user.save({ validateBeforeSave: false });

    res.status(201).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Login to your Account
 * @method POST
 * @access PUBLIC
 * @route /api/auth/login
 */
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 401));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid login credentials", 401));
    }

    if (user) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Passwords do not match", 401));
      }

      sendTokenResponse(user, 200, res);
    } else {
      return next(new ErrorResponse("Invalid Login Credentials", 401));
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @description Get user Profile
 * @method GET
 * @access PRIVATE
 * @route /api/auth/profile
 */

const userProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Upload Avatar
 * @method PUT
 * @access PRIVATE
 * @route /api/auth/avatar
 */

const uploadAvatar = asyncHandler(async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await User.findById(req.user.id);
    user.avatar = avatar;
    user.save({ validateBeforeSave: true });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Update Profile
 * @method PUT
 * @access PRIVATE
 * @route /api/auth/profile
 */
const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const data = { ...req.body };
    const user = await User.findById(req.user.id);
    user.email = data.email;
    user.username = data.username;
    user.address = data.address;

    user.save({ validateBeforeSave: true });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Change Password
 * @method PUT
 * @access PRIVATE
 * @route /api/auth/changepassword
 */
const changePassword = asyncHandler(async (req, res, next) => {
  try {
    const data = { ...req.body };
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.matchPassword(data.oldPassword);

    if (!isMatch) {
      return next(
        new ErrorResponse(
          "The 'Old password' you provided does not match with your current password",
          401
        )
      );
    }
    if (data.password !== data.confirmPassword) {
      return next(
        new ErrorResponse(
          "Password does not match with 'confirm password'",
          401
        )
      );
    }
    user.password = data.password;
    user.save({ validateBeforeSave: true });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description GET user by token
 * @method GET
 * @access PUBLIC
 * @route /api/auth/token/:token
 */

const getUserByToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.params.token;
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({ resetPasswordToken });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 404));
    }

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Request for Password RESET
 * @method POST
 * @access PUBLIC
 * @route /api/auth/forgotpassword
 */

const forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const link = `${UrlHandler(req, "resetpassword")}/${resetToken}`;
    const message = `You are receiving this email because you have requested for a password reset.
  If you did not make this request, please disregard this email.
                    Please click on the link below to reset your password.`;

    try {
      await sendEmail({
        email: user.email,
        dynamic_template_data: {
          subject: "Reset Password Request",
          username: user.username,
          message,
          link,
        },
      });
      res.status(200).json({
        success: true,
        token: resetToken,
        data: "Please check you email for the reset password link",
      });
    } catch (err) {
      if (user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
      }
      return next(new ErrorResponse("Error sending email", 500));
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @description Password RESET
 * @method PUT
 * @access PUBLIC
 * @route /api/auth/resetpassword/:resetToken
 */

const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const resetToken = req.params.resetToken;
    const data = { ...req.body };

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 404));
    }

    if (data.password !== data.confirmPassword) {
      return next(
        new ErrorResponse(
          "Password does not match with 'confirm password'",
          401
        )
      );
    }

    user.password = data.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: true });
    sendTokenResponse(user, 200, res);

    const link = `${UrlHandler(req, "login")}`;
    await sendEmail({
      email: user.email,
      dynamic_template_data: {
        subject: "Password Reset Successful",
        username: user.username,
        message,
        link,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  uploadAvatar,
  updateProfile,
  changePassword,
  getUserByToken,
  forgotPassword,
  resetPassword,
};
