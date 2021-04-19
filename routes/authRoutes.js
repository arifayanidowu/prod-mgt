const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  uploadAvatar,
  updateProfile,
  changePassword,
  resetPassword,
  forgotPassword,
  getUserByToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/avatar", protect, uploadAvatar);
router.put("/changepassword", protect, changePassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.post("/forgotpassword", forgotPassword);
router.route("/profile").get(protect, userProfile).put(protect, updateProfile);

router.get("/token/:token", getUserByToken);

module.exports = router;
