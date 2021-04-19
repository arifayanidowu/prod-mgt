const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

/**
 * @description GET all products
 * @method GET
 * @access PUBLIC
 * @route /api/product
 */

const allProducts = asyncHandler(async (req, res, next) => {
  try {
    const geo = req.user.location.coordinates;
    const lon = geo[0];
    const lat = geo[1];
    const distance = 0.5;

    let { pageSize, filter } = req.query;

    //calculate radius using radians
    //divide distance in km by radius of earth = 6378km or 3963miles
    const radius = distance / 6378;

    if (filter === "all") {
      const products = await Product.find({})
        .limit(+pageSize)
        .populate({
          path: "user",
        })
        .sort({
          _id: "desc",
        })
        .exec();

      return res.status(200).json({ status: true, data: products });
    }

    const products = await Product.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lon, lat], radius],
        },
      },
    })
      .limit(+pageSize)
      .populate({
        path: "user",
      })
      .sort({
        _id: "desc",
      })
      .exec();

    res.status(200).json({ status: true, data: products });
  } catch (error) {
    next(error);
  }
});

/**
 * @description GET Product
 * @method GET
 * @access PUBLIC
 * @route /api/product/:id
 */

const getProduct = asyncHandler(async (req, res, next) => {
  try {
    const post = await Product.findById({ _id: req.params.id })
      .populate({ path: "user" })
      .exec();

    res.status(200).json({ status: true, data: post });
  } catch (error) {
    next(error);
  }
});

/**
 * @description CREATE Product
 * @method POST
 * @access PRIVATE
 * @route /api/product
 */

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.user = req.user._id;
    const post = await Product.create({
      ...data,
    });

    post.save({ validateBeforeSave: false });

    res.status(201).json({ status: true, data: post });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  allProducts,
  getProduct,
  createProduct,
};
