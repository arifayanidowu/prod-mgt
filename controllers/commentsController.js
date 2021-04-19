const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const sendEmail = require("../utils/sendEmail");
const urlHandler = require("../utils/urlHandler");

/**
 * @description GET all comments by product id
 * @method GET
 * @access PRIVATE
 * @route /api/comment/:productId
 */

const getAllCommentsByProducts = asyncHandler(async (req, res, next) => {
  try {
    const comments = await Comment.find({ product: req.params.productId })
      .sort({ _id: "desc" })
      .populate({ path: "product user replies.user" })
      .exec();

    res.status(201).json({ status: true, data: comments });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Create a comment
 * @method POST
 * @access PRIVATE
 * @route /api/comment/:productId
 */

const createComment = asyncHandler(async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.user = req.user.id;
    data.product = req.params.productId;

    const comment = await Comment.create({
      ...data,
    });
    await Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({ status: true, data: comment });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Reply a comment
 * @method PUT
 * @access PRIVATE
 * @route /api/comment/reply/:id
 */

const replyComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate({ path: "product user" })
      .exec();
    const data = { ...req.body };
    data.user = req.user.id;
    comment.replies.push(data);
    comment.save({ validateBeforeSave: true });

    const link = `${urlHandler(req, "products")}/${comment.product._id}`;
    const message = `A user just replied to one of your comments, click on the button below to see your activities.`;

    await sendEmail({
      email: comment.user.email,
      dynamic_template_data: {
        subject: "Reply to comment",
        username: comment.user.username,
        message,
        link,
      },
    });

    res.status(201).json({ status: true, data: comment });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllCommentsByProducts,
  createComment,
  replyComment,
};
