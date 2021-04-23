const express = require("express");
const {
  getAllCommentsByProducts,
  createComment,
  replyComment,
} = require("../controllers/commentsController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("/:productId")
  .get(protect, getAllCommentsByProducts)
  .post(protect, createComment);

router.put("/reply/:id", protect, replyComment);

module.exports = router;
