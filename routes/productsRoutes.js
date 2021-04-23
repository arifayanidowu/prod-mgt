const express = require("express");
const {
  allProducts,
  getProduct,
  createProduct,
} = require("../controllers/productsController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, allProducts);

router.post("/", protect, createProduct);
router.get("/:id", protect, getProduct);

module.exports = router;
